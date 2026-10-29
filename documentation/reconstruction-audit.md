# Pulse & Flow reconstruction audit

Baseline: `225c9193f0bd9936500fba668b8613a9cef5f51c`, the initial GitHub commit. The local checkout matched that commit. An existing user change adds a trailing newline to `.gitignore`; it was preserved separately from this reconstruction.

## Existing behavior retained

- The original public navigation, Home dropdown, sticky header, theme/direction preferences and focus-managed drawers.
- Booking form field names, date validation, review dialog, local Pending Confirmation records, changes and cancellation.
- The dashboard's persistent sidebar, overview metrics, primary/supporting panels and all ten destinations, plus logout.
- Opt-in example activity tracking, stored daily check-ins, completion history, session/request filters, illustrative receipt viewing/download/print, notifications, profile and local-data controls.
- Separate credential forms; passwords are never saved or verified. No authentication provider is simulated.
- All 16 HTML destinations and their approved file locations.

## Main findings and changes

| Baseline finding | Reconstruction |
|---|---|
| Condensed display font, uppercase headlines up to 124px | Plus Jakarta Sans headings, Source Sans 3 body, sentence case; homepage 52–60px and inner titles 42–48px on desktop |
| Cobalt/glacier, angular sports identity | Mineral teal `#356875`, soft glacier teal `#A6D8DE`, neutral clinical surfaces, soft 18–24px cards and media |
| Reused approach, journey, team and closing sections | Page-specific information architecture, distinct homepages and separate About/Services compositions |
| Repeated or athletic stock assets | Expanded licensed real-photo library; removed runner/bodybuilding assets and protected faces with appropriate crops |
| Short, incomplete footer | Four navigation columns, Privacy/Terms disclosures and circular Back-to-Top |
| Header assessment CTA and crowded lockup | Patient Login primary action, utilities together, Dashboard final; smaller lockup |
| Quote-only pricing | One editable `CLINIC_PRICING` object, three numerical indicative rates and correct booking package IDs |
| Prominent template/integration commentary | Commercial public copy with concise disclosures at relevant actions; detailed integration notes in documentation |
| Non-sending contact form without useful handoff | Validated enquiry review/copy flow with an explicit unsent state |
| Small portal metadata and heavy display headings | Softer typography, readable labels, consistent SVG icons and compact rounded panels |
| Bar chart with limited visual clarity | Smooth trend line and accurate scales derived from the same recorded example check-ins |
| Compressed source | HTML, CSS and JavaScript formatted for maintainability, without adding build dependencies |

## Deployment contract

GitHub Pages was inspected through the repository API: legacy branch publishing, `main`, root `/`. The site remains buildless with relative links for the repository subpath. No framework, `dist`, hosting metadata or permanent test folder was introduced.
