# AFS Commercial Systems — website

Single page marketing site for AFS Commercial Systems Pty Ltd.
Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no dependencies.
Open `index.html` in a browser, or push the folder to any static host.

## Structure

```
index.html            The whole site, one scrolling page
assets/css/site.css   Design system and all styles
assets/js/site.js     Navigation, card stack, scroll reveals, booking link
assets/fonts/         Plus Jakarta Sans and DM Sans, self hosted (woff2)
assets/img/           Product screenshots (webp), headshots, favicon
robots.txt
sitemap.xml           Update the domain here if it changes
```

Sections, in order: hero, Product (`#product`, six stacking cards), Structure,
Aggregated cashflow, Our People (`#people`), From the founder, closing call to
action, footer.
The two navigation links scroll to `#product` and `#people`.

## Design system

Carried from the AFS Company & Product Overview brochure.

- Plus Jakarta Sans: headings, eyebrows, labels, names and roles, wordmark, numerals
- DM Sans: every paragraph of body copy
- Navy first palette, blue used as an accent only. Tokens are in `:root` in `site.css`
- No em dashes anywhere in site copy

Fonts are self hosted rather than loaded from Google, so there is no third party
request on page load and the site renders correctly from disk with no console errors.

## The platform cards

The Product section is six cards that pin and stack as you scroll, so each new
screen slides up over the one before it.

- The pinning is pure CSS: each `.stack__card` is `position: sticky` with a top
  offset of `--stack-top + --i * --stack-step`, where `--i` is the card index set
  inline in the HTML. Add or remove a card and renumber `--i` on each one.
- `site.js` only adds the settle: as a card is covered it eases back very
  slightly and a white veil fades in over it. The veil is a pseudo-element rather
  than plain opacity, so a covered card never ghosts through the one on top.
- Visitors who have reduced motion turned on get a plain unpinned list.
- Screenshots are 3200 x 1500 lossless webp, captured at 2x. The frame has a 10px
  inset so the screenshot keeps square corners inside the rounded outer card. If
  you replace one, crop it to the same 3200 x 1500 or update the `aspect-ratio`
  on `.stack__shot` in `site.css` to match.

## Book a Demo

Every button on the page is a `mailto:` link by default, so the site works before
anything is set up.

The live link is set in `assets/js/site.js`, one line near the top:

```js
var BOOKING_URL = 'https://calendar.app.google/mWvefSubw2LFCc177';
```

That one line repoints all seven Book a Demo buttons and opens the booking page
in a new tab. Empty the string to fall back to the `mailto:` link that is still
written into the HTML.

To create the link, in Google Calendar: Create, then Appointment schedule. Set the
duration, set the available days and hours, and check that it is writing to and
checking against his main calendar. Then use Open booking page and copy the URL.

Availability rules live in Google Calendar, not on this site, which is why no days
or times are written into the page copy.

## Deploying

The site is static, so any of these work with no configuration.

**Cloudflare Pages or Netlify (recommended).** Connect the GitHub repository once.
Every push to `main` deploys automatically. Build command: none. Output directory: `/`.
Free SSL, free custom domain, preview URLs per branch.

**GitHub Pages.** Settings, Pages, deploy from branch `main`, folder `/ (root)`.

### Custom domain

Add the host's CNAME or A record for `www.afscommercial.com.au` at the registrar.
Do not remove or alter the existing MX records, which carry Google Workspace email.
Website hosting and email are independent of each other.

## Content rules

- Represent product maturity honestly. V1 goes to market Q3 2026. ProcurePro, Payapps
  and Fiable integrations are in progress, not released. 5D BIM and the Developer
  module are roadmap.
- No invented customer logos, testimonials, case studies or customer counts.
- No claim of SOC 2 or ISO certification.
- No dollar figures on the public site.

## Open items

- A Reporting or dashboard screen, once that part of the product is finished.
- The Aggregated cashflow section still uses three copies of the older
  organisation cashflow capture, and its cascade is still numbered organisation,
  entity, project while the heading above it now reads project, entity, org.
  Swapping in the newer captures and flipping the numbering would fix both.
- The advisory board group on Our People is commented out in `index.html`,
  pending sign off from every member. Search for "Advisory board hidden" and
  delete the two comment markers to bring it back.
- Two advisory board seats remain shown as to be confirmed.
