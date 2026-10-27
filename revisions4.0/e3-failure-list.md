# E3 failure list (2026-10-27)

One build; `smoke.spec.ts` and `enhance.spec.ts` against it: 28 passed, 5 failed. All 5 fail with `DATABASE_URL_POOLED is not set` (no `.env.test` on this server), so none is caused by E1 or E2. They are the lead-form tests, which write to the test database and don't touch the solution section.

- `enhance.spec.ts:284` saves a lead in the test database and shows the thank-you
- `enhance.spec.ts:326` a phone number that is too short gets the phone message and saves nothing
- `enhance.spec.ts:349` submit button disables while pending, so a second click makes no second row
- `enhance.spec.ts:382` asks for the required fields before anything is sent
- `enhance.spec.ts:429` the form sends without script and lands on the thank-you

`node scripts/check-geo.mjs --prelaunch` on the build: 4 of 4 pass. `node scripts/check-voice.mjs`: 0 hits in 71 files.
