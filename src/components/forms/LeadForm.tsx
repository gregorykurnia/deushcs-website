"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  useActionState,
  useEffect,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChoiceChips, type ChoiceOption } from "@/components/ui/choice-chips";
import { Field, Input, Textarea } from "@/components/ui/field";
import { FormError, SuccessPanel } from "@/components/ui/form-status";
import { TextLink } from "@/components/ui/text-link";
import type { EnhanceForm } from "@/content/types";
import { usePathname } from "@/i18n/navigation";
import { submitLead } from "@/lib/leads/actions";
import {
  HONEYPOT_FIELD,
  companySizes,
  initialLeadFormState,
  leadFields,
  productFromQuery,
  productInterests,
  type LeadField,
  type LeadFormState,
  type ProductInterest,
} from "@/lib/leads/schema";
import { whatsappHref, type WhatsAppContext } from "@/lib/links";

// The one lead form (DESIGN-GUIDE.md §7.9), in two variants: the Contact page's form
// (`global.md` "Contact form") and the Enhance page's (ENHANCE-PAGE-SPEC.md §11). Shared
// strings come from messages `ContactForm`; the Enhance-only strings are passed in as
// `enhance` (the page's content), so this file holds no copy of its own.
//
// Short choices (six or fewer) are chips, as the guide says, even where the spec says
// "select". Fields marked `required` use the browser's own validation, so a form with
// script and one without behave alike; the server's messages cover what that lets
// through (an email with no domain, a name of only spaces).

export type LeadFormProps =
  // `defaultProduct` wins; without it the form takes `?product=` from the URL after hydration
  | { variant: "contact"; defaultProduct?: ProductInterest }
  | { variant: "enhance"; enhance: EnhanceForm };

/** What the server returned, plus what the visitor typed, so an error never empties the form. */
export type LeadFormValues = Partial<Record<LeadField, string>>;
export type LeadFormViewState = LeadFormState & { values: LeadFormValues };

type PageContext = {
  locale: string;
  sourcePage: string;
  utm: { utm_source: string; utm_medium: string; utm_campaign: string };
};

const utmKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;
const noop = () => () => {};

/** The URL's query string, read after hydration (it is empty in the server's HTML). */
function useQueryString() {
  return useSyncExternalStore(noop, () => window.location.search, () => "");
}

/**
 * React clears an uncontrolled form once its action finishes, success or not. Sending the
 * values back in the state lets the fields start from them again (`defaultValue`).
 */
function readValues(formData: FormData): LeadFormValues {
  const values: LeadFormValues = {};
  for (const field of leadFields) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value;
  }
  return values;
}

export function LeadForm(props: LeadFormProps) {
  const locale = useLocale();
  const sourcePage = usePathname();
  const search = useQueryString();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    async (previous: LeadFormViewState, formData: FormData): Promise<LeadFormViewState> => ({
      ...(await submitLead(previous, formData)),
      values: readValues(formData),
    }),
    { ...initialLeadFormState, values: {} },
  );

  // After a failed send, move focus to the first field with an error (§7.9).
  useEffect(() => {
    if (state.status !== "error") return;
    const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    const target = invalid?.matches("fieldset") ? invalid.querySelector<HTMLElement>("input") : invalid;
    target?.focus();
  }, [state]);

  const params = new URLSearchParams(search);
  const utm = Object.fromEntries(utmKeys.map((key) => [key, params.get(key) ?? ""])) as PageContext["utm"];
  // The page stays static (and the form works without script), so `?product=` is read here, not on
  // the server. An unknown value is ignored.
  const product = productFromQuery(params.get("product"));
  const viewProps: LeadFormProps =
    props.variant === "contact" ? { ...props, defaultProduct: props.defaultProduct ?? product } : props;

  return (
    <LeadFormView
      {...viewProps}
      state={state}
      pending={pending}
      action={formAction}
      formRef={formRef}
      context={{ locale, sourcePage, utm }}
    />
  );
}

export function LeadFormView(
  props: LeadFormProps & {
    state: LeadFormViewState;
    pending: boolean;
    context: PageContext;
    action?: (formData: FormData) => void;
    formRef?: RefObject<HTMLFormElement | null>;
  },
) {
  const { state, pending, context, action, formRef } = props;
  const t = useTranslations();
  const tf = useTranslations("ContactForm");
  const tc = useTranslations("Common");
  const { values } = state;
  const enhance = props.variant === "enhance" ? props.enhance : null;

  if (state.status === "success") {
    return <Success {...props} />;
  }

  const error = (field: LeadField) => {
    const key = state.fieldErrors?.[field];
    return key ? t(key) : undefined;
  };
  const optional = tf("optional");
  const sizeOptions: ChoiceOption[] = companySizes.map((value) => ({ value, label: tf(`size.${value}`) }));
  const productOptions: ChoiceOption[] = productInterests.map((value) => ({
    value,
    label: tf(`productInterest.${value}`),
  }));
  const defaultProduct = values.productInterest ?? (props.variant === "contact" ? props.defaultProduct : undefined);

  // Typing is blocked while sending without losing focus, which `disabled` would do.
  const text = { readOnly: pending };

  return (
    <form ref={formRef} action={action} className="grid gap-6">
      <input type="hidden" name="formType" value={props.variant} />
      <input type="hidden" name="locale" value={context.locale} />
      <input type="hidden" name="sourcePage" value={context.sourcePage} />
      {utmKeys.map((key) => (
        <input key={key} type="hidden" name={key} value={context.utm[key]} />
      ))}
      {/* Bots fill every field they find; people never reach this one. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 desk:grid-cols-2">
        <Field label={tf("labels.name")} error={error("name")}>
          <Input name="name" autoComplete="name" required defaultValue={values.name} {...text} />
        </Field>
        <Field label={tf("labels.email")} error={error("email")}>
          <Input name="email" type="email" autoComplete="email" required defaultValue={values.email} {...text} />
        </Field>
      </div>

      <div className="grid gap-4 desk:grid-cols-2">
        <Field label={tf("labels.company")} error={error("company")}>
          <Input name="company" autoComplete="organization" required defaultValue={values.company} {...text} />
        </Field>
        {enhance ? null : (
          <Field label={tf("labels.role")} error={error("role")}>
            <Input name="role" autoComplete="organization-title" required defaultValue={values.role} {...text} />
          </Field>
        )}
        <Field
          label={tf("labels.whatsapp")}
          optional={optional}
          hint={tf("hints.whatsapp")}
          error={error("whatsapp")}
          className={enhance ? "desk:col-start-2 desk:row-start-1" : undefined}
        >
          <Input name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" defaultValue={values.whatsapp} {...text} />
        </Field>
      </div>

      {enhance ? (
        <>
          <ChoiceChips
            legend={enhance.fields.role}
            name="role"
            options={enhance.choices.role}
            defaultValue={values.role}
            required
            disabled={pending}
          />
          <ChoiceChips
            legend={enhance.fields.employees}
            name="size"
            options={sizeOptions}
            defaultValue={values.size}
            required
            disabled={pending}
          />
          <ChoiceChips
            legend={enhance.fields.sites}
            optional={optional}
            name="sites"
            options={enhance.choices.sites}
            defaultValue={values.sites}
            disabled={pending}
          />
          <ChoiceChips
            legend={enhance.fields.tracking}
            optional={optional}
            name="tracking"
            options={enhance.choices.tracking}
            defaultValue={values.tracking}
            disabled={pending}
          />
          <ChoiceChips
            legend={enhance.fields.cycle}
            optional={optional}
            name="cycle"
            options={enhance.choices.cycle}
            defaultValue={values.cycle}
            disabled={pending}
          />
          <Field label={enhance.fields.anything} optional={optional} error={error("message")}>
            <Textarea name="message" defaultValue={values.message} {...text} />
          </Field>
        </>
      ) : (
        <>
          <ChoiceChips
            // chips are uncontrolled: a new default (the URL read after hydration) needs a fresh group
            key={defaultProduct ?? "none"}
            legend={tf("labels.productInterest")}
            name="productInterest"
            options={productOptions}
            defaultValue={defaultProduct}
            required
            disabled={pending}
            error={error("productInterest")}
          />
          <ChoiceChips
            legend={tf("labels.size")}
            name="size"
            options={sizeOptions}
            defaultValue={values.size}
            required
            disabled={pending}
          />
          <Field label={tf("labels.coverage")} optional={optional} error={error("coverage")}>
            <Input name="coverage" defaultValue={values.coverage} {...text} />
          </Field>
          <Field
            label={tf("labels.message")}
            optional={optional}
            hint={tf("hints.message")}
            error={error("message")}
          >
            <Textarea name="message" defaultValue={values.message} {...text} />
          </Field>
        </>
      )}

      <Checkbox
        name="consent"
        required
        defaultChecked={Boolean(values.consent)}
        disabled={pending}
        error={error("consent")}
        label={
          <>
            {tf("labels.consent")}{" "}
            <TextLink href="/privacy" variant="inline" target="_blank">
              {tf("labels.privacy")}
              <span className="sr-only"> {tc("opensInNewTab")}</span>
            </TextLink>
          </>
        }
      />

      {state.formError && <FormError>{t(state.formError)}</FormError>}

      <div>
        <Button type="submit" busy={pending}>
          {pending ? tf("sending") : (enhance?.submit ?? tf("submit"))}
        </Button>
      </div>
    </form>
  );
}

/** Replaces the form once the lead is sent. */
function Success(props: LeadFormProps & { state: LeadFormViewState }) {
  const tf = useTranslations("ContactForm");
  const { enhance, context } = successContext(props);

  return (
    <SuccessPanel
      title={enhance ? enhance.success : tf("success.title")}
      body={enhance ? undefined : tf("success.body")}
      action={
        <p className="text-ui text-slate">
          {tf("success.hurry")}{" "}
          <TextLink href={whatsappHref(context)} variant="inline">
            {tf("success.whatsapp")}
          </TextLink>
        </p>
      }
    />
  );
}

/** The WhatsApp message that fits what the visitor asked about. */
function successContext(props: LeadFormProps & { state: LeadFormViewState }): {
  enhance: EnhanceForm | null;
  context: WhatsAppContext;
} {
  if (props.variant === "enhance") return { enhance: props.enhance, context: "enhance" };
  const product = props.state.values.productInterest;
  const context: WhatsAppContext =
    product === "enhance"
      ? "enhance"
      : product === "discover" || product === "next-chapter" || product === "gba"
        ? "assessment"
        : "default";
  return { enhance: null, context };
}
