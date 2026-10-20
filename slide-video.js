(() => {
  'use strict';
  const slide = document.getElementById('logic');
  const video = document.getElementById('logic-demo');
  if (!slide || !video) return;

  let active = false;
  let pageHidden = false;
  let pendingPlay = false;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;

  const shouldPlay = () => active && !document.hidden && !pageHidden;
  function syncPlayback() {
    if (!shouldPlay()) {
      video.pause();
      // Returning to the slide starts the demonstration from the beginning.
      if (!active && video.readyState >= 1) video.currentTime = 0;
      return;
    }
    if (pendingPlay || !video.paused) return;
    pendingPlay = true;
    Promise.resolve().then(() => video.play()).then(() => {
      video.controls = false;
    }).catch(() => {
      // Native controls provide a way to start if the browser blocks autoplay.
      if (shouldPlay()) video.controls = true;
    }).finally(() => {
      pendingPlay = false;
      if (!shouldPlay()) syncPlayback();
    });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === slide) active = entry.isIntersecting;
      }
      syncPlayback();
    }, { rootMargin: '-15% 0px -15% 0px', threshold: 0 }).observe(slide);
  } else {
    let scheduled = false;
    const update = () => {
      scheduled = false;
      const rect = slide.getBoundingClientRect();
      active = rect.top < window.innerHeight * .85 && rect.bottom > window.innerHeight * .15;
      syncPlayback();
    };
    const schedule = () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
  }
  document.addEventListener('visibilitychange', syncPlayback);
  video.addEventListener('loadedmetadata', syncPlayback);
  window.addEventListener('pagehide', () => { pageHidden = true; syncPlayback(); });
  window.addEventListener('pageshow', () => { pageHidden = false; syncPlayback(); });
})();
