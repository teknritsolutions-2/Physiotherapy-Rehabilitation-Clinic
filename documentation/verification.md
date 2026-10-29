# Pulse & Flow verification — 29 October 2026

Test browser: installed Playwright Chromium, headless, Asia/Kolkata timezone. Tests, screenshots, sample downloads and tooling were kept outside the deliverable in `/private/tmp/pulse-qa` and `/private/tmp/pulse-tools`.

## Executed functional tests

The full regression run passed **76 assertions** with **zero JavaScript exceptions**. It exercised:

- Home dropdown hover, click, focus/Arrow Down, Escape and outside click; actual sticky positioning and Back-to-Top.
- Theme persistence, RTL, LTR/RTL drawer edges, focus trapping, Escape, scroll restoration and mobile dashboard navigation.
- Body-area selection and care links; therapist-focus preference prefill.
- All three numerical rates (`₹1,200`, `₹900`, `₹3,400`), plan IDs and booking prefill.
- Date minimum, contact-field validation, request review, pending local storage, request detail/change/cancel and history status filters.
- A four-session package producing exactly one pending request, with no fabricated confirmations or payment state.
- Opt-in example exercise tracking, daily completion persistence/history and trend values derived from recorded check-ins.
- Receipt sample detail, actual HTML download, print-action invocation and issued-only filtering.
- Notifications/read state, profile changes, reminder preference, data export and confirmed deletion.
- Sign-up mismatch validation, password visibility, browser-profile continuation, password reset disclosure and logout. Persistent storage was checked to exclude passwords, email and booking notes.
- Contact enquiry review/copy handoff with no sent-success claim; all four service and article variants.

A final targeted run also checked Privacy/Terms dialogs and the footer’s circular Back-to-Top control after correcting overlap with the floating control.

## Layout and image checks

**704 combinations passed:** all 16 HTML documents × 11 requested widths × 4 theme/direction modes.

Widths: 320, 360, 390, 430, 640, 768, 820, 1024, 1280, 1440, 1920.

Modes: light LTR, dark LTR, light RTL, dark RTL.

Checks included page/content overflow, image decoding and browser exceptions. There were no detected overflow or failed image results. Another **120 targeted layout checks** covered Home 1, Home 2 and Pricing across ten widths (including the 1100px navigation boundary) and all four modes after final header/photo refinements. Desktop navigation blocks were checked for collisions.

JavaScript syntax checks passed for both runtime scripts. HTML relative-link auditing found no missing destinations or source assets. Only `index.html` is at root; 15 secondary documents remain in `pages/`. No framework, build/test output, `dist`, `scripts` or hosting folder was added. Source whitespace checks exclude the pre-existing, preserved `.gitignore` trailing-line change.

## Actual visual review

Captured light LTR and dark RTL full-page screenshots at 390, 820 and 1440px for Home 1, Home 2, About, Services, Service Details, Therapists, Pricing, Contact, Booking, Login, Sign-up and Dashboard. Separate overview, exercise-plan, history and receipt captures were taken at the same representative widths. Full-page images, focused screenshots and contact sheets were visually reviewed.

Corrections from review: protected therapist/patient faces in hero crops; moved Home 2’s caption clear of the tablet CTA; aligned pricing baselines; distributed desktop header spacing; retained tablet columns where useful; removed obsolete tablet drawer controls; prevented the floating Back-to-Top from covering its footer counterpart.

The final receipt detail remained visibly marked **SAMPLE — NOT PROOF OF PAYMENT** in the mobile dialog. Tests created their own example check-ins and pending/cancelled requests. No test records are hardcoded into the site.

## Publishing and scope

The existing GitHub Pages configuration was verified: legacy publishing from `main` at `/`. The rebuilt source keeps project-subpath-relative URLs. Publication is verified against the resulting Pages build and served source files during handoff.

This validates a static frontend in Chromium. No Safari/Firefox certification, formal WCAG audit or real clinical integrations are claimed. Physical printer output, secure authentication, live scheduling, clinician records and payment processing require separate integration testing. The website retains honest browser-only behavior for those unconnected actions.
