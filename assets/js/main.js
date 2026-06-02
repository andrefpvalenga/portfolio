/* =============================================================================
   main.js — the engine (rendering + translation + modal)
   You normally DON'T need to edit this file.
   It reads I18N (from i18n.js) and PROJECTS (from projects.js) and builds the
   page. Translation loops over every [data-i18n] element, so a single missing
   text can never stop the rest of the page from translating.
============================================================================= */
(function () {
  "use strict";

  var LANGS = ["en", "pt", "es"];
  var STORAGE_KEY = "portfolio-lang";
  var DEFAULT_LANG = "en"; // primary language
  var currentLang = DEFAULT_LANG;
  var openProjectId = null;
  var lastFocused = null;

  /* --------------------------- small helpers ---------------------------- */

  // Resolve a dotted path like "hero.bio" inside an object. Returns "" if absent.
  function resolve(obj, path) {
    var cur = obj;
    var parts = String(path).split(".");
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return "";
      cur = cur[parts[i]];
    }
    return cur == null ? "" : cur;
  }

  // Translate a UI key for the current language (falls back to English).
  function t(path) {
    var val = resolve(I18N[currentLang], path);
    if (val === "" || val == null) val = resolve(I18N[DEFAULT_LANG], path);
    return val;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function clear(node) { if (node) node.innerHTML = ""; }

  // Build an <img> that degrades to a styled placeholder if the file is missing.
  function safeImg(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    img.addEventListener("error", function () {
      var ph = el("div", "img-placeholder", alt || "Image");
      ph.style.cssText =
        "display:grid;place-items:center;width:100%;height:100%;min-height:170px;" +
        "padding:20px;text-align:center;color:#9fb0c9;font-weight:600;" +
        "background:linear-gradient(135deg,#13233b,#1b3460);";
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    });
    return img;
  }

  /* ------------------------- static UI translation ---------------------- */

  function applyStaticI18n() {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var val = t(nodes[i].getAttribute("data-i18n"));
      if (typeof val === "string") nodes[i].textContent = val;
    }
    var titled = document.querySelectorAll("[data-i18n-title]");
    for (var j = 0; j < titled.length; j++) {
      var tv = t(titled[j].getAttribute("data-i18n-title"));
      if (typeof tv === "string") {
        titled[j].setAttribute("title", tv);
        titled[j].setAttribute("aria-label", tv);
      }
    }
  }

  /* --------------------------- dynamic sections ------------------------- */

  function renderStats() {
    var wrap = document.getElementById("stats-grid");
    if (!wrap) return;
    clear(wrap);
    var stats = (I18N[currentLang] && I18N[currentLang].stats) || [];
    stats.forEach(function (s) {
      var box = el("div", "stat");
      box.appendChild(el("div", "stat-value", s.value));
      box.appendChild(el("div", "stat-label", s.label));
      wrap.appendChild(box);
    });
  }

  function renderSkills() {
    var wrap = document.getElementById("skills-list");
    if (!wrap) return;
    clear(wrap);
    var skills = (I18N[currentLang] && I18N[currentLang].skills) || [];
    skills.forEach(function (label) { wrap.appendChild(el("li", null, label)); });
  }

  function renderHighlights() {
    var wrap = document.getElementById("about-highlights");
    if (!wrap) return;
    clear(wrap);
    var items = resolve(I18N[currentLang], "about.highlights") || [];
    items.forEach(function (it) {
      var li = el("li");
      li.appendChild(el("strong", null, it.h));
      li.appendChild(el("span", null, it.t));
      wrap.appendChild(li);
    });
  }

  function renderCerts() {
    var wrap = document.getElementById("about-certs");
    if (!wrap) return;
    clear(wrap);
    var items = resolve(I18N[currentLang], "about.certs") || [];
    items.forEach(function (c) { wrap.appendChild(el("li", null, c)); });
  }

  function renderProjects() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    clear(grid);
    PROJECTS.forEach(function (p) {
      var content = (p.i18n && (p.i18n[currentLang] || p.i18n[DEFAULT_LANG])) || {};

      var card = el("button", "project-card");
      card.type = "button";
      card.setAttribute("data-id", p.id);
      card.setAttribute("aria-label", content.title || p.id);

      var cover = el("div", "project-cover");
      cover.appendChild(safeImg(p.cover, content.title || p.id));
      card.appendChild(cover);

      var info = el("div", "project-info");
      info.appendChild(el("h3", null, content.title || p.id));
      info.appendChild(el("p", "project-summary", content.summary || ""));

      var tags = el("ul", "project-tags");
      (p.tags || []).forEach(function (tg) { tags.appendChild(el("li", null, tg)); });
      info.appendChild(tags);

      var cta = el("span", "project-cta");
      cta.appendChild(el("span", null, t("cardCta")));
      cta.appendChild(document.createTextNode(" →"));
      info.appendChild(cta);

      card.appendChild(info);
      card.addEventListener("click", function () { openModal(p.id); });
      grid.appendChild(card);
    });
  }

  /* -------------------------------- modal ------------------------------- */

  function fillModal(projectId) {
    var p = null;
    for (var i = 0; i < PROJECTS.length; i++) { if (PROJECTS[i].id === projectId) { p = PROJECTS[i]; break; } }
    if (!p) return;
    var c = (p.i18n && (p.i18n[currentLang] || p.i18n[DEFAULT_LANG])) || {};

    document.getElementById("modal-title").textContent = c.title || "";

    var tagsWrap = document.getElementById("modal-tags");
    clear(tagsWrap);
    (p.tags || []).forEach(function (tg) { tagsWrap.appendChild(el("li", null, tg)); });

    var gal = document.getElementById("modal-gallery");
    clear(gal);
    var images = (p.gallery && p.gallery.length) ? p.gallery : [p.cover];
    images.forEach(function (src) { gal.appendChild(safeImg(src, t("modal.gallery") + " — " + (c.title || ""))); });

    document.getElementById("modal-problem").textContent = c.problem || "";
    document.getElementById("modal-approach").textContent = c.approach || "";
    document.getElementById("modal-tools").textContent = c.tools || "";

    var res = document.getElementById("modal-results");
    clear(res);
    (c.results || []).forEach(function (r) { res.appendChild(el("li", null, r)); });

    var ins = document.getElementById("modal-insights");
    clear(ins);
    (c.insights || []).forEach(function (r) { ins.appendChild(el("li", null, r)); });

    var repo = document.getElementById("modal-repo");
    if (p.repo) { repo.href = p.repo; repo.hidden = false; }
    else { repo.hidden = true; }
  }

  function openModal(projectId) {
    openProjectId = projectId;
    lastFocused = document.activeElement;
    fillModal(projectId);
    var overlay = document.getElementById("project-modal");
    overlay.hidden = false;
    document.body.classList.add("modal-open");
    overlay.scrollTop = 0;
    var modalBox = overlay.querySelector(".modal");
    if (modalBox) modalBox.scrollTop = 0;
    document.getElementById("modal-close").focus();
  }

  function closeModal() {
    var overlay = document.getElementById("project-modal");
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
    openProjectId = null;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ------------------------------ language ------------------------------ */

  function setLanguage(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    var buttons = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle("is-active", buttons[i].getAttribute("data-lang") === lang);
    }

    applyStaticI18n();
    renderStats();
    renderSkills();
    renderHighlights();
    renderCerts();
    renderProjects();
    if (openProjectId) fillModal(openProjectId); // keep an open modal in sync
  }

  /* -------------------------------- init -------------------------------- */

  function init() {
    // Guard: if data files failed to load, fail loudly in console but don't crash the page.
    if (typeof I18N === "undefined" || typeof PROJECTS === "undefined") {
      console.error("[portfolio] i18n.js or projects.js did not load. Check the <script> tags in index.html.");
      return;
    }

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Language buttons
    var buttons = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () { setLanguage(this.getAttribute("data-lang")); });
    }

    // Modal close interactions
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("project-modal").addEventListener("click", function (e) {
      if (e.target === this) closeModal(); // click on the dark overlay
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && openProjectId) closeModal();
    });

    // Pick saved language, else default to English
    var saved = DEFAULT_LANG;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) {}
    setLanguage(saved);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
