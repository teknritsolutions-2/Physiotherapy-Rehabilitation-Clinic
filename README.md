# Kinerelle — Physiotherapy & Rehabilitation

A buildless HTML5, CSS3 and vanilla JavaScript clinic website, reconstructed around the **Pulse & Flow** design direction: calm mineral teal, soft glacier teal, approachable type and subtle continuity-inspired lines.

## Run locally

```sh
python3 -m http.server 8010
```

Visit http://localhost:8010. Open `index.html` for Home 1; all 15 secondary pages are in `pages/`. There is no build step, runtime dependency or external font request.

## Included

- Two distinct complete homepages, a patient-first About page and purpose-specific service discovery.
- Parameterized service guides and four general educational articles.
- Therapist care-focus directory, without invented staff names or credentials.
- Centralized indicative INR pricing, correct package prefill and a focused booking-request interface.
- General enquiry review/copy handoff; no message is falsely reported as sent.
- Complete four-column footer, privacy/terms dialogs, sticky navigation, Home dropdown and accessible mobile drawers.
- Separate sign-in and sign-up forms with visibility/confirmation controls and hidden social integrations.
- Existing patient dashboard architecture, restyled with the new identity, sharper SVG icons and recorded-data activity curves.
- Local booking changes/cancellation, optional illustrative exercise tracking, history filters, receipt sample view/download/print, notifications, profile and data settings.
- Responsive layouts, light/dark themes and LTR/RTL direction; self-hosted Plus Jakarta Sans and Source Sans 3.

## Edit pricing in one place

At the top of `assets/js/main.js`:

```js
window.CLINIC_PRICING = {
  currency: 'INR',
  assessment: 1200,
  followup: 900,
  fourSessionPack: 3400
};
```

These are indicative design defaults, not approved clinic rates. Both the pricing page and booking summary use this object. Selecting the four-session pack creates one pending preference request, not four confirmed appointments. No payment is taken.

## Functional boundaries

Booking requests stay in this browser as **Pending Confirmation** and are not transmitted to a clinic. The site does not simulate live scheduling, secure authentication, attended sessions, clinical prescriptions, payment processing or issued receipts.

Passwords are never saved, transmitted or verified. Browser profile contact fields live in SessionStorage for the tab; only an optional display name can be remembered in LocalStorage. Booking contact fields and notes are discarded after request review. Persisted requests contain only non-sensitive service/date/time/package preferences and local status.

The patient dashboard starts with empty clinical records. Exercise examples require explicit activation, contain no prescription and are clearly marked. Charts count only actual recorded example check-ins. The illustrative receipt is not payment proof and contains no invented amount or transaction ID.

The public contact form validates, reviews and copies an enquiry; it does not send it. No address, hours, real clinician identity or credentials have been invented.

## Deployment

GitHub Pages serves `main` from the repository root. Publish the source directly; `index.html` is the actual homepage. All paths support the repository subpath. There is no framework migration, `dist`, build output or extra hosting folder.

## Documentation

- `documentation/reconstruction-audit.md`: baseline findings and preserved behavior.
- `documentation/customization.md`: design, configuration, routes, data contracts and integration points.
- `documentation/image-sources.md`: real photography and font licensing.
- `documentation/verification.md`: executed browser checks and visual review.

Before using this for real patient care, supply verified clinic records, approved pricing and legal text, secure authentication, scheduling/contact integrations and appropriate clinical storage/access controls. The frontend’s truthful browser-only behavior must not be relabeled as a connected service.

## Kinerelle finishing pass

The site now uses the proposed **Kinerelle** brand and the restored original movement symbol and vector wordmark, plus the glacier secondary `#A6D8DE`. The calmer page layouts are retained. Refinements include connected recovery milestones, selected orbital artwork, balanced Home 2 care features, structured service cards, cleaner patient-space previews, an outlined Dashboard action and simplified login/sign-up forms.

The 10-view patient dashboard's data logic is unchanged, including the user's prior banner/link/notice removals. Local-profile authentication remains explicitly identified beside the action; it never verifies, stores or transmits passwords.

See `documentation/brand-name-check.md` for the preliminary exact-name/USPTO search and the outstanding India/WIPO commercial clearance limitation. The name is proposed, not a claimed registered clinic identity.
