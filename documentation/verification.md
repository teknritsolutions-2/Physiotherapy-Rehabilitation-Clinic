# Kinerelle refinement verification — 29 October 2026

The existing Pulse & Flow layouts were refined rather than rebuilt. Baseline: the latest dashboard cleanup at `f5549b92b37360209503e1c7d09228fafac02c7e`, preserving the user's changes after the brief's reviewed commit.

Browser: installed Playwright Chromium, Asia/Kolkata timezone. Tools, registry-search evidence, downloads and screenshots remain outside the deliverable under `/private/tmp/kinerelle-qa` and `/private/tmp/kinerelle-tools`.

## Executed checks

- **77 functional assertions passed**, covering dropdown, sticky header, theme/direction persistence, drawers/focus/Escape/scroll lock, body-area links, care preference, all three indicative prices and package IDs, booking validation/review/save/change/cancel, exercise check-ins/history/progress, receipt details/download/print, notifications, profile, settings/export/deletion, password visibility/confirmation, local profiles/logout, enquiry review/copy and all service/article variants.
- **32 focused refinement checks passed**: branded titles/logos, removal of old decorative classes, exact five-node connector alignment, two image-led Home 2 cards, structured service details/actions, outlined Dashboard action, auth clutter removal, concise local-profile disclosures, saved auth theme/direction, dark wordmark, preserved sidebar destinations and prior banner/link/notice removals, calculated contrast and supported/reduced/mobile motion states.
- **704 layout combinations passed**: all 16 HTML documents × all 11 requested widths × light LTR, dark LTR, light RTL and dark RTL. Widths: 320, 360, 390, 430, 640, 768, 820, 1024, 1280, 1440, 1920px. No detected page/content overflow, failed decoded image or JavaScript exception.
- **144 additional targeted layouts** checked Home 2, Login and Sign-up at twelve widths (including 1100px), in all four modes. This includes mobile auth top-spacing and desktop navigation boundaries.
- Both JavaScript files pass syntax checking. Runtime HTML, styles and scripts pass formatting checks. Local page/asset link auditing passes.

## Measured contrast

| Foreground / background | Light | Dark |
|---|---:|---:|
| Secondary body text / page | 4.80:1 | 9.46:1 |
| Accent heading / page | 6.20:1 | 11.03:1 |
| White primary-button label / teal | 6.20:1 | 6.20:1 |
| Essential control border / page | 3.50:1 | 4.90:1 |

These are computed token/control checks, not a claim of a formal accessibility certification. The pale secondary is not used for small text on white. Decorative artwork is intentionally subdued and is not a medical data display.

## Visual review and corrections

Reviewed full-page screenshots and contact sheets for both homepages, About, Services, Service Details, Therapists, Pricing, Booking, Contact, Login, Sign-up and the dashboard at 390, 820 and 1440px in light LTR and dark RTL. Exercise Plans, Session History and Payment Receipts also received separate captures. Final focused screenshots cover all theme/direction variants of Home 2 and authentication.

Corrections include a bounded hero SVG, a five-node connector whose exact coordinates match milestone centers, deliberate vertical tablet/mobile pathways, complete three-stage process content, structured service cards, clean sidebar/preview borders, a real preview login action, matched header action heights and reduced double padding. Measured unused space between Home 2 care details and actions was reduced to about 29px without arbitrary card minimum heights or filler paragraphs. Mobile login starts near the top rather than leaving a large blank region.

The former partial corner, repeated wave and unused banner styles were removed. Duplicate selector blocks were consolidated instead of accumulating superseded overrides. Scroll artwork uses CSS only, rotates over a restrained 20-degree range where supported, becomes static in other browsers and disables motion for reduced-motion/mobile states.

## Patient state integrity

`assets/js/dashboard.js` is byte-for-byte unchanged from the baseline. Storage keys, calculations, request statuses, exercise tracking and receipt behavior are retained. No seeded patient records, fictional clinical percentages, confirmed bookings or payment proof were introduced. The previously removed top banner, Back to clinic link and settings prototype notice remain absent.

The current authentication pages contain no demo credentials or local-profile instructions. Google and Apple buttons are visible with brand marks. Authentication, registration, provider sign-in and password reset report unavailable states until a secure service is connected. Credentials are not saved or transmitted, and no successful sign-in is simulated.

Client authentication layout update: 40 combinations passed across 320, 390, 834, 1024 and 1440px, both themes and both directions. Checks covered field stacking, matching input/CTA widths, provider visibility/logos, top-right display controls, no navbar/footer, password visibility and mismatch correction, unavailable states, and no profile creation or credential storage.

## Brand and publishing boundaries

See `brand-name-check.md` for the exact-name and official USPTO checks. India/WIPO clearance remains outstanding; the proposed identity is not presented as legally registered or exclusive.

The approved file structure is retained: one root `index.html`, 15 secondary documents in `pages/`, source assets and documentation. The current GitHub Pages `main`/root publishing path is preserved. The final handoff verifies the resulting build and served files against repository source.

These checks cover Chromium frontend behavior, not real clinical integrations, secure identity, live scheduling, payment processing, physical printer output, Safari/Firefox certification or a full legal/accessibility audit.

## Follow-up: original symbol and open background sweep

The original movement mark was restored in all five logo/favicon variants. Exactly two decorative curve placements remain, one per homepage; hero and closing-card coils were removed. The single open path runs from approximately 200° to 45° with smooth desktop scroll rotation (−8°/+8°), static reduced-motion behavior and simplified mobile presentation. Home 2 uses a new licensed guided-exercise photograph. All public navbar primary buttons read Login and keep their existing routes.

Executed 200 responsive/theme layout checks across both homepages and all remaining page types. Verified the original symbol path, artwork placement counts, navbar labels, replacement image, scroll/reduced-motion behavior and absence of JavaScript exceptions. Reviewed actual desktop/tablet/mobile screenshots and focused artwork captures. JavaScript data logic was not modified.
