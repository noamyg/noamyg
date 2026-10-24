(() => {
  const journey = document.querySelector(".journey");
  const video = document.querySelector(".stage__video");
  const bar = document.querySelector(".progress span");
  const header = document.querySelector(".header");
  const links = Array.from(document.querySelectorAll("[data-chapter-link]"));
  const targets = links.map((l) => document.querySelector(l.getAttribute("href")));
  const contact = document.getElementById("contact");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  let duration = 0;
  let target = 0;
  let shown = 0;      // eased playhead, chases target every frame
  let raf = 0;
  let ready = false;
  let seeking = false;
  let ticking = false;
  let active = -1;

  const progress = () => {
    const r = journey.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  };

  const seek = () => {
    if (!ready || seeking) return;
    if (Math.abs(video.currentTime - shown) < 1 / 48) return;
    seeking = true;
    video.currentTime = shown;
  };

  // Ease the playhead toward the scroll position so wheel steps and flicks
  // turn into continuous motion instead of jumps.
  const tick = () => {
    raf = 0;
    if (!ready) return;
    const diff = target - shown;
    shown = Math.abs(diff) < 0.004 ? target : shown + diff * 0.18;
    seek();
    if (shown !== target) raf = requestAnimationFrame(tick);
  };
  const chase = () => { if (!raf) raf = requestAnimationFrame(tick); };

  const update = () => {
    ticking = false;
    const p = progress();
    bar.style.transform = `scaleX(${p})`;
    let current = 0;
    const mid = window.innerHeight * 0.5;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top < mid) current = i; });
    const past = window.scrollY > journey.offsetTop + journey.offsetHeight - window.innerHeight;
    header.classList.toggle("is-solid", past);
    // between the journey and Experience, and from Contact on, no tab is active
    const jEnd = journey.offsetTop + journey.offsetHeight - mid;
    const xpTop = targets[3] ? targets[3].getBoundingClientRect().top : Infinity;
    if (window.scrollY > jEnd && xpTop >= mid) current = -1;
    if (contact.getBoundingClientRect().top < mid) current = -1;
    if (current !== active) {
      active = current;
      links.forEach((l, i) => (i === active ? l.setAttribute("aria-current", "step") : l.removeAttribute("aria-current")));
    }
    if (ready) { target = p * Math.max(0, duration - 0.05); chase(); }
  };

  const setHeaderH = () => document.documentElement.style.setProperty("--header-h", `${Math.ceil(header.getBoundingClientRect().height)}px`);
  setHeaderH();
  window.addEventListener("resize", setHeaderH, { passive: true });

  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!reduce && finePointer && window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 0.9, autoRaf: true });
    lenis.on("scroll", onScroll);
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      // Lenis honours each target's scroll-margin-top, which already clears the header
      lenis.scrollTo(el, { duration: 1.4 });
      history.replaceState(null, "", a.getAttribute("href"));
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  video.addEventListener("seeked", () => {
    seeking = false;
    video.classList.add("is-painted");
    seek();
  });

  const load = async () => {
    const mobile = window.matchMedia("(max-width: 860px), (pointer: coarse)").matches;
    const src = mobile ? video.dataset.srcMobile : video.dataset.src;
    let url = src;
    try {
      const res = await fetch(src);
      if (res.ok) url = URL.createObjectURL(await res.blob());
    } catch (e) { /* fall back to direct src */ }
    video.addEventListener("loadedmetadata", () => {
      duration = video.duration || 0;
      ready = true;
      shown = progress() * Math.max(0, duration - 0.05);
      update();
    }, { once: true });
    video.preload = "auto";
    video.src = url;
    video.load();
  };

  // iOS needs a user gesture before it paints seeked frames reliably.
  const prime = () => {
    const p = video.play();
    if (p && p.then) p.then(() => video.pause()).catch(() => {});
  };
  window.addEventListener("touchstart", prime, { once: true, passive: true });

  if (!reduce && !saveData) {
    const start = () => ("requestIdleCallback" in window ? requestIdleCallback(load, { timeout: 1500 }) : setTimeout(load, 300));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const el = document.getElementById(btn.dataset.copy);
      const text = el.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied";
      } catch (e) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        btn.textContent = "Selected";
      }
      setTimeout(() => { btn.textContent = "Copy"; }, 1600);
    });
  });

  update();
})();
