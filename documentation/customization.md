# Pulse & Flow customization

## Visual system

`assets/css/style.css` contains readable shared tokens, components and page-specific layouts. Brand colors are mineral teal `#356875` and muted soft glacier teal `#A6D8DE`; all larger surfaces use neutral whites/greys. `dark-mode.css` changes surfaces to `#171C20`/`#242C30`, with readable glacier text accents. `rtl.css` changes layout direction and arrows without flipping photography or logos.

Headings use self-hosted Plus Jakarta Sans 400–700; body/interface uses Source Sans 3 400–700. Desktop homepage headings are 52–60px; inner-page titles 42–48px; mobile titles approximately 34–40px. Sections use 76px desktop, 56px tablet, 38px mobile, with explicit compact variants. Card corners are 18–24px; buttons and controls are 10–12px.

Flow-line SVGs are decorative continuity motifs, not ECGs or vital-sign displays. The public pathway connects assessment, planning, therapy, exercise support and review. The former partial card-edge treatment has been removed. Reduced-motion users receive no transitions. Portal curves count recorded example activity, never clinical recovery.

The public header/footer are real static HTML in every public page for GitHub Pages. Login/signup/dashboard have no public navbar or footer. Update shared markup consistently across public documents. Source files were formatted using a temporary formatter kept outside the project; no formatter or build system is required to use the site.

## Central pricing configuration

Edit `window.CLINIC_PRICING` at the top of `assets/js/main.js`. It defines currency and all three indicative values. `[data-price]` spans render these values; the booking summary and review use `Clinic.price()`.

Package IDs: `assessment`, `followup`, `fourSessionPack`. Old locally saved `careplan` records remain readable through `Clinic.packageLabel()`. A package selection never creates multiple appointments or changes a payment status. The highlighted Follow-up card uses the primary action without making a popularity claim.

Before approving rates, confirm fees, package terms, duration, eligibility, cancellations and payment arrangements with the client. Keep the concise indicative-rate notice until approval.

## Content and routes

- `service-details.html?service=sports`, `surgery`, `back` or `movement`.
- `blog-details.html?article=assessment`, `process`, `activity` or `habits`.
- `booking.html` accepts `service`, `preference` and `package` parameters.
- Portal: `#overview`, `#book`, `#appointments`, `#plans`, `#history`, `#progress`, `#receipts`, `#notifications`, `#profile`, `#settings`.

Service/article variants and public interaction logic live in `main.js`. Portal views and data behavior live in `dashboard.js`. The public booking form and `CLINIC_BOOKING_FORM` at the top of `dashboard.js` must retain matching fields. All secondary documents remain under `pages/`; only `index.html` is at root.

Therapists are presented as generic care-focus options, with real stock photographs identified as illustrative settings. Add verified names, roles, credentials and registration details only when supplied. A focus preference does not select an available clinician. No clinic history, accreditation, address or opening hours has been invented.

## Enquiry handoff

The Contact form accepts name, email, optional phone, topic and message. Native validation precedes a review dialog. Copy uses the browser Clipboard API; if permission is unavailable, the text is selected for manual copying. Both paths explicitly state that no message was sent. Connect an approved recipient/backend before adding a Send action. No enquiry data is persisted.

Privacy and Terms footer buttons open readable information dialogs. They explain current behavior; obtain clinic-approved policies before collecting real patient information.

## Local data contract (retained)

Only keys prefixed `clinic.` are used. LocalStorage holds non-sensitive request preferences/status, opted-in example plan/check-ins, theme/direction, notification preferences/read state and an optional display name. Booking names, emails, phone and notes are not persisted.

`SessionStorage['clinic.profile']` holds the browser profile’s contact fields for the tab. Logout clears the session profile and remembered display name. Passwords are never retained or verified. Social provider controls are hidden in an inert template until a real integration is supplied. Browser-only state provides no clinical security or per-user access isolation.

Settings exports requests/example check-ins/preferences and clears this template’s data only after confirmation. Retained records from the previous design remain readable because storage keys and ID/status semantics are unchanged.

## Integration requirements

Real operations require an authenticated backend, access controls, secure storage, scheduling and clinician confirmation, clinic-issued plans/session history/receipts, a contact service and a payment provider where applicable. Do not mark pending requests Attended, Confirmed or Paid without trusted records. Do not prescribe exercises from body-area clicks or infer recovery/readiness from completion counts.

## Static hosting

GitHub Pages uses the existing `main` branch root. The source includes no generated build directory. All internal paths are relative to support `/Physiotherapy-Rehabilitation-Clinic/`. `pages/404.html` is an explicit destination; automatic missing-URL handling depends on the host’s configuration.

## Kinerelle refinement

The proposed brand is **Kinerelle**, with descriptor **Physiotherapy & Rehabilitation** and positioning **Movement supported. Progress understood.** Read `brand-name-check.md` before commercial brand adoption.

The original movement symbol is restored, accompanied by the outlined Kinerelle vector wordmark. All text in the logo SVG is real vector paths, derived from the included font families, so it renders without external font requests. Assets: `logo.svg`, `logo-dark.svg`, `logo-compact.svg`, `logo-compact-dark.svg`, `favicon.svg`. The compact lockup is used only in the existing patient sidebar.

The secondary token is `--secondary: #A6D8DE`. Surface-aware `--accent-text`, `--control-border`, `--art-ink`, `--art-soft`, `--path-line` and `--chart-track` tokens support both themes. Small light-mode text uses primary teal or charcoal, never the pale secondary.

Old `.flow-line` and `.pulse-edge::after` implementations have been removed. The five-step guide has a dedicated connector whose endpoints share the milestone coordinate system. Tablet/mobile use a vertical path. Home 2 has a separate three-stage process feature with straight label-centered connectors and compact image-led care cards. Decorative artwork uses the shaded-ribbon system described below.

Login and Sign Up are separate pages with no public navbar or footer. The logo remains inside the form card and theme/direction controls sit at its top-right. Fields are vertical, the primary and Google/Apple buttons match input width, and Login keeps Remember me and Forgot password on one row. Password visibility and confirmation are supported; there are no demo credentials or prototype instructions. Provider buttons include inline brand marks. A secure authentication backend and Google/Apple OAuth configuration are still required: form submission, provider selection and password reset currently report an unavailable state. They do not store or transmit credentials, create profiles or redirect as if authentication succeeded.

The dashboard runtime `assets/js/dashboard.js`, storage keys, calculations and booking/receipt logic were left unchanged. The previously removed banner, Back to clinic link and settings notice remain removed. Only its logo, palette and shared style improvements apply.

## Original mark and flowing gradient artwork

The original two-stroke movement symbol and circular accent are restored beside the Kinerelle wordmark. Navbar primary actions now read **Login**; their destinations are unchanged.

The former thin background sweeps have been removed. Both homepages have ribbon artwork in their banners and one lower feature section. Each of the other 11 public pages has one placement, either in the intro or beneath a feature section. Authentication and dashboard views have no decorative ribbons. Home 1 uses a balanced split banner with a wider rounded photo card and an integrated caption. Home 2 keeps its wide photo with gradient artwork behind it.

`data-care-ribbon` selects one of six open gradient forms: `twist`, `wave`, `sail`, `loop`, `fold` or `arc`. The names remain stable for the page placements, while their shapes have been redrawn as broad, open curves. Each original SVG uses continuous teal, glacier, mint and warm-pearl gradients; there is no line texture, ribbing or tight central pinch. The artwork is rendered directly as a vector image rather than a WebGL mesh. `main.js` moves the complete image with a gentle compositor transform and time-based scroll easing. Motion pauses offscreen/in a hidden tab, and reduced-motion or no-JavaScript views display the same artwork still. Authentication and dashboard pages have no decorative artwork. No third-party renderer, Stripe asset or external runtime is loaded.
