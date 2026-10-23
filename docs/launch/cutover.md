# Domain cutover runbook (Tasks 7.5 and 7.6)

Moves deushcs.com from the WordPress site at Hostinger to the new site on Vercel, without touching email.
Do the steps in order, with a Claude session open in the main folder. Each step says how to check it.

**The rule that matters most:** at Hostinger, only the `@` and `www` web records change. MX, SPF, DKIM, the Search Console record and the nameservers stay exactly as they are. Email for admin@deushcs.com (Titan) and the website's lead emails (Resend, `notify.deushcs.com`) depend on them.

**Why this order:** the site goes onto the domain first, with `noindex` still on. It becomes indexable only after deushcs.com serves it. If `SITE_INDEXABLE` were switched on earlier, Google could see indexable pages whose canonical links point at a host still serving WordPress.

## Before the day

- [ ] The Phase 7 review and Task 7.4 (release checks) are done.
- [ ] Search Console's TXT record (`google-site-verification=…`) is in Hostinger's DNS zone (the owner item at the top of Phase 7). Without it, the last check fails and Task 7.6 can't start.
- [ ] You can sign in to Vercel (project `deushcs-website`), Hostinger (hPanel) and the admin@deushcs.com mailbox.
- [ ] `dig` works on your computer (built into macOS: `dig +short MX deushcs.com` prints two `titan.email` lines).

## Step 1: Release Phase 7, still not indexable

1. In Vercel → `deushcs-website` → Settings → Environment Variables, check that **Production** has no `SITE_INDEXABLE`, or has it set to `false`. Leave `NEXT_PUBLIC_SITE_URL` as it is for now.
2. Release `staging` to `main` as `CLAUDE.md` "Releasing to production" says (full checks first).
3. Check: `node scripts/check-launch.mjs https://deushcs-website.vercel.app --prelaunch` prints `All … checks passed`.

## Step 2: Record today's DNS

DNS can change between the day this file was written and the cutover (the Search Console record, for one). Record it again on the day:

```bash
scripts/record-dns.sh > docs/launch/dns-before.txt
```

Check: the file has two `MX` lines (`mx1.titan.email.`, `mx2.titan.email.`), the `v=spf1 include:spf.titan.email ~all` line, a `google-site-verification=` line, and the `@` and `www` web records. Commit and push it. It is the rollback.

What it held on 2026-10-23 (from `ns1.dns-parking.com`, Hostinger's nameserver):

| Name | Type | Value | Cutover |
|---|---|---|---|
| `@` | A | `153.92.12.146`, `91.108.119.33` (TTL 60) | **replace** |
| `@` | AAAA | `2a02:4780:1c:4881:c442:a2c7:32ab:c4fb`, `2a02:4780:1b:6c82:e4be:5964:23c:653` (TTL 60) | **delete** |
| `www` | CNAME | `www.deushcs.com.cdn.hstgr.net.` (TTL 300) | **replace** |
| `@` | MX | `10 mx1.titan.email.`, `20 mx2.titan.email.` | keep |
| `@` | TXT | `v=spf1 include:spf.titan.email ~all` | keep |
| `titan1._domainkey` | TXT | Titan's DKIM key (`v=DKIM1; k=rsa; p=…`) | keep |
| `resend._domainkey.notify` | TXT | Resend's DKIM key (`p=…`) | keep |
| `send.notify` | CNAME | `send.forge.rmta.net.` (Resend's bounce and SPF records) | keep |
| `_dmarc`, `_dmarc.notify` | TXT | none | keep (none) |
| `@` | CAA | none, so nothing stops Vercel issuing a certificate | keep (none) |

The `@` A and AAAA values belong to Hostinger's CDN (`hstgr.net`); public resolvers answered other Hostinger addresses the same day. Restore whatever the day's `dns-before.txt` says.

## Step 3: Back up WordPress

1. Hostinger hPanel → the deushcs.com website → Backups: make a full backup (files and database) and download it.
2. WordPress admin → Tools → Export → All content: download the XML file.
3. Download the media folder (`wp-content/uploads`) with hPanel's File Manager (compress it first).

Keep all three outside the repo. Check: each file opens or unzips.

## Step 4: Add the domain in Vercel

1. Vercel → `deushcs-website` → Settings → Domains → **Add Domain** → `deushcs.com`. Accept Vercel's offer to add `www.deushcs.com` too.
2. Edit `www.deushcs.com` → **Redirect to** `deushcs.com`. If it asks for a status code, pick a permanent one (308, or 301). `deushcs.com` stays the main domain, connected to Production.
3. Vercel now shows the DNS records it needs for each domain. **Copy them from the dashboard**, not from this file or anywhere else: Vercel's current docs (https://vercel.com/docs/domains/working-with-domains/add-a-domain) say the apex takes an **A** record and a subdomain a **CNAME** record, with a value unique to the project.
   - A record for `@`: ______________________
   - CNAME for `www`: ______________________
   - If Vercel asks to verify access with a **TXT** record at `_vercel`, that one too: ______________________

Vercel shows both domains as "Invalid Configuration" until Step 5. That's expected.

## Step 5: Point `@` and `www` at Vercel in Hostinger

Hostinger hPanel → Domains → deushcs.com → DNS / Nameservers → DNS records. **Edit records; never change the nameservers.**

If hPanel won't let you edit the `@` records, or says Hostinger's CDN manages them, turn off the CDN for the deushcs.com website in hPanel first, then come back.

1. `@` A: delete the existing A records, then add **one** A record, name `@`, with Vercel's value from Step 4 (TTL: the lowest offered, or 300).
2. `@` AAAA: delete both. Vercel lists conflicting A, AAAA or CNAME records as the first cause of "Invalid Configuration". The exception is if Vercel's dashboard lists an AAAA value: then add that one.
3. `www`: change the CNAME from `www.deushcs.com.cdn.hstgr.net` to Vercel's CNAME value from Step 4.
4. The `_vercel` TXT record, only if Vercel asked for it: add it as a **new** record.
5. Touch nothing else.

Check, after a few minutes:

```bash
dig +short A deushcs.com @ns1.dns-parking.com        # Vercel's A value, nothing else
dig +short AAAA deushcs.com @ns1.dns-parking.com     # empty
dig +short CNAME www.deushcs.com @ns1.dns-parking.com  # Vercel's CNAME value
dig +short MX deushcs.com                             # still the two titan.email lines
```

Then wait until Vercel → Domains shows **Valid Configuration** for both domains and the certificate is issued (usually minutes; the TTLs above are 60 and 300 seconds, but some resolvers keep old answers longer). https://deushcs.com now shows the new site, and https://www.deushcs.com lands on https://deushcs.com.

## Step 6: Test email both ways

1. From admin@deushcs.com, send an email to an outside address (a personal Gmail).
2. From that address, reply. The reply arrives at admin@deushcs.com.

If either fails, stop and go to **Rollback**. The DNS lines of the check script (Step 8) show which mail record changed.

## Step 7: Make the site indexable on its own domain

Both variables are read when the site is **built**, so changing them does nothing until a new deployment.

1. Vercel → `deushcs-website` → Settings → Environment Variables → **Production** only:
   - `NEXT_PUBLIC_SITE_URL` = `https://deushcs.com` (no trailing slash, no `www`)
   - `SITE_INDEXABLE` = `true` (exactly this, lower case)
2. Deployments → the current Production deployment → **Redeploy**. Untick the option to use the existing build cache if Vercel offers it, so the new values are built in.
3. Wait for the deployment to show **Ready**.

## Step 8: Run the launch check

```bash
node scripts/check-launch.mjs https://deushcs.com
```

Every line says `PASS` and the last line is `All … checks passed`. If a line fails:

| Fails | Usually means |
|---|---|
| robots.txt, `noindex`, canonical or "not on https://deushcs.com" | Step 7's values are wrong, or the redeploy didn't rebuild. Check both variables, then redeploy again. |
| `http://` or `www.` redirect | Step 4's `www` redirect isn't set, or DNS hasn't caught up. Wait 15 minutes and run again. |
| An old WordPress path | That path isn't in `src/lib/old-site-redirects.ts`, or a cache still serves WordPress. Run again after 15 minutes; if it still fails, it's a code fix on `staging`. |
| MX, SPF, DKIM, DMARC or Search Console | A mail record changed in Step 5. Compare with `docs/launch/dns-before.txt` and put it back. |

## Step 9: Launch day on Google (Task 7.6)

1. Google Search Console → the `deushcs.com` property → Sitemaps → submit `https://deushcs.com/sitemap.xml`.
2. URL Inspection → **Request indexing** for each of:
   - `https://deushcs.com/en`
   - `https://deushcs.com/en/solutions/enhance`
   - `https://deushcs.com/en/solutions/game-based-assessment`
   - `https://deushcs.com/en/about`
   - `https://deushcs.com/en/contact`
3. Google Business Profile → Website: `https://deushcs.com`. Check that the LinkedIn company page links to `https://deushcs.com` too.

Then the first month runs as Task 7.7 in `IMPLEMENTATION_PLAN.md` says. Keep the WordPress hosting for that month.

## Rollback

If the new site or email breaks after Step 5:

1. Hostinger DNS: put the `@` and `www` records back exactly as `docs/launch/dns-before.txt` lists them. Delete Vercel's A record on `@`, restore the A and AAAA records, and set the `www` CNAME back to `www.deushcs.com.cdn.hstgr.net`. If you turned Hostinger's CDN off in Step 5, turn it back on; that may restore the `@` records by itself. Check with `dig` as in Step 5.
2. If Step 7 already ran: set `SITE_INDEXABLE` back to `false` in Vercel Production and redeploy, so the Vercel URL can't be indexed while it isn't on the domain.
3. Leave the domains in Vercel's settings; they do no harm while DNS points elsewhere.

WordPress keeps running at Hostinger the whole time, so restoring the two records brings it back (within the records' TTL).

## Later, not part of the cutover

- deushcs.com has **no DMARC record** (checked 2026-10-23). Adding one later helps delivery and protects against spoofing, but it's a mail change of its own: do it on another day, starting with `p=none`.
