/* =============================================================================
   main.js — portfolio rendering and interaction engine
   -----------------------------------------------------------------------------
   André never needs to edit this file. Project text and images belong in the
   folders explained by content/LEIA-ME.md. Everything here runs directly on
   GitHub Pages, without an extra publishing system.
============================================================================= */

(function () {
  "use strict";

  var DEFAULT_LANG = "en";
  var LANGS = ["en", "pt", "es"];
  var STORAGE_KEY = "portfolio-lang";

  // Four four-second image slots create one subtle 16-second project cycle.
  var IMAGE_SLOT_MS = 4000;
  var SLOTS_PER_PROJECT = 4;
  var PROJECT_CYCLE_MS = IMAGE_SLOT_MS * SLOTS_PER_PROJECT;

  var currentLang = DEFAULT_LANG;
  var menuOpen = false;
  var revealObserver = null;
  var projectVisibilityObserver = null;
  var visibilityPauseBound = false;
  var projects = [];
  var contentIsLoading = true;

  var player = {
    projectIndex: 0,
    imageIndex: 0,
    baseImageIndex: 0,
    galleryLength: 1,
    elapsed: 0,
    startedAt: 0,
    frame: 0,
    pauseReasons: new Set(),
    dom: {},
  };

  /* ------------------------------ helpers ------------------------------ */

  function resolve(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : undefined;
    }, obj);
  }

  function t(path) {
    var value = resolve(I18N[currentLang] || {}, path);
    if (value === undefined) value = resolve(I18N[DEFAULT_LANG] || {}, path);
    return value;
  }

  function format(template, values) {
    return String(template || "").replace(/\{(\w+)\}/g, function (_, key) {
      return values[key] == null ? "" : values[key];
    });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function clear(node) {
    if (node) node.replaceChildren();
  }

  function padNumber(value) {
    return String(value).padStart(2, "0");
  }

  function wrapIndex(index, length) {
    return length ? (index % length + length) % length : 0;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // If an owner mistypes an image path, keep the layout useful and explain it.
  function safeImg(src, alt, eager) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = eager ? "eager" : "lazy";
    img.decoding = "async";
    img.addEventListener("error", function () {
      var placeholder = el("div", "img-placeholder", alt || t("project.image"));
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute("aria-label", alt || t("project.image"));
      if (img.parentNode) img.parentNode.replaceChild(placeholder, img);
    });
    return img;
  }

  function projectContent(project) {
    return (project.i18n && (project.i18n[currentLang] || project.i18n[DEFAULT_LANG])) || {};
  }

  /* ------------------------- static translation ------------------------ */

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var value = t(node.getAttribute("data-i18n"));
      if (typeof value === "string") node.textContent = value;
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (node) {
      var value = t(node.getAttribute("data-i18n-aria-label"));
      if (typeof value === "string") node.setAttribute("aria-label", value);
    });
  }

  /* -------------------------- simple sections -------------------------- */

  function renderStats() {
    var wrap = document.getElementById("stats-grid");
    if (!wrap) return;
    clear(wrap);

    ((I18N[currentLang] && I18N[currentLang].stats) || I18N[DEFAULT_LANG].stats || []).forEach(function (stat) {
      var item = el("div", "stat");
      item.appendChild(el("strong", "stat-value", stat.value));
      item.appendChild(el("span", "stat-label", stat.label));
      wrap.appendChild(item);
    });
  }

  function renderSkills() {
    var wrap = document.getElementById("skills-list");
    if (!wrap) return;
    clear(wrap);

    ((I18N[currentLang] && I18N[currentLang].skills) || I18N[DEFAULT_LANG].skills || []).forEach(function (label, index) {
      var item = el("li", "skill-row");
      item.appendChild(el("span", "skill-index", padNumber(index + 1)));
      item.appendChild(el("span", "skill-name", label));
      wrap.appendChild(item);
    });
  }

  function renderHighlights() {
    var wrap = document.getElementById("about-highlights");
    if (!wrap) return;
    clear(wrap);

    (resolve(I18N[currentLang], "about.highlights") || resolve(I18N[DEFAULT_LANG], "about.highlights") || []).forEach(function (item) {
      var row = el("li", "highlight-row");
      row.appendChild(el("strong", null, item.h));
      row.appendChild(el("span", null, item.t));
      wrap.appendChild(row);
    });
  }

  function renderCerts() {
    var wrap = document.getElementById("about-certs");
    if (!wrap) return;
    clear(wrap);

    (resolve(I18N[currentLang], "about.certs") || resolve(I18N[DEFAULT_LANG], "about.certs") || []).forEach(function (label) {
      wrap.appendChild(el("li", null, label));
    });
  }

  /* ------------------------- reveal enhancement ------------------------- */

  function observeReveal(node) {
    if (!node) return;
    if (!revealObserver || prefersReducedMotion()) {
      node.classList.add("is-visible");
      return;
    }
    revealObserver.observe(node);
  }

  function initRevealObserver() {
    document.documentElement.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      document.querySelectorAll("[data-reveal]").forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6%", threshold: 0.04 });

    document.querySelectorAll("[data-reveal]").forEach(observeReveal);
  }

  /* -------------------------- project gallery --------------------------- */

  // A path string is enough for a gallery item; the richer object form adds
  // localized captions and alt text without changing this rendering engine.
  function normalizeGalleryItem(item, content, index, total) {
    var objectItem = typeof item === "object" && item !== null ? item : null;
    var localized = objectItem && objectItem.i18n
      ? (objectItem.i18n[currentLang] || objectItem.i18n[DEFAULT_LANG] || {})
      : {};
    var src = objectItem ? objectItem.src : item;

    return {
      src: src,
      alt: localized.alt || (objectItem && objectItem.alt) || t("project.image") + " " + (index + 1) + " — " + content.title,
      caption: localized.caption || (objectItem && objectItem.caption) || format(t("project.imageOf"), { current: index + 1, total: total }),
    };
  }

  function updateGallery() {
    var dom = player.dom;
    if (!dom.track) return;

    dom.track.style.transform = "translate3d(-" + (player.imageIndex * 100) + "%, 0, 0)";
    if (dom.counter) dom.counter.textContent = padNumber(player.imageIndex + 1) + " / " + padNumber(player.galleryLength);

    (dom.slides || []).forEach(function (slide, index) {
      slide.setAttribute("aria-hidden", String(index !== player.imageIndex));
    });
    (dom.dots || []).forEach(function (dot, index) {
      var active = index === player.imageIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function resetProjectClock() {
    if (player.frame) cancelAnimationFrame(player.frame);
    player.frame = 0;
    player.elapsed = 0;
    player.startedAt = performance.now();
    player.baseImageIndex = player.imageIndex;
    if (player.dom.progress) player.dom.progress.style.transform = "scaleX(1)";
    if (player.dom.progressTrack) player.dom.progressTrack.setAttribute("aria-valuenow", "16");

    if (!prefersReducedMotion() && projects.length > 1 && player.pauseReasons.size === 0) {
      player.frame = requestAnimationFrame(autoplayTick);
    }
  }

  function goToImage(index, manual) {
    player.imageIndex = wrapIndex(index, player.galleryLength);
    updateGallery();
    if (manual) resetProjectClock();
  }

  function createCarousel(project, content) {
    var rawItems = project.gallery && project.gallery.length ? project.gallery : [project.cover];
    var items = rawItems.map(function (item, index) {
      return normalizeGalleryItem(item, content, index, rawItems.length);
    });

    player.galleryLength = Math.max(1, items.length);
    player.imageIndex = wrapIndex(player.imageIndex, player.galleryLength);
    player.baseImageIndex = player.imageIndex;

    var carousel = el("section", "evidence-carousel");
    carousel.setAttribute("aria-label", t("project.evidence") + " — " + content.title);

    var viewport = el("div", "carousel-viewport");
    viewport.tabIndex = 0;
    viewport.setAttribute("role", "region");
    viewport.setAttribute("aria-roledescription", "carousel");
    viewport.setAttribute("aria-label", t("project.evidence"));

    var track = el("div", "carousel-track");
    var slides = [];
    items.forEach(function (item, index) {
      var figure = el("figure", "carousel-slide");
      figure.setAttribute("aria-label", format(t("project.imageOf"), { current: index + 1, total: items.length }));
      figure.appendChild(safeImg(item.src, item.alt, index === 0));
      figure.appendChild(el("figcaption", "carousel-caption", item.caption));
      track.appendChild(figure);
      slides.push(figure);
    });
    viewport.appendChild(track);

    var controls = el("div", "carousel-controls");
    var previous = el("button", "carousel-button", "←");
    previous.type = "button";
    previous.setAttribute("aria-label", t("project.previous"));

    var status = el("div", "carousel-status");
    var counter = el("span", "carousel-counter");
    counter.setAttribute("aria-live", "polite");
    var dots = el("div", "carousel-dots");
    var dotNodes = [];
    items.forEach(function (_, index) {
      var dot = el("button", "carousel-dot");
      dot.type = "button";
      dot.setAttribute("aria-label", format(t("project.imageOf"), { current: index + 1, total: items.length }));
      dot.addEventListener("click", function () { goToImage(index, true); });
      dots.appendChild(dot);
      dotNodes.push(dot);
    });
    status.append(counter, dots);

    var next = el("button", "carousel-button", "→");
    next.type = "button";
    next.setAttribute("aria-label", t("project.next"));
    controls.append(previous, status, next);
    carousel.append(viewport, controls);

    player.dom.track = track;
    player.dom.slides = slides;
    player.dom.counter = counter;
    player.dom.dots = dotNodes;

    previous.addEventListener("click", function () { goToImage(player.imageIndex - 1, true); });
    next.addEventListener("click", function () { goToImage(player.imageIndex + 1, true); });

    viewport.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      goToImage(player.imageIndex + (event.key === "ArrowRight" ? 1 : -1), true);
    });

    // A short horizontal swipe is enough to browse screenshots on touch devices.
    var touchStartX = 0;
    viewport.addEventListener("touchstart", function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    viewport.addEventListener("touchend", function (event) {
      var delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 45) goToImage(player.imageIndex + (delta < 0 ? 1 : -1), true);
    }, { passive: true });

    if (items.length === 1) controls.classList.add("is-single");
    updateGallery();
    return carousel;
  }

  function createTextSection(label, text, className) {
    var section = el("section", "case-text " + (className || ""));
    section.appendChild(el("h4", "case-label", label));
    section.appendChild(el("p", null, text || ""));
    return section;
  }

  function createListSection(label, values, className) {
    var section = el("section", "case-list " + (className || ""));
    section.appendChild(el("h4", "case-label", label));
    var list = el("ul");
    (values || []).forEach(function (value) { list.appendChild(el("li", null, value)); });
    section.appendChild(list);
    return section;
  }

  function createActiveProject(project, index, total) {
    var content = projectContent(project);
    var article = el("article", "project-case project-enter");
    article.id = "project-" + project.id;

    var header = el("header", "project-header");
    var identity = el("div", "project-identity");
    identity.appendChild(el("p", "project-number", t("project.caseLabel") + " " + padNumber(index + 1) + " / " + padNumber(total)));
    identity.appendChild(el("h3", "project-title", content.title || project.id));
    identity.appendChild(el("p", "project-summary", content.summary || ""));

    var meta = el("div", "project-meta");
    var tools = el("dl", "project-tools");
    tools.appendChild(el("dt", null, t("project.tools")));
    tools.appendChild(el("dd", null, content.tools || (project.tags || []).join(" · ")));
    meta.appendChild(tools);

    if (project.repo) {
      var repo = el("a", "project-repo");
      repo.href = project.repo;
      repo.target = "_blank";
      repo.rel = "noopener";
      repo.appendChild(el("span", null, t("project.repository")));
      repo.appendChild(el("span", null, "↗"));
      meta.appendChild(repo);
    } else {
      meta.appendChild(el("span", "project-repo-status", t("project.noRepository")));
    }
    header.append(identity, meta);

    var media = createCarousel(project, content);
    var narrative = el("div", "project-narrative");
    narrative.appendChild(createTextSection(t("modal.problem"), content.problem, "problem"));
    narrative.appendChild(createTextSection(t("modal.approach"), content.approach, "approach"));
    narrative.appendChild(createListSection(t("modal.results"), content.results, "results"));
    narrative.appendChild(createListSection(t("modal.insights"), content.insights, "insights"));

    article.append(header, media, narrative);
    return article;
  }

  /* -------------------------- project selector -------------------------- */

  function updateProjectSelector() {
    var dom = player.dom;
    if (dom.projectCounter) {
      dom.projectCounter.textContent = padNumber(player.projectIndex + 1) + " / " + padNumber(projects.length);
    }
    if (dom.stage && dom.tabs && dom.tabs[player.projectIndex]) {
      dom.stage.setAttribute("aria-labelledby", dom.tabs[player.projectIndex].id);
    }
    (dom.tabs || []).forEach(function (tab, index) {
      var active = index === player.projectIndex;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    // On phones the selector is a horizontal rail. Keep the current project
    // visible when autoplay, arrows or a language change selects another tab.
    if (dom.projectTabs && dom.tabs && dom.tabs[player.projectIndex]
      && window.matchMedia("(max-width: 620px)").matches) {
      window.requestAnimationFrame(function () {
        var activeTab = dom.tabs[player.projectIndex];
        var targetLeft = activeTab.offsetLeft - (dom.projectTabs.clientWidth - activeTab.offsetWidth) / 2;
        dom.projectTabs.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      });
    }
  }

  function renderActiveProject() {
    var stage = player.dom.stage;
    if (!stage || !projects.length) return;
    clear(stage);
    player.imageIndex = 0;
    player.baseImageIndex = 0;
    player.dom.track = null;
    player.dom.slides = [];
    player.dom.dots = [];

    var article = createActiveProject(projects[player.projectIndex], player.projectIndex, projects.length);
    stage.appendChild(article);
    updateProjectSelector();
    resetProjectClock();
  }

  function setActiveProject(index, manual) {
    player.projectIndex = wrapIndex(index, projects.length);
    renderActiveProject();

    // Manual choices keep keyboard users oriented without unexpectedly moving
    // the page. Automatic changes never steal focus or announce excessively.
    if (manual && player.dom.tabs && player.dom.tabs[player.projectIndex]) {
      player.dom.tabs[player.projectIndex].focus({ preventScroll: true });
    }
  }

  function autoplayTick(now) {
    player.frame = 0;
    if (player.pauseReasons.size || prefersReducedMotion()) return;

    var totalElapsed = player.elapsed + (now - player.startedAt);
    var slot = Math.floor(totalElapsed / IMAGE_SLOT_MS);

    if (slot >= SLOTS_PER_PROJECT) {
      setActiveProject(player.projectIndex + 1, false);
      return;
    }

    var targetImage = wrapIndex(player.baseImageIndex + slot, player.galleryLength);
    if (targetImage !== player.imageIndex) goToImage(targetImage, false);

    if (player.dom.progress) {
      player.dom.progress.style.transform = "scaleX(" + Math.max(0, 1 - totalElapsed / PROJECT_CYCLE_MS) + ")";
    }
    if (player.dom.progressTrack) {
      var remainingSeconds = String(Math.max(0, Math.ceil((PROJECT_CYCLE_MS - totalElapsed) / 1000)));
      if (player.dom.progressTrack.getAttribute("aria-valuenow") !== remainingSeconds) {
        player.dom.progressTrack.setAttribute("aria-valuenow", remainingSeconds);
      }
    }
    player.frame = requestAnimationFrame(autoplayTick);
  }

  function setPaused(reason, paused) {
    var wasPaused = player.pauseReasons.size > 0;
    if (paused) player.pauseReasons.add(reason);
    else player.pauseReasons.delete(reason);
    var isPaused = player.pauseReasons.size > 0;

    if (!wasPaused && isPaused) {
      player.elapsed += performance.now() - player.startedAt;
      if (player.frame) cancelAnimationFrame(player.frame);
      player.frame = 0;
    } else if (wasPaused && !isPaused && !prefersReducedMotion()) {
      player.startedAt = performance.now();
      player.frame = requestAnimationFrame(autoplayTick);
    }
  }

  function bindPlayerPauses(root, stage) {
    stage.addEventListener("pointerenter", function () { setPaused("hover", true); });
    stage.addEventListener("pointerleave", function () { setPaused("hover", false); });

    root.addEventListener("focusin", function () { setPaused("focus", true); });
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) setPaused("focus", false);
    });

    if (!visibilityPauseBound) {
      document.addEventListener("visibilitychange", function () {
        setPaused("hidden", document.hidden);
      });
      visibilityPauseBound = true;
    }

    if ("IntersectionObserver" in window) {
      if (projectVisibilityObserver) projectVisibilityObserver.disconnect();
      projectVisibilityObserver = new IntersectionObserver(function (entries) {
        setPaused("offscreen", !entries[0].isIntersecting);
      }, { threshold: 0.02 });
      projectVisibilityObserver.observe(root);
    }
  }

  function renderProjects() {
    var wrap = document.getElementById("projects-list");
    if (!wrap) return;
    if (player.frame) cancelAnimationFrame(player.frame);
    clear(wrap);

    if (contentIsLoading) {
      var loading = el("div", "project-message container");
      loading.appendChild(el("p", "project-message-note", t("project.loading")));
      wrap.appendChild(loading);
      return;
    }

    if (!projects.length) {
      var unavailable = el("div", "project-message container");
      unavailable.appendChild(el("h3", "project-message-title", t("project.noneTitle")));
      unavailable.appendChild(el("p", "project-message-copy", t("project.noneCopy")));
      var linkedin = el("a", "text-link", t("contact.linkedin") + " ↗");
      linkedin.href = "https://www.linkedin.com/in/andre-valenga-5a53ab154/";
      linkedin.target = "_blank";
      linkedin.rel = "noopener";
      unavailable.appendChild(linkedin);
      wrap.appendChild(unavailable);
      return;
    }

    player.pauseReasons = new Set(document.hidden ? ["hidden"] : []);
    player.projectIndex = wrapIndex(player.projectIndex, projects.length);

    var selector = el("div", "project-selector container");
    selector.setAttribute("data-reveal", "");
    var selectorTop = el("div", "project-selector-top");
    var selectorHeading = el("div", "project-selector-heading");
    var selectorLabel = el("p", "project-selector-label", t("project.picker"));
    var selectorHint = el("span", "project-swipe-hint", t("project.swipeProjects"));
    selectorHeading.append(selectorLabel, selectorHint);
    var projectCounter = el("span", "project-selector-counter");

    var projectNav = el("div", "project-nav");
    var previousProject = el("button", "project-nav-button", "←");
    previousProject.type = "button";
    previousProject.setAttribute("aria-label", t("project.previousProject"));
    var nextProject = el("button", "project-nav-button", "→");
    nextProject.type = "button";
    nextProject.setAttribute("aria-label", t("project.nextProject"));
    projectNav.append(previousProject, projectCounter, nextProject);
    selectorTop.append(selectorHeading, projectNav);

    var tabs = el("div", "project-tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", t("project.picker"));
    tabs.style.setProperty("--project-count", projects.length);
    var tabNodes = [];
    projects.forEach(function (project, index) {
      var content = projectContent(project);
      var tab = el("button", "project-tab");
      tab.type = "button";
      tab.id = "project-tab-" + project.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "active-project-stage");
      tab.appendChild(el("span", "project-tab-number", padNumber(index + 1)));
      tab.appendChild(el("span", "project-tab-title", content.title || project.id));
      tab.addEventListener("click", function () { setActiveProject(index, true); });
      tabs.appendChild(tab);
      tabNodes.push(tab);
    });

    tabs.addEventListener("keydown", function (event) {
      var target = player.projectIndex;
      if (event.key === "ArrowRight") target += 1;
      else if (event.key === "ArrowLeft") target -= 1;
      else if (event.key === "Home") target = 0;
      else if (event.key === "End") target = projects.length - 1;
      else return;
      event.preventDefault();
      setActiveProject(target, true);
    });

    // Phones get persistent arrows beside the horizontal rail. The original
    // controls stay in the heading on larger screens.
    var projectRail = el("div", "project-tabs-rail");
    var mobilePreviousProject = el("button", "project-rail-button", "←");
    mobilePreviousProject.type = "button";
    mobilePreviousProject.setAttribute("aria-label", t("project.previousProject"));
    var mobileNextProject = el("button", "project-rail-button", "→");
    mobileNextProject.type = "button";
    mobileNextProject.setAttribute("aria-label", t("project.nextProject"));
    projectRail.append(mobilePreviousProject, tabs, mobileNextProject);

    var progressTrack = el("div", "project-progress-track");
    progressTrack.setAttribute("role", "progressbar");
    progressTrack.setAttribute("aria-label", t("project.progress"));
    progressTrack.setAttribute("aria-valuemin", "0");
    progressTrack.setAttribute("aria-valuemax", "16");
    progressTrack.setAttribute("aria-valuenow", "16");
    var progress = el("span", "project-progress");
    progressTrack.appendChild(progress);

    selector.append(selectorTop, projectRail, progressTrack);
    var stage = el("div", "project-stage container");
    stage.setAttribute("data-reveal", "");
    stage.id = "active-project-stage";
    stage.setAttribute("role", "tabpanel");
    wrap.append(selector, stage);
    observeReveal(selector);
    observeReveal(stage);

    player.dom = {
      stage: stage,
      tabs: tabNodes,
      projectTabs: tabs,
      projectCounter: projectCounter,
      progress: progress,
      progressTrack: progressTrack,
    };

    previousProject.addEventListener("click", function () { setActiveProject(player.projectIndex - 1, true); });
    nextProject.addEventListener("click", function () { setActiveProject(player.projectIndex + 1, true); });
    mobilePreviousProject.addEventListener("click", function () { setActiveProject(player.projectIndex - 1, true); });
    mobileNextProject.addEventListener("click", function () { setActiveProject(player.projectIndex + 1, true); });
    bindPlayerPauses(wrap, stage);
    renderActiveProject();
  }

  /* ----------------------- language and navigation ---------------------- */

  function updateMenu() {
    var toggle = document.getElementById("menu-toggle");
    var panel = document.getElementById("nav-panel");
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", String(menuOpen));
    panel.classList.toggle("is-open", menuOpen);
    document.body.classList.toggle("menu-open", menuOpen);
    var label = toggle.querySelector(".menu-toggle-label");
    if (label) label.textContent = menuOpen ? t("nav.closeMenu") : t("nav.menu");
  }

  function closeMenu() {
    menuOpen = false;
    updateMenu();
  }

  function setLanguage(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    currentLang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (error) {}

    document.querySelectorAll(".lang-btn").forEach(function (button) {
      var active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      var languageName = I18N[button.getAttribute("data-lang")].langName;
      button.setAttribute("aria-label", languageName);
      button.title = languageName;
    });

    applyStaticI18n();
    renderStats();
    renderSkills();
    renderHighlights();
    renderCerts();
    renderProjects();
    updateMenu();
  }

  function initSectionObserver() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[data-section]"));
    if (!("IntersectionObserver" in window) || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!visible) return;
      links.forEach(function (link) {
        if (link.getAttribute("data-section") === visible.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-20% 0px -60%", threshold: [0.01, 0.2, 0.5] });

    ["projects", "about", "contact"].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* -------------------------------- init ------------------------------- */

  async function init() {
    if (typeof I18N === "undefined" || typeof ProjectContent === "undefined") {
      console.error("[portfolio] The page text or project reader did not load.");
      return;
    }

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    var backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      backToTop.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      });
    }

    document.querySelectorAll(".lang-btn").forEach(function (button) {
      button.addEventListener("click", function () { setLanguage(button.getAttribute("data-lang")); });
    });

    var menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        menuOpen = !menuOpen;
        updateMenu();
      });
    }

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuOpen) {
        closeMenu();
        if (menuToggle) menuToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820 && menuOpen) closeMenu();
    });

    initRevealObserver();
    var saved = DEFAULT_LANG;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (error) {}
    setLanguage(saved);
    initSectionObserver();

    try {
      projects = await ProjectContent.loadProjects();
    } catch (error) {
      projects = [];
    }
    contentIsLoading = false;
    renderProjects();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
