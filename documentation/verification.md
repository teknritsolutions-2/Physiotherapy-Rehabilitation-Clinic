# Verification — 29 October 2026

Browser: installed Playwright Chromium, headless, timezone Asia/Kolkata. Testing tools, screenshots, downloads and logs were kept in `/private/tmp`, outside the client deliverable.

## Passed

- 67 functional assertions covering Home dropdown hover/click/keyboard/Escape/outside click, sticky header, back-to-top action, theme persistence, RTL, body-area selection, therapist care-focus prefill, pricing package prefill, date minimum, request review/save/change/cancel/detail and history filters.
- Portal views, opt-in example plan tracking and completion history, checkbox persistence, sample receipt details/download/print action, receipt filters, notification read state, profile session updates, reminder preferences, export and confirmed local-data deletion.
- Sign-up mismatch validation, password visibility, local profile continuation, disabled social integration states, logout and password-reset explanation. Persistent storage was checked to exclude passwords and submitted email/contact notes.
- Mobile public and dashboard drawers: correct LTR/RTL edge, focus trapping, Escape, scroll restoration and destination selection.
- Contact preview and every dynamic service/article variant.
- 704 page/width/theme/direction layout checks: all 16 documents × 11 widths × four modes. Widths: 320, 360, 390, 430, 640, 768, 820, 1024, 1280, 1440 and 1920. Modes: light LTR, dark LTR, light RTL and dark RTL.
- Additional 144 dashboard layout regressions after final tablet header refinements.
- No JavaScript exceptions, failed local asset paths or detected page/content horizontal overflow in the tested combinations. Lazy images were explicitly decoded before image checks.
- JavaScript syntax checks for both scripts. Static HTML reference audit found no broken relative page or asset links.

## Visual review

Captured and reviewed desktop/tablet/mobile screenshots and contact sheets for Home 1, Home 2, Services, Service Details, Therapists, Pricing, Login, Sign-up and Dashboard. Separate overview, exercise tracker, session history and payment receipt screenshots were captured at 390, 820 and 1440 pixels in light LTR and dark RTL, with further public theme captures.

Observed issues corrected during review: Escape dismissal for a pointer-opened Home menu; mobile drawer backdrop stacking; clipped mobile hero text; mismatched body-area photos; repeat service imagery; cropped Home 2 athlete; redundant tablet dashboard drawer controls; constrained tablet title actions.

Screenshots and prototype data are not part of the deliverable. Fresh visitors begin with empty clinical records. Tests activated an example tracker and created their own pending/cancelled local request; these are not hardcoded data in the site.

## Limits

This verifies a static frontend preview in Chromium. Safari/Firefox, assistive-technology certification, formal WCAG auditing, real authentication, clinic scheduling, payment processing, clinical record integration and production security require separate integration testing. Print action invocation and the sample’s print stylesheet were checked; physical printer output was not tested. No production deployment was requested or performed.
