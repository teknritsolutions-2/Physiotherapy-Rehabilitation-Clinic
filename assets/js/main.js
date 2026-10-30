/* Shared buildless UI and local-preview behavior. No authentication or clinical backend. */

"use strict";
// Indicative design rates. Update these values here, after clinic approval.
window.CLINIC_PRICING = {
  currency: "INR",
  assessment: 1200,
  followup: 900,
  fourSessionPack: 3400,
};

const Clinic = (window.Clinic = {});
Clinic.read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem("clinic." + key));
    return v === null ? fallback : v;
  } catch {
    return fallback;
  }
};
Clinic.write = (key, value) => {
  try {
    localStorage.setItem("clinic." + key, JSON.stringify(value));
    return true;
  } catch {
    Clinic.toast("Browser storage is unavailable. Changes could not be saved.");
    return false;
  }
};
Clinic.escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
Clinic.today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
Clinic.formatDate = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
Clinic.page = (name) =>
  (location.pathname.includes("/pages/") ? "" : "pages/") + name + ".html";
Clinic.packageLabel = (key) =>
  ({
    assessment: "Initial physiotherapy assessment",
    followup: "Follow-up therapy session",
    fourSessionPack: "Four-session rehabilitation pack",
    careplan: "Care plan review",
  })[key] || "Initial physiotherapy assessment";
Clinic.price = (key) =>
  typeof window.CLINIC_PRICING[key] === "number"
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: window.CLINIC_PRICING.currency,
        maximumFractionDigits: 0,
      }).format(window.CLINIC_PRICING[key])
    : "";
document.querySelectorAll("[data-price]").forEach((el) => {
  el.textContent = Clinic.price(el.dataset.price);
});
Clinic.icon = (name) => {
  const paths = {
    calendar:
      '<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4m8-4v4M4 11h16m-11 4h2m2 0h2"/>',
    plan: '<path d="M8 4H5v17h14V4h-3M9 3h6v4H9Zm-1 9 2 2 5-5m-7 9h8"/>',
    move: '<path d="M4 4v16h16M7 15l4-5 4 2 5-7M16 5h4v4"/>',
    overview:
      '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    history: '<path d="M4 8a9 9 0 1 1-1 7M3 3v6h6m3-2v6l4 2"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2ZM9 8h6m-6 4h6m-6 4h3"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3Zm4 12h4"/>',
    profile: '<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    settings:
      '<circle cx="12" cy="12" r="3"/><path d="m9 3 1-1h4l1 3 3 1 3 2-1 3 1 3-3 2-3 1-1 3h-4l-1-3-3-1-3-2 1-3-1-3 3-2 3-1Z"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
  };
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (paths[name] || paths.move) +
    "</svg>"
  );
};
Clinic.services = {
  sports: {
    title: "Sports injury rehabilitation",
    subtitle: "A considered path back to the activities you enjoy.",
    image: "service-sports",
    imageAlt:
      "Close view of hands supporting a patient’s knee during physical therapy",
    description:
      "Movement assessment, strength and mobility work, and a guided return to the activities that matter to you.",
    benefit:
      "People seeking support with movement after an activity-related setback, or a structured conversation about returning to sport.",
  },
  surgery: {
    title: "Post-surgery rehabilitation",
    subtitle: "Supported movement for the next chapter of your recovery.",
    image: "service-recovery",
    imageAlt:
      "Practitioner guiding a seated patient through a supported leg stretch",
    description:
      "Following clinical clearance, work towards appropriate range of motion and progressively guided activity with an individualized plan.",
    benefit:
      "People who have received appropriate clinical clearance after surgery and would like to discuss a rehabilitation plan with a physiotherapist.",
  },
  back: {
    title: "Back pain physiotherapy",
    subtitle: "Care that considers the way you live, work and move.",
    image: "service-back",
    imageAlt: "Practitioner observing a patient’s forward-bending movement",
    description:
      "Explore your movement, discuss activity goals and learn about mobility, strength and posture with your physiotherapist.",
    benefit:
      "People who would like to discuss how back concerns affect everyday activities, and explore appropriate assessment and movement support.",
  },
  movement: {
    title: "Movement assessment",
    subtitle: "A clearer understanding of your starting point.",
    image: "guided-mobility",
  },
};
Clinic.toast = (message) => {
  const t = document.querySelector("#toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("visible");
  clearTimeout(Clinic.toastTimer);
  Clinic.toastTimer = setTimeout(() => t.classList.remove("visible"), 4500);
};
Clinic.modal = (title, html) => {
  const d = document.querySelector("#app-dialog");
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#dialog-body").innerHTML = html;
  if (!d.open) d.showModal();
  return d;
};
Clinic.theme = (value) => {
  document.documentElement.dataset.theme = value;
  Clinic.write("theme", value);
  document.querySelectorAll(".theme-toggle").forEach((b) => {
    b.setAttribute(
      "aria-label",
      value === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
    b.setAttribute("aria-pressed", value === "dark");
    if (b.classList.contains("icon-button"))
      b.innerHTML =
        value === "dark"
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.5 14.2A9 9 0 0 1 9.8 3.5a9 9 0 1 0 10.7 10.7Z"/></svg>';
  });
};
Clinic.direction = (value) => {
  document.documentElement.dir = value;
  Clinic.write("direction", value);
  document.querySelectorAll(".direction-toggle").forEach((b) => {
    b.textContent = value === "rtl" ? "LTR" : "RTL";
    b.setAttribute(
      "aria-label",
      value === "rtl" ? "Switch to left-to-right" : "Switch to right-to-left",
    );
  });
};
Clinic.theme(Clinic.read("theme", "light"));
Clinic.direction(Clinic.read("direction", "ltr"));
document.addEventListener("click", (e) => {
  if (e.target.closest(".theme-toggle"))
    Clinic.theme(
      document.documentElement.dataset.theme === "dark" ? "light" : "dark",
    );
  if (e.target.closest(".direction-toggle"))
    Clinic.direction(document.documentElement.dir === "rtl" ? "ltr" : "rtl");
  if (e.target.closest("[data-close-dialog]"))
    document.querySelector("#app-dialog").close();
});
const dialog = document.querySelector("#app-dialog");
dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
document
  .querySelector(".year")
  ?.replaceChildren(String(new Date().getFullYear()));
/* Hover, click and keyboard accessible home menu. */
document.querySelectorAll(".dropdown").forEach((drop) => {
  const toggle = drop.querySelector("button");
  const set = (open) => {
    drop.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  };
  drop.addEventListener("mouseenter", () => {
    if (matchMedia("(min-width:1100px)").matches) set(true);
  });
  drop.addEventListener("mouseleave", () => {
    if (!drop.contains(document.activeElement)) set(false);
  });
  toggle.addEventListener("click", () => set(!drop.classList.contains("open")));
  drop.addEventListener("focusin", (e) => {
    if (e.target !== toggle) set(true);
  });
  drop.addEventListener("focusout", (e) => {
    if (!drop.contains(e.relatedTarget)) set(false);
  });
  drop.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      set(false);
      toggle.focus();
      e.stopPropagation();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      set(true);
      drop.querySelector("a").focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!drop.contains(e.target)) set(false);
  });
});
/* Shared drawer traps focus, preserves scroll and honors RTL through CSS. */
const menuButton = document.querySelector(".menu-toggle");
const drawer =
  document.querySelector(".navigation") ||
  document.querySelector(".dashboard-sidebar");
const scrim = document.querySelector(".scrim");
const isDashboardDrawer = drawer?.classList.contains("dashboard-sidebar");
const syncDrawerAccess = () => {
  if (isDashboardDrawer)
    drawer.inert =
      innerWidth < 1100 && !drawer.classList.contains("drawer-open");
};
syncDrawerAccess();
let oldFocus;
Clinic.closeDrawer = () => {
  if (!drawer) return;
  drawer.classList.remove("drawer-open");
  syncDrawerAccess();
  if (scrim) scrim.hidden = true;
  document.body.style.overflow = "";
  menuButton?.setAttribute("aria-expanded", "false");
  drawer.removeAttribute("role");
  drawer.removeAttribute("aria-modal");
  oldFocus?.focus();
  oldFocus = null;
};
menuButton?.addEventListener("click", () => {
  oldFocus = document.activeElement;
  drawer.classList.add("drawer-open");
  syncDrawerAccess();
  drawer.setAttribute("role", "dialog");
  drawer.setAttribute("aria-modal", "true");
  drawer.setAttribute("aria-label", "Navigation");
  scrim.hidden = false;
  document.body.style.overflow = "hidden";
  menuButton.setAttribute("aria-expanded", "true");
  drawer.querySelector(".drawer-close")?.focus();
});
drawer
  ?.querySelector(".drawer-close")
  ?.addEventListener("click", Clinic.closeDrawer);
scrim?.addEventListener("click", Clinic.closeDrawer);
document.addEventListener("keydown", (e) => {
  if (!drawer?.classList.contains("drawer-open")) return;
  if (e.key === "Escape") {
    Clinic.closeDrawer();
    return;
  }
  if (e.key === "Tab") {
    const items = [...drawer.querySelectorAll("a,button,input")].filter(
      (x) => x.offsetParent !== null && !x.disabled,
    );
    const first = items[0],
      last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
window.addEventListener("resize", () => {
  if (drawer?.classList.contains("drawer-open") && innerWidth >= 1100)
    Clinic.closeDrawer();
  syncDrawerAccess();
});

const topButton = document.querySelector(".back-top");
window.addEventListener(
  "scroll",
  () =>
    topButton?.classList.toggle(
      "visible",
      scrollY > 500 && !Clinic.footerControlVisible,
    ),
  { passive: true },
);
topButton?.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
      ? "instant"
      : "smooth",
  }),
);
document
  .querySelectorAll("[data-privacy]")
  .forEach((b) =>
    b.addEventListener("click", () =>
      Clinic.modal(
        "Privacy & your information",
        "<p>This website currently offers browser-based session requests and patient tools. A clinic, authentication provider and payment service are not connected. Non-sensitive booking preferences, optional example check-ins and settings are stored in this browser only.</p><p>Booking contact fields and notes are not stored. Passwords are never saved or verified. Do not enter sensitive medical or payment information. Profile contact fields are held in this tab session only, unless you choose to remember a display name.</p><p>Use Patient Portal → Settings to clear local preview data. Local storage is not suitable for real clinical or payment records.</p>",
      ),
    ),
  );
const areaCopy = {
  Knee: [
    "FIND YOUR RANGE",
    "Discuss comfortable movement, strength and everyday activities with a physiotherapist. An assessment helps establish your next steps.",
    "sports",
  ],
  Back: [
    "MOVE THROUGH YOUR DAY",
    "Explore a conversation about daily activities, mobility, strength and posture-related education. Your clinician can assess what is appropriate for you.",
    "back",
  ],
  Shoulder: [
    "REACH YOUR NEXT STEP",
    "Discuss reaching, lifting and activity goals. A clinician can explore your movement and explain appropriate care options.",
    "sports",
  ],
  Hip: [
    "BUILD YOUR EVERYDAY",
    "Explore support for comfortable everyday activity, joint movement and strength through an individual assessment.",
    "movement",
  ],
  Ankle: [
    "FIND YOUR FOOTING",
    "Discuss walking, balance and return-to-activity goals. Care begins with understanding your individual movement.",
    "sports",
  ],
};
document.querySelectorAll("[data-area]").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-area]").forEach((x) => {
      x.classList.remove("selected");
      x.setAttribute("aria-pressed", "false");
    });
    b.classList.add("selected");
    b.setAttribute("aria-pressed", "true");
    const a = b.dataset.area,
      c = areaCopy[a];
    document.querySelector("#area-title").textContent =
      a + " care & everyday movement";
    document.querySelector("#area-copy").textContent = c[1];
    document.querySelector("#area-link").href =
      Clinic.page("service-details") + "?service=" + c[2] + "&area=" + a;
    document.querySelector("#area-link").innerHTML =
      "Explore " +
      a.toLowerCase() +
      ' care <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>';
    const areaImage = document.querySelector(".area-image img");
    if (areaImage) {
      const imageMap = {
        Knee: "knee-care",
        Back: "area-back",
        Shoulder: "joint",
        Hip: "area-hip",
        Ankle: "ankle-care",
      };
      areaImage.src =
        (location.pathname.includes("/pages/") ? "../" : "") +
        "assets/images/" +
        imageMap[a] +
        ".jpg";
      areaImage.alt = a + " physiotherapy context";
    }
  }),
);
const params = new URLSearchParams(location.search);
if (document.querySelector("#service-title")) {
  const s = Clinic.services[params.get("service")] || Clinic.services.sports;
  document.querySelector("#service-title").textContent = s.title;
  document.querySelector("#service-subtitle").textContent =
    s.subtitle || "Understand your movement. Discuss your next steps.";
  document.querySelector("#service-description").textContent =
    s.description ||
    "A conversation about your daily activities, movement and individual goals.";
  document.querySelector("#service-benefit").textContent =
    s.benefit ||
    "People who would like to understand their movement and discuss appropriate support.";
  document.querySelector("#service-image").src =
    "../assets/images/" + (s.image || "joint") + ".jpg";
  document.querySelector("#service-image").alt =
    s.imageAlt || s.title + " — illustrative guided care";
  document
    .querySelectorAll('a[href="booking.html"]')
    .forEach(
      (a) =>
        (a.href =
          "booking.html?service=" + (params.get("service") || "sports")),
    );
  document.title = s.title + " | Kinerelle — Physiotherapy & Rehabilitation";
}
const articles = {
  assessment: {
    title: "Preparing for your first physiotherapy assessment",
    sub: "A little preparation can make room for a better conversation.",
    image: "article-assessment",
    imageAlt: "Healthcare professional reviewing a clipboard and writing notes",
    sections: [
      [
        "Start with what matters to you",
        "Think about the activities you would like to discuss. These might be work, everyday routines or returning to a sport. A clear goal can help shape your conversation.",
      ],
      [
        "Bring your questions",
        "Ask what the assessment involves, how consent works and what happens after the appointment. You can ask for clarification at any stage.",
      ],
      [
        "Check the practical details",
        "Ask the clinic what to wear and whether a referral or clearance document is needed. Share relevant information with your clinician through an appropriate clinical channel.",
      ],
    ],
  },
  process: {
    title: "Understanding the rehabilitation process",
    sub: "Why individual goals and regular review matter.",
    image: "article-process",
    imageAlt:
      "Patient and healthcare professional discussing next steps in a consultation room",
    sections: [
      [
        "A plan starts with a person",
        "An assessment creates space to discuss concerns and goals. A plan should take account of individual circumstances rather than rely on a standard timeline.",
      ],
      [
        "Review is part of the process",
        "Rehabilitation plans may change as your clinician reviews activity, feedback and goals. Ask what you should record and how to discuss concerns.",
      ],
      [
        "Keep the conversation open",
        "Understanding the purpose of a plan can make the next steps clearer. If something is unclear, ask your treating clinician before making changes.",
      ],
    ],
  },
  activity: {
    title: "Returning to activity, one step at a time",
    sub: "Make your goals part of the conversation.",
    image: "article-activity",
    imageAlt: "Practitioner guiding an arm exercise with a resistance band",
    sections: [
      [
        "Define your activity goal",
        "Every activity has different demands. Describe what you hope to return to and why it matters to you.",
      ],
      [
        "Agree on a pathway",
        "Your treating clinician can discuss appropriate stages and any clearance requirements. A checkbox or dashboard score does not establish medical readiness.",
      ],
      [
        "Review together",
        "Keep your clinician informed about your experience and ask when to review your plan. This article does not set an individual return-to-activity schedule.",
      ],
    ],
  },
  habits: {
    title: "Building consistent movement habits",
    sub: "Create space for your clinician-provided plan.",
    image: "article-habits",
    imageAlt: "Older adult practising a stretching routine at home",
    sections: [
      [
        "Make the plan clear",
        "Before starting assigned activities, ask your clinician to explain the instructions, schedule and any precautions.",
      ],
      [
        "Keep a simple record",
        "A check-in can help you remember what you completed and what to discuss. Activity completion measures consistency, not clinical recovery.",
      ],
      [
        "Adjust with guidance",
        "If a plan is difficult to fit into your routine, discuss it with your clinician. Avoid substituting or changing prescribed activity based on general online information.",
      ],
    ],
  },
};
if (document.querySelector("#article-title")) {
  const a = articles[params.get("article")] || articles.assessment;
  document.querySelector("#article-title").textContent = a.title;
  document.querySelector("#article-subtitle").textContent = a.sub;
  document.querySelector("#article-image").src =
    "../assets/images/" + a.image + ".jpg";
  document.querySelector("#article-image").alt =
    a.imageAlt || a.title + " — illustrative movement context";
  document.querySelector("#article-body").innerHTML = a.sections
    .map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`)
    .join("");
  document.title = a.title + " | Kinerelle Movement Journal";
}
/* Booking requests persist only non-sensitive scheduling preferences. */
Clinic.bindBooking = () => {
  const form = document.querySelector("#booking-form");
  if (!form) return;
  form.elements.date.min = Clinic.today();
  ["service", "preference", "package", "date", "time"].forEach((k) => {
    if (
      params.has(k) &&
      [...(form.elements[k].options || [])].some(
        (o) => o.value === params.get(k),
      )
    )
      form.elements[k].value = params.get(k);
  });
  const update = () => {
    const summary = document.querySelector("#live-summary");
    if (!summary) return;
    const data = new FormData(form);
    summary.innerHTML = `<p><b>${Clinic.escape(Clinic.services[data.get("service")]?.title || "Choose your service")}</b></p><p>${data.get("date") ? Clinic.escape(Clinic.formatDate(data.get("date"))) : "Date to be selected"} · ${Clinic.escape(data.get("time") || "Time preference")}</p><p>${Clinic.escape(form.elements.package.selectedOptions[0].textContent)}</p><span class="badge">Subject to confirmation</span><p class="indicative-price">Indicative: <b>${Clinic.escape(Clinic.price(data.get("package")))}</b>${data.get("package") === "fourSessionPack" ? " / package" : " / session"}</p>`;
  };
  form.addEventListener("input", update);
  update();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.date < Clinic.today()) {
      form.elements.date.setCustomValidity("Choose today or a future date.");
      form.elements.date.reportValidity();
      return;
    }
    form.elements.date.setCustomValidity("");
    const d = Clinic.modal(
      "Review your request",
      `<span class="badge">Pending Confirmation</span><dl><dt>Service</dt><dd>${Clinic.escape(Clinic.services[data.service]?.title)}</dd><dt>Preferred date</dt><dd>${Clinic.escape(Clinic.formatDate(data.date))}</dd><dt>Preferred time</dt><dd>${Clinic.escape(data.time)}</dd><dt>Session type</dt><dd>${Clinic.escape(form.elements.package.selectedOptions[0].textContent)}</dd><dt>Indicative rate</dt><dd>${Clinic.escape(Clinic.price(data.package))}${data.package === "fourSessionPack" ? " / package" : " / session"}</dd><dt>Care preference</dt><dd>${Clinic.escape(form.elements.preference.selectedOptions[0].textContent)}</dd></dl><div class="notice">This request stays in your browser and is not sent to a clinic. No appointment or payment is confirmed. Contact details and notes are not saved.</div><div class="button-row"><button class="button" id="save-request">Save Local Request ↗</button><button class="button secondary" data-close-dialog>Keep Editing</button></div>`,
    );
    document.querySelector("#save-request").addEventListener(
      "click",
      () => {
        const records = Clinic.read("appointments", []);
        const record = {
          id: crypto.randomUUID(),
          service: data.service,
          date: data.date,
          time: data.time,
          package: data.package,
          preference: data.preference,
          status: "Pending Confirmation",
          created: new Date().toISOString(),
        };
        if (!Clinic.write("appointments", [...records, record])) return;
        d.close();
        form.reset();
        Clinic.modal(
          "Your local request is saved",
          `<p>Your preference for ${Clinic.escape(Clinic.formatDate(data.date))} at ${Clinic.escape(data.time)} is saved as <b>Pending Confirmation</b>.</p><p>No request has been sent to a clinic. You can change or cancel it in your local patient portal.</p><div class="button-row"><a class="button" href="${Clinic.page("dashboard")}#appointments">Manage Requests ↗</a><button class="button secondary" data-close-dialog>Close</button></div>`,
        );
        window.dispatchEvent(new Event("clinic-data"));
      },
      { once: true },
    );
  });
  form.elements.date.addEventListener("input", () =>
    form.elements.date.setCustomValidity(""),
  );
};
Clinic.bindBooking();
document.querySelectorAll(".password-toggle").forEach((b) =>
  b.addEventListener("click", () => {
    const input = b.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    b.setAttribute(
      "aria-label",
      input.type === "password" ? "Show password" : "Hide password",
    );
    b.setAttribute("aria-pressed", input.type === "text");
  }),
);
document
  .querySelector("#forgot-password")
  ?.addEventListener("click", () =>
    Clinic.modal(
      "Password reset unavailable",
      "<p>Password reset is currently unavailable. Please contact the clinic for help accessing your account.</p>",
    ),
  );
document.querySelector("#auth-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  if (
    f.dataset.signup === "true" &&
    f.elements.password.value !== f.elements.confirm.value
  ) {
    f.elements.confirm.setCustomValidity("Passwords must match.");
    f.elements.confirm.reportValidity();
    return;
  }
  if (!f.reportValidity()) return;
  f.querySelector("#auth-status").textContent =
    f.dataset.signup === "true"
      ? "Account registration is currently unavailable. Please try again later."
      : "Sign-in is currently unavailable. Please try again later.";
});
document.querySelectorAll("[data-auth-provider]").forEach((button) =>
  button.addEventListener("click", () => {
    const provider = button.dataset.authProvider;
    Clinic.modal(
      `${provider} sign-in unavailable`,
      `<p>${provider} sign-in is currently unavailable. Please try again later.</p>`,
    );
  }),
);
document
  .querySelectorAll('#auth-form [name="password"], #auth-form [name="confirm"]')
  .forEach((input) =>
    input.addEventListener("input", () => {
      document
        .querySelector('#auth-form [name="confirm"]')
        ?.setCustomValidity("");
    }),
  );
document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  const enquiry = [
    "Enquiry: " + data.topic,
    "Name: " + data.name,
    "Email: " + data.email,
    "Phone: " + (data.phone || "Not supplied"),
    "",
    "Message:",
    data.message,
  ].join("\n");
  Clinic.modal(
    "Review your enquiry",
    '<p>No message has been sent. Copy your enquiry and share it through your clinic’s usual contact channel.</p><label>Your enquiry<textarea id="enquiry-copy" readonly rows="9"></textarea></label><div class="button-row"><button class="button" id="copy-enquiry">Copy Enquiry</button><button class="button secondary" data-close-dialog>Keep Editing</button></div><p id="enquiry-copy-status" role="status"></p>',
  );
  document.querySelector("#enquiry-copy").value = enquiry;
  document
    .querySelector("#copy-enquiry")
    .addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(enquiry);
        document.querySelector("#enquiry-copy-status").textContent =
          "Copied. No message was sent.";
        document.querySelector("#contact-result").textContent =
          "Your enquiry is ready to share. No message has been sent.";
      } catch {
        document.querySelector("#enquiry-copy").select();
        document.querySelector("#enquiry-copy-status").textContent =
          "Select and copy the text above to share it. No message was sent.";
      }
    });
});
// Escape also dismisses a pointer-opened menu when keyboard focus is elsewhere.
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".dropdown.open").forEach((drop) => {
    drop.classList.remove("open");
    drop.querySelector("button").setAttribute("aria-expanded", "false");
  });
});

// Footer utility controls remain available even before the floating button appears.
document.querySelector(".footer-top-button")?.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
      ? "instant"
      : "smooth",
  }),
);
document
  .querySelectorAll("[data-terms]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      Clinic.modal(
        "Using this website",
        "<p>Information on this website is general and is not an individual treatment recommendation. Discuss your care with an appropriate clinician.</p><p>Session requests are preferences saved in this browser. They do not establish a confirmed appointment, payment or clinical relationship. Indicative prices require clinic approval.</p><p>Patient tools require connected clinical services before they can hold real patient records. Use the browser tools only for non-sensitive information.</p>",
      ),
    ),
  );

// Avoid two Back-to-Top controls occupying the same corner near the footer.
const footerTopControl = document.querySelector(".footer-top-button");
if (topButton && footerTopControl && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    Clinic.footerControlVisible = entry.isIntersecting;
    topButton.classList.toggle(
      "visible",
      scrollY > 500 && !entry.isIntersecting,
    );
  }).observe(footerTopControl);
}

// Smooth gradient artwork. Move the complete vector with a compositor transform.
// No per-pixel texture or mesh rendering; reduced-motion and no-JS views stay still.
document.querySelectorAll("[data-care-ribbon]").forEach((host) => {
  if (!("IntersectionObserver" in window)) return;
  const image = host.querySelector("img");
  const section = host.closest("section") || host.closest("main") || host;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false,
    frame = 0,
    previous = 0,
    elapsed = 0,
    progress = null;
  const animate = (now) => {
    frame = 0;
    if (!visible || document.hidden || reduced.matches) return;
    const dt = Math.max(0, Math.min((now - previous) / 1000, 0.05));
    previous = now;
    elapsed += dt;
    const rect = section.getBoundingClientRect();
    const target = Math.max(
      0,
      Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)),
    );
    progress =
      progress === null
        ? target
        : progress + (target - progress) * (1 - Math.exp(-dt * 3));
    const turn = Math.sin(elapsed * 0.16) * 1.8 + (progress - 0.5) * 2.0;
    const lift = Math.sin(elapsed * 0.2) * 7;
    image.style.transform = `translate3d(0, ${lift.toFixed(3)}px, 0) rotate(${turn.toFixed(4)}deg) scale(1.06)`;
    frame = requestAnimationFrame(animate);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    image.style.willChange = visible && !reduced.matches ? "transform" : "auto";
    if (reduced.matches) image.style.removeProperty("transform");
    if (!visible || document.hidden || reduced.matches) return;
    previous = performance.now();
    frame = requestAnimationFrame(animate);
  };
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { rootMargin: "80px" },
  ).observe(host);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
});
