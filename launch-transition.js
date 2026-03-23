(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var overlay = document.getElementById("comic-launch");
  var start = document.querySelector(".launch-page .start-btn");
  var bgMusic = document.getElementById("bg-music");
  var appFrame = document.getElementById("app-frame");
  var page = document.querySelector(".launch-page .page");
  var burst = overlay ? overlay.querySelector(".comic-launch__burst") : null;
  if (!overlay || !start) return;

  /** Word ends ~830ms; start float after stamp settles */
  var LIFT_AFTER_WORD_MS = 900;

  var transitionDone = false;
  function finishTransition() {
    if (transitionDone) return;
    transitionDone = true;
    if (appFrame) {
      appFrame.src = start.getAttribute("href") || "app.html";
      appFrame.hidden = false;
    }
    if (page) page.hidden = true;
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    overlay.classList.remove("comic-launch--active", "comic-launch--lift");
  }

  start.addEventListener(
    "click",
    function (e) {
      if (reduceMotion) return;
      e.preventDefault();

      if (bgMusic) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(function () {});
      }

      overlay.classList.remove("comic-launch--active", "comic-launch--lift");
      document.documentElement.classList.add("comic-launch-on");
      overlay.hidden = false;
      overlay.removeAttribute("aria-hidden");
      requestAnimationFrame(function () {
        overlay.classList.add("comic-launch--active");
      });
      window.setTimeout(function () {
        overlay.classList.add("comic-launch--lift");
        var fallback = window.setTimeout(finishTransition, 900);
        if (burst) {
          burst.addEventListener("animationend", function handler(ev) {
            if (ev.animationName === "comic-launch-burst-float") {
              clearTimeout(fallback);
              finishTransition();
            }
          }, { once: true });
        }
      }, LIFT_AFTER_WORD_MS);
    },
    true
  );
})();
