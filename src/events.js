import {
  blurOverlay,
  menuAnimation,
  scrollDownNav,
  scrollUpNav,
  moveTsSlider,
  slideBackendTs,
  slideFrontendTs,
} from "./animation";
import gsap from "gsap";

export function setupAllEvents() {
  menu();
  onScrollNavControl();

  techStackSlider();
}

let isMenuOpen = false;
function menu() {
  const menuBtn = document.querySelector("#menu-btn");
  const btnRect = menuBtn.getBoundingClientRect();

  isMenuOpen = false;
  menuBtn.addEventListener("click", (e) => {
    isMenuOpen = !isMenuOpen;
    menuAnimation(isMenuOpen);
    blurOverlay(isMenuOpen, e);
  });
}

function onScrollNavControl() {
  const navWrapper = document.querySelector("#nav-wrapper");

  let lastScroll = 0;
  let anima1 = false;
  window.addEventListener("scroll", (e) => {
    if (isMenuOpen) return;

    const scrollY = window.scrollY;
    let upScroll = lastScroll < scrollY;

    if (scrollY == 0) upScroll = false;

    if (upScroll) {
      if (!anima1) {
        scrollUpNav();
        anima1 = true;
      }
    } else {
      if (anima1) {
        anima1 = false;
        scrollDownNav();
      }
    }

    lastScroll = window.scrollY;
  });
}

function techStackSlider() {
  const buttonWrapper = document.querySelector("#ts-slider-btn-wrp");

  buttonWrapper.addEventListener("click", (e) => {
    const targetID = e.target.id;

    const moveLeft = targetID == "frontend-ts";

    if (moveLeft) {
      moveTsSlider(true);
    } else if (targetID == "backend-ts") {
      moveTsSlider(false);
    }

    slideBackendTs();
    slideFrontendTs();
  });
}
