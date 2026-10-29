window.CLINIC_BOOKING_FORM =
  '<form id="booking-form" class="form-grid"><div class="form-heading"><span class="eyebrow">Your preferences</span><h3>Tell us what works for you.</h3><p>Choose a service and the time that suits you. You\u2019ll review everything before saving a request.</p></div><label>Patient name<input name="name" autocomplete="name" required maxlength="80" placeholder="Your full name"></label><label>Email<input type="email" name="email" autocomplete="email" required maxlength="120" placeholder="you@example.com"></label><label>Phone<input type="tel" name="phone" autocomplete="tel" required minlength="7" maxlength="24" placeholder="Your contact number"></label><label>Therapy service<select name="service" required><option value="">Choose a service</option><option value="sports">Sports Injury Rehabilitation</option><option value="surgery">Post-Surgery Rehabilitation</option><option value="back">Back Pain Physiotherapy</option><option value="movement">Movement Assessment</option></select></label><label>Care focus preference<select name="preference"><option value="">No preference</option><option value="sports">Sports & activity</option><option value="surgery">Post-surgery</option><option value="back">Everyday movement</option></select><small>A care-focus preference, not a named clinician assignment.</small></label><label>Session type<select name="package"><option value="assessment">Initial Assessment</option><option value="followup">Follow-up Session</option><option value="fourSessionPack">Four-session rehabilitation pack</option></select></label><label>Preferred date<input type="date" name="date" required></label><label>Preferred time<select name="time" required><option value="">Choose a preference</option><option>09:00</option><option>10:30</option><option>12:00</option><option>14:00</option><option>15:30</option><option>17:00</option></select><small>Preferences only. Subject to clinic confirmation.</small></label><label class="full">Optional scheduling note<textarea name="note" rows="3" maxlength="300" placeholder="For example, I prefer afternoon appointments. Do not enter medical information."></textarea></label><label class="check full"><input type="checkbox" required> I understand this request is saved in this browser and is not sent to a clinic or confirmed as an appointment.</label><div class="full"><button class="button" type="submit">Review Request <span aria-hidden="true">\u2197</span></button></div></form>';
("use strict");
(() => {
  const C = window.Clinic,
    E = C.escape,
    content = document.querySelector("#dashboard-content");
  let calendarMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );
  let historyDate = "",
    historyStatus = "",
    receiptFilter = "all";
  const titles = {
    overview: "Overview",
    book: "Book Therapy Session",
    appointments: "My Appointments",
    plans: "Exercise Plans",
    history: "Session History",
    progress: "My Progress",
    receipts: "Payment Receipts",
    notifications: "Notifications",
    profile: "My Profile",
    settings: "Settings",
  };
  const getAppointments = () => C.read("appointments", []);
  const getChecks = () => C.read("checkins", []);
  const planEnabled = () => C.read("examplePlan", false);
  let profile;
  try {
    profile = JSON.parse(sessionStorage.getItem("clinic.profile") || "null");
  } catch {}
  profile = profile || {
    name: C.read("displayName", "Guest"),
    email: "",
    phone: "",
  };
  const setProfile = () => {
    document.querySelector("#sidebar-name").textContent =
      profile.name || "Guest profile";
    document
      .querySelectorAll(".avatar")
      .forEach(
        (x) =>
          (x.textContent = (profile.name || "G").slice(0, 1).toUpperCase()),
      );
  };
  setProfile();
  const button = (label, hash, secondary = false) =>
    `<a href="#${hash}" class="button ${secondary ? "secondary" : ""}">${label} <span aria-hidden="true">↗</span></a>`;
  const empty = (icon, title, desc, cta = "") =>
    `<div class="empty-state"><span class="empty-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${desc}</p>${cta}</div>`;
  const panel = (title, body, action = "") =>
    `<section class="panel"><div class="panel-heading"><h2>${title}</h2>${action}</div>${body}</section>`;
  const textLink = (label, hash) =>
    `<a class="text-link" href="#${hash}">${label} <span aria-hidden="true">↗</span></a>`;
  const currentView = () =>
    Object.hasOwn(titles, location.hash.slice(1))
      ? location.hash.slice(1)
      : "overview";
  const appointmentRows = (rows, manage = false) =>
    rows
      .map(
        (a) =>
          `<div class="record-row"><div><b>${E(C.services[a.service]?.title || "Movement Assessment")}</b><p>${E(C.formatDate(a.date))} · ${E(a.time)} · ${E(C.packageLabel(a.package))}</p><span class="badge">${E(a.status)}</span></div><div class="record-actions"><button class="button secondary" data-detail="${E(a.id)}">Details</button>${manage && a.status === "Pending Confirmation" ? `<button class="button secondary" data-change="${E(a.id)}">Change</button><button class="button secondary" data-cancel="${E(a.id)}">Cancel</button>` : ""}</div></div>`,
      )
      .join("");
  const upcoming = () =>
    getAppointments()
      .filter((a) => a.status === "Pending Confirmation" && a.date >= C.today())
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  function calendar() {
    const year = calendarMonth.getFullYear(),
      month = calendarMonth.getMonth(),
      days = new Date(year, month + 1, 0).getDate(),
      offset = new Date(year, month, 1).getDay();
    let cells =
      ["S", "M", "T", "W", "T", "F", "S"]
        .map((x) => `<span class="dow">${x}</span>`)
        .join("") + "<span></span>".repeat(offset);
    const records = upcoming();
    for (let i = 1; i <= days; i++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const req = records.some((a) => a.date === key);
      cells += `<span class="${key === C.today() ? "today" : ""} ${req ? "requested" : ""}" aria-label="${E(C.formatDate(key))}${req ? ", request pending" : ""}">${i}</span>`;
    }
    return `<div class="calendar-header"><b>${calendarMonth.toLocaleDateString("en", { month: "long", year: "numeric" })}</b><div class="calendar-controls"><button class="icon-button" data-month="-1" aria-label="Previous month">‹</button><button class="icon-button" data-month="1" aria-label="Next month">›</button></div></div><div class="calendar-grid">${cells}</div><div class="calendar-legend"><span><i></i>Today</span><span><i class="ring"></i>Pending request</span></div>`;
  }
  function activity() {
    const checks = getChecks();
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        date:
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0"),
        label: d.toLocaleDateString("en", { weekday: "short" }),
      };
    });
    const totals = days.map(
      (d) => checks.filter((c) => c.date === d.date).length,
    );
    const max = Math.max(3, ...totals),
      total = totals.reduce((a, b) => a + b, 0);
    const points = totals.map((n, i) => [34 + i * 62, 155 - (n / max) * 132]);
    let path = "M" + points[0].join(" ");
    points.slice(1).forEach((point, i) => {
      const prev = points[i],
        middle = (prev[0] + point[0]) / 2;
      path +=
        " C" +
        middle +
        " " +
        prev[1] +
        "," +
        middle +
        " " +
        point[1] +
        "," +
        point.join(" ");
    });
    const label =
      "Example check-ins over the last 7 days: " +
      days.map((d, i) => d.label + " " + totals[i]).join(", ") +
      ". Completion is not clinical recovery.";
    return `<svg class="flow-chart" viewBox="0 0 438 192" role="img" aria-label="${E(label)}">${[0, 0.5, 1].map((f) => `<line class="grid-line" x1="27" y1="${155 - f * 132}" x2="421" y2="${155 - f * 132}"/><text x="7" y="${159 - f * 132}">${max * f}</text>`).join("")}${total ? `<path class="trend-fill" d="${path}L406 155H34Z"/><path class="trend" d="${path}"/>${points.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4"><title>${days[i].label}: ${totals[i]} example check-ins</title></circle>`).join("")}` : ""}${days.map((d, i) => `<text x="${34 + i * 62}" y="183" text-anchor="middle">${d.label}</text>`).join("")}</svg><div class="chart-note">${total ? total + " recorded example check-ins" : "No example check-ins recorded"} · Last 7 days</div>`;
  }
  function heatmap() {
    const checks = getChecks();
    return `<div class="heatmap" role="img" aria-label="Example check-ins over the last 28 days">${Array.from(
      { length: 28 },
      (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (27 - i));
        const key =
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0");
        const n = checks.filter((c) => c.date === key).length;
        return `<span class="${n ? "recorded" : ""}" title="${key}: ${n} check-ins" aria-label="${key}: ${n} check-ins"></span>`;
      },
    ).join(
      "",
    )}</div><small>Last 28 days · Filled cells indicate recorded example activity.</small>`;
  }
  function overview() {
    const requests = upcoming(),
      checks = getChecks(),
      done = checks.filter((c) => c.date === C.today()).length;
    return `<div class="metrics">${[
      [
        "Upcoming requests",
        requests.length,
        "Awaiting clinic confirmation",
        "▦",
      ],
      [
        "Example plan completion",
        planEnabled() ? Math.round((done / 3) * 100) + "%" : "—",
        planEnabled()
          ? done + " of 3 example activities today"
          : "No clinical plan connected",
        "↗",
      ],
      ["Attended sessions", 0, "No clinic records connected", "≡"],
      ["Clinic receipts", 0, "No issued receipts available", "▤"],
    ]
      .map(
        ([t, n, s, ic]) =>
          `<div class="metric"><div class="metric-top"><span>${t}</span><i aria-hidden="true">${ic}</i></div><strong>${n}</strong><small>${s}</small></div>`,
      )
      .join(
        "",
      )}</div><div class="dashboard-grid"><div>${panel("Your next steps", requests.length ? appointmentRows(requests.slice(0, 2), true) : empty("▦", "Make room for your next step.", "Choose a preferred session. Every request stays pending until a connected clinic confirms it.", button("Request a Session", "book")), textLink("All requests", "appointments"))}${panel("Your activity, at a glance", activity(), '<span class="badge">Example check-ins</span>')}${panel("Exercise plans", planEnabled() ? `<span class="badge">Illustrative plan</span><h3>Example activity tracker</h3><p>Practice checking off example activities. No treatment is prescribed.</p><progress value="${done}" max="3" aria-label="Example activities completed today"></progress><p>${done} / 3 completed today</p>${button("Open Example Plan", "plans", true)}` : empty("↗", "Your plan starts with your clinician.", "No exercise plan is assigned. Explore a clearly marked example of the tracking interface.", button("View Plans", "plans", true)))}</div><div>${panel("Your calendar", `<div id="calendar-widget">${calendar()}</div>`)}${panel("Session history", empty("≡", "A clear record of your journey.", "No attended sessions are connected. Your local booking requests are available in history.", textLink("View history", "history")))}${panel("Payment receipts", empty("▤", "Your documents, together.", "No clinic-issued receipts. View a marked illustrative document to explore the interface.", textLink("Receipt center", "receipts")))}</div></div>`;
  }
  function appointments() {
    const rows = getAppointments().sort((a, b) =>
      (a.date + a.time).localeCompare(b.date + b.time),
    );
    return panel(
      "Your requests",
      `<div class="notice compact">Requests are stored in this browser only. No live availability, clinic confirmation or attendance records are connected.</div>${rows.length ? appointmentRows(rows, true) : empty("▦", "No requests yet.", "Choose a preferred date and time to create your first local request.", button("Request a Session", "book"))}`,
    );
  }
  function plans() {
    const checks = getChecks(),
      today = C.today();
    if (!planEnabled())
      return panel(
        "Assigned exercise plans",
        empty(
          "↗",
          "No assigned plan connected.",
          "Actual exercises and schedules must be supplied by your treating clinician. You can enable a clearly marked example to explore tracking.",
          '<button class="button" data-enable-plan>Explore Example Tracker ↗</button>',
        ),
      );
    return panel(
      "Example activity tracker",
      `<span class="badge">EXAMPLE ONLY · NOT A PRESCRIPTION</span><p>This interface demonstrates a clinician-provided plan. It contains no exercise instructions or recommended dose. Follow only your own clinician’s directions.</p><div class="record-row"><div><span class="data-label">Example enabled</span><b>${E(C.formatDate(C.read("examplePlanDate", today)))}</b></div><div><span class="data-label">Body area</span><b>Example / not clinically assigned</b></div><div><span class="data-label">Schedule</span><b>Not supplied</b></div></div><div class="plan-checks">${["Example activity A", "Example activity B", "Example activity C"].map((name, i) => `<label class="check"><input type="checkbox" data-check="${i}" ${checks.some((c) => c.date === today && c.activity === i) ? "checked" : ""}><span><b>${name}</b><small>Instructions and schedule to be provided by a clinician.</small></span></label>`).join("")}</div><progress value="${checks.filter((c) => c.date === today).length}" max="3" aria-label="Example activities completed today"></progress><p>${checks.filter((c) => c.date === today).length} of 3 example activities checked today. This measures completion, not recovery.</p><div class="button-row"><button class="button secondary" data-plan-history>Completion History ↗</button><button class="text-button" data-remove-plan>Remove example plan</button></div>`,
    );
  }
  function history() {
    const rows = getAppointments()
      .filter(
        (a) =>
          (!historyDate || a.date === historyDate) &&
          (!historyStatus || a.status === historyStatus),
      )
      .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    return panel(
      "Your chronological record",
      `<div class="filters"><label>Session/request date<input type="date" id="history-date" value="${E(historyDate)}"></label><label>Status<select id="history-status"><option value="">All statuses</option><option ${historyStatus === "Pending Confirmation" ? "selected" : ""}>Pending Confirmation</option><option ${historyStatus === "Cancelled" ? "selected" : ""}>Cancelled</option><option ${historyStatus === "Attended" ? "selected" : ""}>Attended</option></select></label><button class="button secondary" data-reset-history>Reset</button></div><div class="notice compact">No clinic-attended session records are connected. Local booking requests are shown below. Clinical notes and receipts cannot be fabricated.</div>${rows.length ? appointmentRows(rows, true) : empty("≡", "No records in this view.", "Your local requests will appear here. Adjust the filters or request a session.", button("Request a Session", "book", true))}`,
    );
  }
  function progress() {
    const checks = getChecks();
    return `<div class="metrics">${[
      ["Example check-ins", checks.length],
      ["Active check-in days", new Set(checks.map((c) => c.date)).size],
      ["Attended sessions", 0],
      ["Clinical recovery", "Not measured"],
    ]
      .map(
        ([t, n]) =>
          `<div class="metric"><span>${t}</span><strong style="${t === "Clinical recovery" ? "font-size:23px;padding-block:8px" : ""}">${n}</strong><small>${t.includes("Example") || t.includes("days") ? "Locally recorded example data" : "No clinical records connected"}</small></div>`,
      )
      .join(
        "",
      )}</div><div class="dashboard-grid"><div>${panel("Example activity completion", activity())}${panel("Activity consistency", heatmap())}</div><div>${panel("What these charts mean", "<p>These charts reflect only the example activity check-ins you record in this browser.</p><p>Completion counts and consistency do not indicate medical recovery, exercise suitability or readiness to return to sport.</p>" + button("Open Exercise Plans", "plans", true))}${panel("Session attendance", empty("≡", "No attendance data.", "A connected clinic must supply attended session records. Pending requests do not count as completed sessions."))}</div></div>`;
  }
  function receipts() {
    const show = receiptFilter !== "clinic";
    return panel(
      "Your documents",
      `<div class="filters"><label>Document type<select id="receipt-filter"><option value="all" ${receiptFilter === "all" ? "selected" : ""}>All documents</option><option value="clinic" ${receiptFilter === "clinic" ? "selected" : ""}>Clinic-issued only</option><option value="sample" ${receiptFilter === "sample" ? "selected" : ""}>Illustrative samples</option></select></label></div><div class="notice compact">No clinic-issued receipts or payment records are connected. The sample below demonstrates document actions and is not proof of payment.</div>${show ? `<div class="table-wrap"><table><thead><tr><th>Reference</th><th>Document</th><th>Amount</th><th>Status</th></tr></thead><tbody><tr><td>SAMPLE-001</td><td>Illustrative interface sample</td><td>Not applicable</td><td><span class="badge">Sample · not issued</span></td></tr></tbody></table></div><div class="button-row" style="margin-top:22px"><button class="button" data-receipt-view>View Sample ↗</button><button class="button secondary" data-receipt-download>Download Sample</button><button class="button secondary" data-receipt-print>Print Sample</button></div>` : empty("▤", "No clinic-issued receipts.", "A receipt appears here only when a verified clinic document is connected.")}`,
    );
  }
  function notifications() {
    const rows = getAppointments().sort((a, b) =>
        b.created.localeCompare(a.created),
      ),
      muted = C.read("notificationsRead", []),
      pref = C.read("notificationsEnabled", true);
    return panel(
      "Your local updates",
      `<p>${pref ? "Local request updates are shown here. Browser push and clinic messages are not connected." : "Reminders are disabled. Your request status log is still available."}</p>${rows.length ? rows.map((a) => `<div class="record-row"><div><b>${a.status === "Cancelled" ? "Local request cancelled" : "Local request saved"}</b><p>${E(C.services[a.service]?.title)} · ${E(C.formatDate(a.date))} at ${E(a.time)}</p><small>${a.status === "Cancelled" ? "Your request has been cancelled locally." : "Pending Confirmation. No message was sent to the clinic."}</small>${pref && a.status === "Pending Confirmation" && a.date === C.today() ? "<p><b>Today’s preference reminder — appointment not confirmed.</b></p>" : ""}</div>${muted.includes(a.id) ? '<span class="badge">Read</span>' : `<button class="button secondary" data-read="${E(a.id)}">Mark Read</button>`}</div>`).join("") : empty("◉", "You’re all caught up.", "Updates will be derived from your own local booking requests. No clinician messages are simulated.")}`,
    );
  }
  function profileView() {
    return panel(
      "Your local profile",
      `<div class="notice compact">Use example contact details. These contact fields stay in this tab session and are not stored in LocalStorage. No clinic profile is updated.</div><form class="form-grid" id="profile-form"><label>Name<input name="name" value="${E(profile.name)}" required maxlength="80" autocomplete="name"></label><label>Email<input type="email" name="email" value="${E(profile.email)}" autocomplete="email" maxlength="120"></label><label>Phone<input type="tel" name="phone" value="${E(profile.phone)}" autocomplete="tel" maxlength="24"></label><label>Contact preference<select name="contact"><option value="email" ${profile.contact === "email" ? "selected" : ""}>Email</option><option value="phone" ${profile.contact === "phone" ? "selected" : ""}>Phone</option><option value="none" ${profile.contact === "none" ? "selected" : ""}>No preference</option></select></label><label class="check full"><input type="checkbox" name="remember" ${C.read("displayName", "") ? "checked" : ""}> Remember only my display name in this browser</label><div class="full"><button type="submit" class="button">Save Profile Preview ↗</button></div></form>`,
    );
  }
  function settings() {
    return panel(
      "Make this space yours",
      `<div class="settings-row"><div><h3>Color theme</h3><p>Choose a lighter or darker workspace.</p></div><button class="button secondary theme-toggle">Toggle Theme</button></div><div class="settings-row"><div><h3>Reading direction</h3><p>Switch between LTR and RTL layouts.</p></div><button class="button secondary direction-toggle">${document.documentElement.dir === "rtl" ? "LTR" : "RTL"}</button></div><div class="settings-row"><div><h3>Local reminders</h3><p>Show reminders derived from saved request dates. No email or push notifications are sent.</p></div><label class="check"><input type="checkbox" id="notification-pref" ${C.read("notificationsEnabled", true) ? "checked" : ""}> Enabled</label></div><div class="settings-row"><div><h3>Export preview data</h3><p>Download non-sensitive requests, example check-ins and interface preferences.</p></div><button class="button secondary" data-export>Export Data ↗</button></div><div class="settings-row"><div><h3>Clear local preview data</h3><p>Remove this template’s requests, examples, profile and saved preferences from this browser.</p></div><button class="button secondary" data-clear>Clear Local Data</button></div><div class="notice compact">This static portal is a frontend prototype. Real patient records require a secure backend, authentication, access controls and clinic integrations.</div>`,
    );
  }
  function receiptHTML() {
    return `<div class="receipt-document"><span class="eyebrow">DOCUMENT INTERFACE PREVIEW</span><h2>ILLUSTRATIVE RECEIPT SAMPLE</h2><div class="receipt-watermark">SAMPLE — NOT PROOF OF PAYMENT</div><dl><dt>Reference</dt><dd>SAMPLE-001</dd><dt>Issuer</dt><dd>Not issued by a clinic</dd><dt>Session/package</dt><dd>Interface example only</dd><dt>Date</dt><dd>Not applicable</dd><dt>Amount</dt><dd>Not applicable</dd><dt>Payment status</dt><dd>No payment recorded</dd><dt>Transaction reference</dt><dd>None</dd></dl><p>This is a template demonstration. It does not establish a booking, attendance, payment or entitlement to care.</p></div>`;
  }
  function openReceipt(print = false) {
    C.modal(
      "Illustrative document",
      receiptHTML() +
        '<div class="button-row no-print"><button class="button" data-receipt-download>Download Sample</button><button class="button secondary" data-print-now>Print Sample</button></div>',
    );
    if (print) requestAnimationFrame(() => window.print());
  }
  function download(name, data, type = "application/json") {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function render() {
    const view = currentView();
    document.querySelectorAll("[data-view]").forEach((a) => {
      const active = a.dataset.view === view;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const greeting =
      view === "overview"
        ? `Hello, ${E((profile.name || "Guest").split(" ")[0])}.`
        : E(titles[view]);
    content.innerHTML =
      `<div class="dashboard-title"><div><span class="eyebrow">Patient space / ${E(titles[view])}</span><h1>${greeting}</h1><p>${view === "overview" ? "A little clarity for your next step. Your care, organized." : "Clear information for your next step."}</p></div>${view !== "book" ? button("Request a Session", "book") : ""}</div>` +
      {
        overview,
        appointments,
        plans,
        history,
        progress,
        receipts,
        notifications,
        profile: profileView,
        settings,
        book: () =>
          `<div class="notice compact">A preferred time is a request, not live availability. Use example contact details.</div><div class="form-panel">${window.CLINIC_BOOKING_FORM}</div>`,
      }[view]();
    if (view === "book") C.bindBooking();
    enhanceIcons();
    if (view === "settings") {
      document.querySelector(
        ".dashboard-header .direction-toggle",
      ).textContent = document.documentElement.dir === "rtl" ? "LTR" : "RTL";
    }
    bindForms();
  }
  function enhanceIcons() {
    const map = {
      overview: "overview",
      book: "plus",
      appointments: "calendar",
      plans: "plan",
      history: "history",
      progress: "move",
      receipts: "receipt",
      notifications: "bell",
      profile: "profile",
      settings: "settings",
    };
    document.querySelectorAll("[data-view]").forEach((a) => {
      a.querySelector("span").innerHTML = C.icon(map[a.dataset.view]);
    });
    document.querySelectorAll(".empty-icon").forEach((el) => {
      const glyph = el.textContent.trim();
      el.innerHTML = C.icon(
        {
          "▦": "calendar",
          "↗": "plan",
          "≡": "history",
          "▤": "receipt",
          "◉": "bell",
        }[glyph] || "move",
      );
    });
    document
      .querySelectorAll(".metric-top i")
      .forEach(
        (el, i) =>
          (el.innerHTML = C.icon(
            ["calendar", "plan", "history", "receipt"][i] || "move",
          )),
      );
    const bell = document.querySelector(
      '.dashboard-header a[aria-label="View notifications"]',
    );
    if (bell) bell.innerHTML = C.icon("bell");
  }
  function bindForms() {
    document.querySelector("#history-date")?.addEventListener("change", (e) => {
      historyDate = e.target.value;
      render();
    });
    document
      .querySelector("#history-status")
      ?.addEventListener("change", (e) => {
        historyStatus = e.target.value;
        render();
      });
    document
      .querySelector("#receipt-filter")
      ?.addEventListener("change", (e) => {
        receiptFilter = e.target.value;
        render();
      });
    document
      .querySelector("#notification-pref")
      ?.addEventListener("change", (e) => {
        C.write("notificationsEnabled", e.target.checked);
        C.toast("Local reminder preference saved.");
      });
    document.querySelectorAll("[data-check]").forEach((i) =>
      i.addEventListener("change", () => {
        const activity = Number(i.dataset.check),
          today = C.today();
        let checks = getChecks().filter(
          (c) => !(c.date === today && c.activity === activity),
        );
        if (i.checked) checks.push({ date: today, activity, example: true });
        C.write("checkins", checks);
        const target = Number(i.dataset.check);
        render();
        document.querySelector(`[data-check="${target}"]`)?.focus();
      }),
    );
    document.querySelector("#profile-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!e.target.reportValidity()) return;
      const f = e.target;
      profile = {
        name: f.elements.name.value.trim() || "Guest",
        email: f.elements.email.value,
        phone: f.elements.phone.value,
        contact: f.elements.contact.value,
      };
      try {
        sessionStorage.setItem("clinic.profile", JSON.stringify(profile));
      } catch {}
      C.write("displayName", f.elements.remember.checked ? profile.name : "");
      setProfile();
      C.toast("Local profile preview saved. No clinic record was changed.");
    });
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.hasAttribute("data-month")) {
      calendarMonth.setMonth(
        calendarMonth.getMonth() + Number(t.dataset.month),
      );
      const w = document.querySelector("#calendar-widget");
      if (w) w.innerHTML = calendar();
      return;
    }
    if (t.hasAttribute("data-enable-plan")) {
      C.write("examplePlan", true);
      C.write("examplePlanDate", C.today());
      render();
      C.toast("Example tracker enabled. This is not a treatment plan.");
    }
    if (t.hasAttribute("data-remove-plan")) {
      C.modal(
        "Remove example tracker?",
        '<p>This removes the example plan and its check-ins. No clinical records are affected.</p><button class="button" data-confirm-remove>Remove Example</button>',
      );
    }
    if (t.hasAttribute("data-confirm-remove")) {
      C.write("examplePlan", false);
      C.write("checkins", []);
      document.querySelector("#app-dialog").close();
      render();
    }
    if (t.hasAttribute("data-plan-history")) {
      const checks = getChecks().sort((a, b) => b.date.localeCompare(a.date));
      C.modal(
        "Example completion history",
        checks.length
          ? "<p>Example check-ins only. Not a measure of medical recovery.</p>" +
              checks
                .map(
                  (c) =>
                    `<div class="record-row"><b>${E(C.formatDate(c.date))}</b><span>Example activity ${String.fromCharCode(65 + c.activity)}</span></div>`,
                )
                .join("")
          : "<p>No example activities have been checked yet.</p>",
      );
    }
    if (t.hasAttribute("data-reset-history")) {
      historyDate = "";
      historyStatus = "";
      render();
    }
    if (t.dataset.detail) {
      const a = getAppointments().find((x) => x.id === t.dataset.detail);
      if (a)
        C.modal(
          "Local request details",
          `<span class="badge">${E(a.status)}</span><dl><dt>Service</dt><dd>${E(C.services[a.service]?.title)}</dd><dt>Preferred date</dt><dd>${E(C.formatDate(a.date))}</dd><dt>Preferred time</dt><dd>${E(a.time)}</dd><dt>Clinician</dt><dd>Not assigned</dd><dt>Session notes</dt><dd>No clinic notes connected</dd><dt>Related receipt</dt><dd>No issued receipt</dd></dl><p>Request only. No booking confirmation, attendance or payment is implied.</p>`,
        );
    }
    if (t.dataset.cancel) {
      C.modal(
        "Cancel this local request?",
        '<p>This updates the request in this browser only. No message is sent to a clinic.</p><button class="button" id="confirm-cancel">Cancel Local Request</button>',
      );
      document.querySelector("#confirm-cancel").onclick = () => {
        const rows = getAppointments();
        const a = rows.find((x) => x.id === t.dataset.cancel);
        if (a?.status === "Pending Confirmation") {
          a.status = "Cancelled";
          C.write("appointments", rows);
        }
        document.querySelector("#app-dialog").close();
        render();
        C.toast("Local request cancelled.");
      };
    }
    if (t.dataset.change) {
      const a = getAppointments().find((x) => x.id === t.dataset.change);
      if (!a || a.status !== "Pending Confirmation") return;
      C.modal(
        "Change your preferences",
        `<form id="change-form" class="form-grid"><label>Preferred date<input name="date" type="date" min="${C.today()}" value="${E(a.date)}" required></label><label>Preferred time<select name="time">${["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"].map((x) => `<option ${x === a.time ? "selected" : ""}>${x}</option>`).join("")}</select></label><p class="full">These are preferences only. The request remains Pending Confirmation.</p><button class="button full" type="submit">Save Changes ↗</button></form>`,
      );
      document.querySelector("#change-form").onsubmit = (ev) => {
        ev.preventDefault();
        const f = ev.target;
        if (!f.reportValidity() || f.elements.date.value < C.today()) return;
        const rows = getAppointments();
        const item = rows.find((x) => x.id === a.id);
        item.date = f.elements.date.value;
        item.time = f.elements.time.value;
        C.write("appointments", rows);
        document.querySelector("#app-dialog").close();
        render();
        C.toast("Local preferences updated. Request remains pending.");
      };
    }
    if (t.dataset.read) {
      C.write("notificationsRead", [
        ...new Set([...C.read("notificationsRead", []), t.dataset.read]),
      ]);
      render();
    }
    if (t.hasAttribute("data-receipt-view")) openReceipt();
    if (t.hasAttribute("data-receipt-print")) openReceipt(true);
    if (t.hasAttribute("data-print-now")) window.print();
    if (t.hasAttribute("data-receipt-download"))
      download(
        "ILLUSTRATIVE-SAMPLE-NOT-PAYMENT.html",
        `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>SAMPLE — NOT PROOF OF PAYMENT</title><style>body{font:16px/1.6 Arial;max-width:700px;margin:40px auto;padding:24px;color:#15171B}h2{font-size:28px}.receipt-watermark{font-size:24px;font-weight:bold;border:2px solid;padding:15px;margin:25px 0}dl{display:grid;grid-template-columns:1fr 1fr;gap:16px}dd{margin:0}</style></head><body>${receiptHTML()}</body></html>`,
        "text/html",
      );
    if (t.hasAttribute("data-export"))
      download(
        "clinic-local-preview.json",
        JSON.stringify(
          {
            description:
              "Local template data only; no clinical records or payment proof",
            appointments: getAppointments(),
            exampleCheckins: getChecks(),
            theme: C.read("theme", "light"),
            direction: C.read("direction", "ltr"),
          },
          null,
          2,
        ),
      );
    if (t.hasAttribute("data-clear"))
      C.modal(
        "Clear this template’s local data?",
        '<p>This deletes all saved requests, example check-ins, profile and preferences for this template in this browser. This action cannot be undone.</p><div class="button-row"><button class="button" data-confirm-clear>Delete Local Preview Data</button><button class="button secondary" data-close-dialog>Keep Data</button></div>',
      );
    if (t.hasAttribute("data-confirm-clear")) {
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith("clinic."))
          .forEach((k) => localStorage.removeItem(k));
        sessionStorage.removeItem("clinic.profile");
      } catch {}
      profile = { name: "Guest", email: "", phone: "" };
      historyDate = "";
      historyStatus = "";
      receiptFilter = "all";
      document.querySelector("#app-dialog").close();
      document.documentElement.dataset.theme = "light";
      document.documentElement.dir = "ltr";
      document
        .querySelectorAll(".direction-toggle")
        .forEach((b) => (b.textContent = "RTL"));
      setProfile();
      render();
      C.toast("Local preview data cleared.");
    }
  });
  document.querySelector("#logout").addEventListener("click", () => {
    try {
      sessionStorage.removeItem("clinic.profile");
    } catch {}
    C.write("displayName", "");
  });
  document.querySelectorAll("[data-view]").forEach((a) =>
    a.addEventListener("click", () => {
      if (document.querySelector(".dashboard-sidebar.drawer-open"))
        C.closeDrawer();
    }),
  );
  window.addEventListener("hashchange", () => {
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector("#main").focus({ preventScroll: true });
  });
  window.addEventListener("clinic-data", () => {
    if (currentView() !== "book") render();
  });
  window.addEventListener("storage", () => render());
  render();
})();
