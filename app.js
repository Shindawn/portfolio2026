const sneakPeek = document.querySelector(".sneak-peek");
const shelf = document.querySelector(".project-shelf");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (sneakPeek && shelf && !reduceMotion.matches) {
  let ticking = false;

  const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

  const updateShelf = () => {
    const rect = sneakPeek.getBoundingClientRect();
    const scrollRange = sneakPeek.offsetHeight - window.innerHeight;
    const progress = scrollRange > 0 ? clamp(-rect.top / scrollRange) : 0;

    // Enter from the lower-right, cross the viewport, then lift away to the left.
    const horizontalTravel = window.innerWidth < 650 ? 38 : 30;
    const x = horizontalTravel - progress * horizontalTravel * 2;
    const enterLift = (1 - clamp(progress / 0.28)) * 12;
    const exitLift = clamp((progress - 0.76) / 0.24) * -18;
    const y = enterLift + exitLift;
    const tilt = -7 + progress * 3;

    shelf.style.setProperty("--shelf-x", `${x.toFixed(2)}vw`);
    shelf.style.setProperty("--shelf-y", `${y.toFixed(2)}vh`);
    shelf.style.setProperty("--shelf-tilt", `${tilt.toFixed(2)}deg`);
    ticking = false;
  };

  const requestShelfUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateShelf);
      ticking = true;
    }
  };

  updateShelf();
  window.addEventListener("scroll", requestShelfUpdate, { passive: true });
  window.addEventListener("resize", requestShelfUpdate);
}
