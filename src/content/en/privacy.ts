import { RATE_LIMIT } from "@/lib/leads/rate-limit";
import { CONTACT_EMAIL } from "@/lib/links";
import type { PrivacyContent } from "../types";

// English privacy policy for /privacy (Task 1.8), under Indonesia's Personal Data Protection Law
// (UU PDP, Law No. 27 of 2022). A DRAFT for the team's counsel to approve (WEBSITE-PLAN.md §5.11):
// there is no Markdown source in content/, so this module is the text counsel reviews.
//
// It must match what the code stores. tests/unit/privacy-page.test.tsx checks that every column of
// `leads` (src/db/schema.ts) and every Enhance `extra` field is described here, so a new column
// fails the tests until this text covers it. When something changes, also update `updated`:
//   - a new column or form field: "What we collect";
//   - a new provider (analytics in Task 7.3, Vercel Web Analytics): "What we collect" (browsing)
//     and "Who sees your data";
//   - the office address (Q9): "Who we are", once siteFlags.showAddress is on.
// For the owner and counsel: the two-year retention period is a proposal, not a decision.

const { max, windowMinutes } = RATE_LIMIT;

export const privacyEn: PrivacyContent = {
  meta: {
    title: "Privacy Policy",
    description:
      "What personal data the DEUS website collects when you send a form, why, who sees it, how long we keep it, and how to ask us to delete it.",
  },
  eyebrow: "Privacy",
  title: "Privacy policy",
  updated: "Last updated 15 October 2026",
  intro: [
    "This page explains what personal data the DEUS website collects, what we do with it and what you can ask us to do with it. The short version: we only collect what you type into our forms, we use it to reply to you, and we never sell it.",
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        "This website, deushcs.com, is run by **PT Investama Persada Kurnia**, trading as DEUS Human Capital Services (\"DEUS\", \"we\", \"us\"). We decide what personal data the website collects and why, so under Indonesia's Personal Data Protection Law (Law No. 27 of 2022, \"UU PDP\") we are the controller of that data.",
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      body: ["When you send the contact form or the DEUS Enhance form, we keep what you entered:"],
      points: [
        "Your name, work email address and company.",
        "Your role and your WhatsApp number, if you give them.",
        "The product you're interested in, the size of your company and, on the contact form, how many candidates or employees it would cover.",
        "On the Enhance form, how many sites or plants you run, how you track performance today and when your next appraisal cycle starts.",
        "Your message, if you write one.",
        "The time you ticked the box agreeing that we may contact you.",
      ],
      after: [
        "With each submission the website also records which form you used, the page you sent it from, the language of that page, when it arrived, and the campaign tags in the link that brought you to us (utm_source, utm_medium and utm_campaign), if it had any. Our team adds a status as we follow up: new, contacted or closed.",
        `To stop spam, we also keep a **scrambled code made from your IP address** (a one-way hash). We never store the IP address itself, and the code can't be turned back into it without a secret key we keep separately. It stays with your submission, and we use it only to block anyone who sends more than ${max} messages in ${windowMinutes} minutes.`,
        "If you only browse the site, it stores nothing about you. It sets a single cookie, NEXT_LOCALE, only if you view the site in a language other than your browser's, to remember that choice; it's deleted when you close your browser. There are no advertising or tracking cookies. Our hosting provider keeps short-lived technical logs of requests, which include IP addresses, to run the site and keep it secure.",
        "We don't ask for ID numbers, dates of birth or any of the specific personal data UU PDP treats as sensitive, such as health, biometric or financial data. The website stores nothing about children. Potentia, our assessment for students, runs on its own website, deuspotentia.com, which handles its own data.",
      ],
    },
    {
      id: "why",
      title: "Why we use it",
      points: [
        "To reply to your request: answer your question, arrange a demo or a call, and prepare for it.",
        "To see which pages and campaigns bring people to us, from the page and campaign tags.",
        "To keep the forms free of spam and abuse.",
      ],
      after: [
        "We use your data on the basis of your consent, which you give by ticking the box on the form. We won't add you to a newsletter or send you marketing you didn't ask for. If we'd like to, we'll ask first.",
      ],
    },
    {
      id: "who-sees-it",
      title: "Who sees your data",
      body: [
        `The DEUS team who follow up on enquiries. Each new submission is also emailed to our company inbox, ${CONTACT_EMAIL}, so we can reply.`,
        "These service providers handle it on our behalf, only to provide their service to us:",
      ],
      points: [
        "**Vercel**, which hosts the website (United States).",
        "**Neon**, which stores form submissions in a database on servers in Singapore.",
        "**Resend**, which delivers the notification email to our inbox (United States).",
        "Our email provider, which holds that inbox.",
      ],
      after: [
        "We don't sell your data and we don't share it with advertisers. We disclose it to anyone else only when the law requires us to, for example in response to a lawful request from an authority.",
      ],
    },
    {
      id: "outside-indonesia",
      title: "Data stored outside Indonesia",
      body: [
        "Because these providers run their servers abroad, your data is stored and processed in Singapore and the United States. It travels to them encrypted, and we only use providers whose security protects it to a standard at least equal to UU PDP's.",
      ],
    },
    {
      id: "how-long",
      title: "How long we keep it",
      body: [
        "We keep a submission for two years after our last contact with you, then delete it, along with its copy in our inbox. If you become a client, your contract's terms apply instead. You can ask us to delete it sooner at any time.",
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      body: [
        "Submissions travel over encrypted connections (HTTPS) and are stored in a database that only the DEUS staff who need it can open. The website can add submissions but never shows them to anyone. If a breach ever affects your data, we'll tell you and the authorities within 3 × 24 hours, as UU PDP requires.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: ["Under UU PDP you can:"],
      points: [
        "Ask what data we hold about you and why, and get a copy of it.",
        "Have anything wrong or out of date corrected.",
        "Ask us to delete your data, or to stop or limit how we use it.",
        "Withdraw your consent at any time. We'll stop using your data from then on; it doesn't affect what we did before.",
        "Get your data in a common format, to take to another service.",
        "Complain to the authority responsible for personal data protection in Indonesia.",
      ],
      after: [
        `To use any of these, email ${CONTACT_EMAIL} from the address you used on the form, or message us on WhatsApp from the number you gave, so we can tell it's you. We'll reply within 3 × 24 hours of receiving your request.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If we change what the website collects or how we use it, we'll update this page and the date at the top. If a change affects data you've already sent us, we'll ask for your consent again where the law requires it.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [
        "Questions about this policy or your data go to PT Investama Persada Kurnia (DEUS Human Capital Services):",
      ],
    },
  ],
  contact: { email: "Email us", whatsapp: "Chat on WhatsApp" },
};
