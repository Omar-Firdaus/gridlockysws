(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var overlay = document.getElementById("comic-launch");
  var start = document.querySelector(".launch-page .start-btn");
  if (!overlay || !start) return;

  /** Word ends ~830ms; start float after stamp settles */
  var LIFT_AFTER_WORD_MS = 900;
  /** Wait for burst-float (~550ms) + short beat before navigate */
  var GO_MS = 1880;

  start.addEventListener(
    "click",
    function (e) {
      if (reduceMotion) return;
      e.preventDefault();
      document.documentElement.classList.add("comic-launch-on");
      overlay.hidden = false;
      overlay.removeAttribute("aria-hidden");
      requestAnimationFrame(function () {
        overlay.classList.add("comic-launch--active");
      });
      window.setTimeout(function () {
        overlay.classList.add("comic-launch--lift");
      }, LIFT_AFTER_WORD_MS);
      window.setTimeout(function () {
        window.location.href = start.getAttribute("href") || "app.html";
      }, GO_MS);
    },
    true
  );
})();
