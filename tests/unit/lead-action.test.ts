import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitLead as submitWithValues } from "@/lib/leads/actions";
import type { LeadFormState } from "@/lib/leads/schema";
import { sendLeadNotification } from "@/lib/leads/notify";

/** The action's outcome without the echoed `values`, so the cases below stay exact. */
async function submitLead(prev: LeadFormState, formData: FormData) {
  const outcome = await submitWithValues(prev, formData);
  delete outcome.values;
  return outcome;
}

// The database failure paths of the lead pipeline, with a fake database. The
// happy paths run against the real `test` database in tests/leads.

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
}));
vi.mock("@/lib/leads/notify", () => ({ sendLeadNotification: vi.fn(async () => {}) }));

const db = {
  recentCount: vi.fn(async (): Promise<{ n: number }[]> => [{ n: 0 }]),
  inserted: vi.fn(async (values: object): Promise<unknown[]> => [values]),
};
vi.mock("@/db/client", () => ({
  getDb: () => ({
    select: () => ({ from: () => ({ where: db.recentCount }) }),
    insert: () => ({ values: (values: object) => ({ returning: () => db.inserted(values) }) }),
  }),
}));

function form() {
  const formData = new FormData();
  formData.set("formType", "contact");
  formData.set("locale", "en");
  formData.set("sourcePage", "/en/contact");
  formData.set("name", "Test Person");
  formData.set("email", "test@example.com");
  formData.set("company", "PT Test");
  formData.set("productInterest", "not-sure");
  formData.set("consent", "on");
  return formData;
}

const dbDown = Object.assign(new Error("Failed query: insert ... params: Test Person,test@example.com"), {
  cause: Object.assign(new Error("fetch failed"), { code: "ECONNRESET" }),
});

beforeEach(() => {
  vi.mocked(sendLeadNotification).mockReset().mockResolvedValue(undefined);
  db.recentCount.mockReset().mockResolvedValue([{ n: 0 }]);
  db.inserted.mockReset().mockImplementation(async (values) => [
    { ...values, id: "row-1", createdAt: new Date(), status: "new" },
  ]);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("submitLead's values (Phase 1 review)", () => {
  // the form passes the action to useActionState as is (so it posts without script), so the
  // action itself must send back what was typed
  it("sends back what the visitor typed, with the outcome", async () => {
    const state = await submitWithValues({ status: "idle" }, form());
    expect(state.status).toBe("success");
    expect(state.values).toMatchObject({ email: "test@example.com", company: "PT Test" });
  });
});

describe("submitLead when the database fails (Task 1.2)", () => {
  it("emails the lead, flagged as not saved, and still thanks the visitor", async () => {
    db.inserted.mockRejectedValue(dbDown);

    expect(await submitLead({ status: "idle" }, form())).toEqual({ status: "success" });
    expect(sendLeadNotification).toHaveBeenCalledWith(
      expect.objectContaining({ email: "test@example.com", company: "PT Test" }),
      { saved: false },
    );
  });

  it("shows the server error when the database and the email both fail", async () => {
    db.inserted.mockRejectedValue(dbDown);
    vi.mocked(sendLeadNotification).mockRejectedValue(new Error("Resend is down"));

    expect(await submitLead({ status: "idle" }, form())).toEqual({
      status: "error",
      formError: "ContactForm.errors.server",
    });
  });

  it("never writes the visitor's details to the logs", async () => {
    db.inserted.mockRejectedValue(dbDown);
    vi.mocked(sendLeadNotification).mockRejectedValue(new Error("Resend is down"));

    await submitLead({ status: "idle" }, form());

    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).toContain("ECONNRESET");
    expect(logged).not.toContain("test@example.com");
    expect(logged).not.toContain("Test Person");
  });

  it("still saves the lead when the rate-limit check fails", async () => {
    db.recentCount.mockRejectedValue(dbDown);

    expect(await submitLead({ status: "idle" }, form())).toEqual({ status: "success" });
    expect(db.inserted).toHaveBeenCalledOnce();
    expect(sendLeadNotification).toHaveBeenCalledWith(expect.objectContaining({ id: "row-1" }));
  });
});
