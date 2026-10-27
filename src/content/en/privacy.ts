import { RATE_LIMIT } from "@/lib/leads/rate-limit";
import { CONTACT_EMAIL } from "@/lib/links";
import type { PrivacyContent } from "../types";

// English privacy policy for /privacy (Task 1.8, rewritten in plain words in R18), under Indonesia's
// Personal Data Protection Law (Law No. 27 of 2022). A DRAFT for the team's counsel to approve
// (WEBSITE-PLAN.md §5.11): there is no Markdown source in content/, so this module is the text counsel
// reviews. Plain words (F93): short sentences, and what a thing does rather than its technical name.
// The law is named once, in "Who we are", and is "the applicable laws" after that (D16).
//
// It must match what the code stores. tests/unit/privacy-page.test.tsx checks that every column of
// `leads` (src/db/schema.ts) and every Enhance `extra` field is described here, so a new column
// fails the tests until this text covers it. When something changes, also update `updated`:
//   - a new column or form field, including a new key in `extra` (such as the visit's first page
//     and referring site, SEO/geo-implementation-plan.md §S10): "What we collect";
//   - a new form (such as the sample-report download, §S11): "What we collect", its first line;
//   - a new prop on an analytics event (such as `from` on WhatsApp clicks): "What we collect"
//     (the Vercel Web Analytics paragraph);
//   - a new provider (analytics in Task 7.3, Vercel Web Analytics): "What we collect" (browsing)
//     and "Who sees your data";
//   - a change of email provider (Titan since F132): "Who sees your data";
//   - the office address (Q9): "Who we are", once siteFlags.showAddress is on.
// Two years' retention, with its reason, is the owner's decision (D17); Ko Will confirms it.

const { max, windowMinutes } = RATE_LIMIT;

export const privacyEn: PrivacyContent = {
  meta: {
    title: "Privacy Policy",
    description:
      "What personal data the DEUS website collects when you send a form, why, who sees it, how long we keep it, and how to ask us to delete it.",
  },
  title: "Privacy policy",
  updated: "Last updated 27 October 2026",
  intro: [
    "This page explains what personal data the DEUS website collects, what we do with it, and what you can ask us to do with it. In short: we collect what you send us through our forms, plus a few technical details every website needs to run safely. We use it to reply to you, and we never sell it.",
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        "This website, deushcs.com, is run by **PT Investama Persada Kurnia**, trading as DEUS Human Capital Services (\"DEUS\", \"we\", \"us\"). We decide what personal data the website collects and why, so we are responsible for it. We follow the applicable laws and regulations, including Indonesia's Personal Data Protection Law (Law No. 27 of 2022).",
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      body: ["When you send the contact form, the DEUS Enhance form or the form for our sample report, we keep what you entered:"],
      points: [
        "Your name, work email address and company.",
        "Your role and your WhatsApp number, if you give them.",
        "The product you're interested in, the size of your company and, on the contact form, how many candidates or employees it would cover.",
        "On the Enhance form, how many sites or plants you run, how you track performance today and when your next appraisal cycle starts.",
        "Your message, if you write one.",
        "The time you ticked the box agreeing that we may contact you.",
      ],
      after: [
        "With each form you send, the website also records which form you used, the page you sent it from, the language of that page and when it arrived. For the sample report, it records which download you asked for. It also records the first page you opened on our site in that visit, and the name of the website that sent you to it, such as google.com. Only the website's name: never the full address of the page you came from. If the link that brought you carried tags naming a campaign or the site it came from (utm_source, utm_medium and utm_campaign), such as the ones our campaigns and some AI assistants add, it also keeps those tags. As we follow up, our team marks your message as new, contacted or closed.",
        `To stop spam, we keep a **coded version of your internet address** that can't be turned back into the address itself. We never store the address. We use the code only to block anyone who sends more than ${max} messages in ${windowMinutes} minutes.`,
        "If you only browse and don't send a form, we don't know who you are. We count visits without names (see Vercel Web Analytics below), and our hosting provider keeps short technical logs for security, which it deletes after a short time.",
        "Vercel Web Analytics counts visits to each page, and the clicks we track: buttons, links to WhatsApp, email and deuspotentia.com, switching language, the product a form you sent was about, and which download you asked for. A click on a WhatsApp link also records the name of the website that sent you to us, if one did. For each count it records the page, the page that sent you, your approximate location, and your browser and device type. It doesn't use cookies to tell visitors apart, and it doesn't link any of this to you or your internet address. We never record your name, your email address or anything you type.",
        "If you switch the site's language, a small file (a cookie) remembers your choice until you close your browser. That's the only cookie the site sets. There are no advertising or tracking cookies.",
        "While a browser tab is open, the site remembers the first page you opened in it, the website that sent you and any campaign tags, so a form you send from another page can include them. This stays in your browser, not in a cookie, and is deleted when you close the tab.",
        "We never ask for ID numbers, dates of birth, or sensitive data such as health, biometric or financial details. Potentia, our assessment for children, runs on its own website, deuspotentia.com, which handles its own data. None of the forms on this website ask about children.",
      ],
    },
    {
      id: "why",
      title: "Why we use it",
      points: [
        "To reply to you: answer your question, arrange a demo or a call, and prepare for it.",
        "To see which pages, buttons and campaigns bring people to us.",
        "To keep the forms free of spam and abuse.",
      ],
      after: [
        "We use your data because you agreed to it, by ticking the box on the form. We won't add you to a newsletter or send you marketing you didn't ask for. If we'd like to, we'll ask first.",
      ],
    },
    {
      id: "who-sees-it",
      title: "Who sees your data",
      body: [
        `The DEUS team who reply to messages. Each form you send is also emailed to our company inbox, ${CONTACT_EMAIL}, so we can answer.`,
        "These companies handle it for us, only to provide their service to us:",
      ],
      points: [
        "**Vercel**, which hosts the website and counts its visits (United States).",
        "**Neon**, which stores the forms you send, on servers in Singapore.",
        "**Resend**, which sends the email about your form to our inbox (United States).",
        "**Titan**, which holds our company inbox.",
        "**WhatsApp**, run by Meta, if you message us there.",
      ],
      after: [
        "We don't sell your data and we don't share it with advertisers. We give it to anyone else only when the law requires it, for example when an authority asks for it lawfully.",
      ],
    },
    {
      id: "outside-indonesia",
      title: "Data stored outside Indonesia",
      body: [
        "These companies run their servers abroad, so your data is stored and handled in Singapore and the United States. It's encrypted on its way to them. We only use companies that protect it at least as well as the applicable laws require.",
      ],
    },
    {
      id: "how-long",
      title: "How long we keep it",
      body: [
        "We keep what you sent for two years after we last spoke, then delete it, along with its copy in our inbox. Why two years: hiring and appraisal cycles run once a year, so many companies come back a year later. If you become a client, your contract's terms apply instead. You can ask us to delete it sooner at any time.",
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      body: [
        "Your data is encrypted while it travels between your browser and us. It's kept in a database that only the DEUS staff who need it can open. The website can add new messages to it but never shows them to anyone. If your data is ever leaked or stolen, we'll tell you and the authorities within 3\u00a0×\u00a024 hours, as the applicable laws require.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: ["Under the applicable laws, you can:"],
      points: [
        "Ask what data we hold about you and why, and get a copy of it.",
        "Have anything wrong or out of date corrected.",
        "Ask us to delete your data, or to stop or limit how we use it.",
        "Withdraw your agreement at any time. We'll stop using your data from then on; it doesn't change what we did before.",
        "Get your data in a common file format, to take to another service.",
        "Complain to the government authority for personal data protection in Indonesia.",
      ],
      after: [
        `To do any of these, email ${CONTACT_EMAIL} from the address you used on the form, or message us on WhatsApp from the number you gave, so we know it's you. We'll reply within 3\u00a0×\u00a024 hours of receiving your request.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If we change what the website collects or how we use it, we'll update this page and the date at the top. If a change affects data you've already sent us, we'll ask for your agreement again where the law requires it.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [
        "Send questions about this policy or your data to PT Investama Persada Kurnia (DEUS Human Capital Services):",
      ],
    },
  ],
  contact: { email: "Email us", whatsapp: "Chat on WhatsApp" },
};
