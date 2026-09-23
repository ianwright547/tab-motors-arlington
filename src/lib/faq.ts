import { site } from "./site";
import type { Faq } from "./services";

/**
 * General shop FAQ — the questions customers actually ask at the counter.
 * Carried over from the SEO build's home FAQ. Used on the home page and any
 * page that doesn't have its own topic-specific FAQ.
 */
export const generalFaq: Faq[] = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: `Walk-ins are welcome, especially for state inspections, oil changes and tires. For bigger repairs, calling ahead at ${site.phone.display} means we'll have the right parts and time set aside.`,
  },
  {
    q: "Do you do Virginia state inspection and emissions here?",
    a: "Yes, we're an official Virginia inspection and emissions station right on Langston Blvd in Arlington. We can do both in one visit.",
  },
  {
    q: "What kinds of vehicles do you work on?",
    a: "All makes, foreign and domestic, from everyday commuters to European luxury cars. One of our technicians is a master on BMWs.",
  },
  {
    q: "Are you really AAA Approved?",
    a: "Yes. TAB Motors is a AAA Approved Auto Repair facility, which means we meet AAA's standards for training, equipment and customer satisfaction.",
  },
  {
    q: "Is it true there's free air and free coffee?",
    a: "Yes, free air for your tires and free coffee while you wait. It's the little stuff our customers mention in their reviews.",
  },
  {
    q: "How do you price repairs?",
    a: "You get an honest, upfront price before any work starts. We show you what's wrong, explain what's urgent versus what can wait, and never pressure you into extras.",
  },
];
