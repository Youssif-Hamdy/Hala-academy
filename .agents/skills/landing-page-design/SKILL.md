---
name: landing-page-design
description: "Complete system for building high converting landing pages: intake questions, page structure, layout selection, conversion copywriting, SEO, plus strict visual rules for typography, spacing, corner radius, backgrounds, hero layout, icons, and motion. Use this skill whenever building, editing, styling, reviewing, or writing copy for ANY landing page, marketing site, web UI, page section, component, or prototype, even when the user does not mention design, conversion, tokens, or a design system. Always consult it before choosing page sections, headlines, CTAs, fonts, font sizes, spacing values, border radii, background colors, icons, or transitions."
---

# Landing Page Design

A landing page is not a homepage. A homepage serves multiple intents. A landing page wins one intent:

**one offer → one audience → one primary action.**

This skill has two halves. **Part A** decides what the page says and how it is structured. **Part B** is the non negotiable visual system. Work through A before touching B.

## Scope

Apply to all web UI work: landing pages, marketing sites, components, dashboards, prototypes, and design reviews. When a rule here conflicts with a framework default, this file wins. When the user's explicit prompt conflicts with a rule, the user wins.

---

# PART A — Strategy and structure

## A1. Intake

Gather these before designing or writing. Ask only for what is missing, and ask in one batch rather than one question at a time.

**Purpose**
- What is the ONE primary action? (trial, demo, buy, waitlist, download)
- What is the offer, exactly what do they get?
- What counts as a conversion? (click, signup, purchase)

**Audience and context**
- Who is the ICP?
- What problem are they trying to solve?
- Top three objections, meaning why they do not convert today
- Traffic source: ads, search, social, email
- What do visitors already know when they land?

**Proof and assets**
- Proof points: logos, testimonials, numbers, case studies
- Screenshots, demo video, product GIFs
- Guarantees, refund terms, cancellation terms

**Constraints**
- Brand voice: casual or professional
- Design direction: minimal editorial, playful 3D, glass UI
- Mobile priority?

If the user cannot answer, make a reasonable assumption, state it in one line, and continue. Do not stall the build.

## A2. Page structure

**Above the fold (required)**
1. Headline, outcome plus audience
2. Subheadline, clarifies how and adds specificity
3. Primary CTA, clear verb plus what they get
4. One proof signal, logo strip, stat, or short testimonial
5. Hero visual, product screenshot or video, or a strong illustration

**Mid page (the argument)**
6. Problem to solution, one section
7. Benefits, three to five, outcome driven
8. How it works, three steps
9. Social proof, testimonials or a case study

**Bottom (objection handling)**
10. FAQ, six to twelve questions
11. Risk reversal, trial, cancel anytime, guarantee
12. Final CTA, identical to the top

## A3. Layout selection

Pick one and say why.
- **Classic hero plus sections**: The product is understandable from a hero screenshot/visual. Most common.
- **Long form story**: You need to educate and overcome skepticism.
- **Minimal conversion page**: High intent traffic.

## A4. Conversion rules

- **Match message to source.** Mirror promise and visual tone.
- **Make the next step obvious.** One primary CTA. Never place competing CTAs above the fold.
- **Write benefit first.** Features are what it does. Benefits are what that means for them.
- **Be specific.**
- **Reduce risk.** Guarantees, clear terms.
- **Objections as a section.** Clear FAQ directly beside claims.

## A5. Copywriting

- **Headline formulas**: "{Outcome} without {pain}", "The {category} for {audience}", "Ship {result} in {time}"
- **Subheadline**: One or two sentences. Clarify what it is and who it is for.
- **CTA**: Verb plus what they get (e.g. "احجزي مقعدك الآن", "ابدئي تجربة الكورس مجاناً").
- **Benefit bullets**: Bold benefit, then the proof or detail.
- **No hyphens inside sentences, no orphaned words (`text-wrap: balance`).**

## A6. Build order

Work section by section:
1. Hero → 2. Benefits → 3. How it works → 4. Proof → 5. FAQ → 6. Final CTA

---

# PART B — Visual system

Every visual value must resolve through these rules instead of being invented ad hoc.

## B1. Typography

- **Fonts:** Modern curated typefaces (IBM Plex Sans Arabic for Arabic, Cormorant Garamond / Marcellus for editorial accents).
- **No italic fonts.**
- **No ultra bold weights (900/black).** Cap at semibold (600) or bold (700).
- **No orphaned words:** `text-wrap: balance` on headings, `text-wrap: pretty` on body copy.
- **Strict Type Scale:**
  - `text-6xl`: 60px / 60px line height (Heading 1)
  - `text-5xl`: 48px / 48px line height (Heading 2)
  - `text-4xl`: 36px / 40px line height (Heading 3)
  - `text-3xl`: 30px / 36px line height (Heading 4)
  - `text-2xl`: 24px / 32px line height (Heading 5)
  - `text-xl`: 20px / 28px line height (Heading 6 / Title 1)
  - `text-lg`: 18px / 28px line height (Title 2 / Button-lg)
  - `text-base`: 16px / 24px line height (Title 3 / Body 1-3 / Button-md)
  - `text-sm`: 14px / 20px line height (Title 4 / Body 4-6 / Button-sm / Caption 1-2)
  - `text-xs`: 12px / 16px line height (Title 5 / Button-Xsm / Caption 3-5)

## B2. Spacing

Strict spacing tokens only:
- 0, 2px (25), 4px (50), 8px (75), 12px (100), 16px (200), 24px (300), 32px (400), 40px (500), 48px (600), 64px (700), 80px (800), 96px (900).
- Buttons: 8px vertical padding, 12px-20px horizontal padding.

## B3. Corner Radius

- Minimalist luxury 2px-8px or full pill.
- **Nested radius formula:** `inner radius = outer radius - gap`.
  If outer card has 16px radius and 8px padding, inner element must have 8px radius.

## B4. Borders and Backgrounds

- Never apply border to only one side of a card. All the way around or none.
- Clean flat surfaces or refined glassmorphic blur with hairline border.

## B5. Hero Section

- Heading and subheading max-width: 680px.
- Intentional line breaks where thought breaks.
- Subtle luxury gradient on heading text.

## B6. Icons

- Use clean modern outline icons (Lucide / Phosphor). No bulky generic icons.

## B7. Motion & Micro-interactions

- Base curve: `cubic-bezier(0.22, 1, 0.36, 1)` with `500ms` duration.
- Only animate `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`.
- Floating glass navigation bar with backdrop blur.
- Scroll reveals with IntersectionObserver.

## B8. Content Realism

- Real copy, real names, real curriculum metrics, real testimonials.
