# Physiotherapy & Rehabilitation Clinic

A complete buildless frontend template using HTML5, CSS3 and vanilla JavaScript. Start at **index.html**. All 15 secondary HTML pages are in `pages/`.

## Preview

Run from this directory:

```sh
python3 -m http.server 8010
```

Open http://localhost:8010. A static server gives every page a consistent LocalStorage origin. The site also uses relative asset links for deployment to a GitHub Pages project subpath. There is no build step or dependency installation.

## Included

- Two distinct editorial homepages, About, Services and parameterized service guides.
- Therapist directory with clearly marked configurable clinician slots; three quote-based care options.
- Journal listing and four parameterized educational articles.
- Booking request review and local persistence; Contact, 404 and Coming Soon pages.
- Separate login and sign-up previews with password visibility and form validation.
- Patient portal with ten destinations, logout, booking changes/cancellation, history filters, notifications, profile, settings and data export/deletion.
- Optional illustrative activity tracker, completion history, activity charts and calendar.
- Sample receipt view, filter, downloadable HTML document and print stylesheet. The document is visibly marked as illustrative and is not payment proof.
- Self-hosted Barlow Condensed / Public Sans fonts, local photography, symbol logo and favicon.
- Persistent light/dark and LTR/RTL preferences; keyboard navigation and mobile focus-trapped drawers.

## Preview boundaries

This is a frontend demonstration, not a connected patient service. Booking preferences are stored locally as **Pending Confirmation**. No clinic receives them. No live availability, attended sessions, clinician prescriptions, issued payment receipts, payments or secure authentication are simulated.

Use example identities in forms. Passwords are never saved, transmitted or verified. The sign-up/login UI opens an explicitly local profile session. Google and Apple controls are disabled until real integrations are supplied.

Booking contact fields and notes are discarded; only service, session type, focus preference, date/time and local status persist. Profile contact fields live only in SessionStorage for the tab. An optional display name can be remembered in LocalStorage. Do not use this browser-only storage for real health or payment records.

The portal begins with empty records. Example exercise tracking requires explicit activation and contains no exercise prescription. All chart values come from your own local example check-ins. The receipt sample contains no invented amount or transaction identifier.

## Before clinic deployment

Replace the explicitly identified clinician slots, pricing/quote terms and contact information with verified client data. Connect the booking/contact forms, identity provider, clinician assignments, clinical session records and receipt service to an appropriately secured backend. Have clinical text reviewed by the clinic. See `documentation/customization.md`.

## Source layout

```text
index.html
assets/
  css/style.css, dark-mode.css, rtl.css
  js/main.js, dashboard.js, plugins/
  images/
  fonts/
pages/
  home2.html, about.html, services.html, service-details.html
  therapists.html, pricing.html, blog.html, blog-details.html
  booking.html, contact.html, login.html, signup.html
  dashboard.html, 404.html, coming-soon.html
documentation/
README.md
```

The supplied attachment contained the written brief, but no separate visual-reference images. The implementation follows its described editorial direction. The clinic’s descriptive title is used without an invented company name.

See `documentation/image-sources.md` for photography and font licenses and `documentation/verification.md` for browser verification.
