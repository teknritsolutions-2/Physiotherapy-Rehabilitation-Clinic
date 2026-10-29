# Customization and behavior

## Design

The only brand colors are cobalt `#2D56D8` and glacier `#8EDBEA`. Neutral tokens live at the top of `assets/css/style.css`; dark overrides are in `dark-mode.css`. Direction is controlled through `html[dir]` with logical spacing and `rtl.css`. Photos and the logo are never mirrored.

Self-hosted fonts eliminate third-party font requests. Barlow Condensed 800/900 is the display family; Public Sans 400–700 is used for body/UI. Font licenses are included in `assets/fonts/`.

The shared header/footer is included directly in each public HTML document for static hosting. If changing shared navigation, update each public page. Login, sign-up and dashboard intentionally have no public header/footer. `main.js` initializes dropdowns, drawers, preferences and public interactions. `dashboard.js` owns portal views.

## Routes

- `pages/service-details.html?service=sports`, `?service=surgery`, `?service=back`, `?service=movement`.
- `pages/blog-details.html?article=assessment`, `?article=process`, `?article=activity`, `?article=habits`.
- Booking supports `service`, `preference` and `package` (`assessment`, `followup`, `careplan`) query parameters.
- Portal views: `#overview`, `#book`, `#appointments`, `#plans`, `#history`, `#progress`, `#receipts`, `#notifications`, `#profile`, `#settings`.
- Unknown service/article IDs fall back to a useful default; unknown portal hashes show Overview.

Services and article variants are defined in `main.js`. Public booking markup lives in `pages/booking.html`; its portal equivalent is the `CLINIC_BOOKING_FORM` string at the top of `dashboard.js`. Keep the two forms synchronized when modifying fields.

## Local data model

Only keys prefixed `clinic.` are touched. LocalStorage records:

- `appointments`: IDs, service, date/time preference, session type, care preference, status and creation timestamp. No contact details or notes.
- `examplePlan`, `examplePlanDate`, `checkins`: opted-in example tracker state; check-ins have a date, example activity ID and explicit example flag.
- `theme`, `direction`, `displayName`, `notificationsEnabled`, `notificationsRead`: UI preferences and optional display name.

SessionStorage `clinic.profile` holds example name, email, phone and contact preference until the session ends or Logout is clicked. No credentials are retained. Settings exports non-sensitive prototype data and clears only this template’s keys after confirmation. This storage design does not provide user isolation or security for clinical records.

## Current functional contracts

Booking review saves locally, never confirms. Pending requests can be changed or cancelled; history can filter by date and status. Past dates are invalid. Calendar rings represent pending requests, not confirmed sessions. There is no clinical completion transition.

The optional example plan has three neutral activity slots without instructions, dosage or clinical claims. Checkboxes are daily and persist completion history. Progress charts count actual recorded example check-ins. There is no recovery score.

The receipt screen exposes an illustrative sample only. Its download is an actual standalone HTML document, clearly marked not proof of payment. Printing preserves the disclaimer. Clinic-issued filtering correctly produces an empty state.

Contact form validates and reports a local preview result without saving or sending. Login/signup never authenticate. Remembering a profile stores only its display name; a real identity provider is required to replace this behavior.

## Deployment

Serve the directory directly through any static host. For GitHub Pages select the repository root as the source; `index.html` is the actual homepage. Use project-relative links as supplied. A hosting service may need configuration to serve `pages/404.html` for unknown URLs. No production hosting configuration or publication has been added.

## Accessibility

There is a skip link, logical landmarks, native labels, visible focus, reduced-motion support and accessible modal dialogs. Drawers trap focus, support Escape and restore focus/scroll. The Home menu supports pointer hover, click, Arrow Down, focus, Escape and outside click. Charts include text alternatives. Cobalt and glacier should not be repurposed as low-contrast body text on white.
