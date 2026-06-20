import {
  blurOverlay,
  menuAnimation,
  scrollDownNav,
  scrollUpNav,
  moveTsSlider,
  slideBackendTs,
  slideFrontendTs,
  isStAnimationEnded,
} from "./animation";
import gsap from "gsap";

export function setupAllEvents() {
  menu();
  onScrollNavControl();

  techStackSlider();
  slowCursorMoment();
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

function slowCursorMoment() {
  if (window.innerWidth < 1024) return;

  const body = document.body;
  const target = document.querySelector("#hero-section-center");
  const tbwlt = document.querySelector("#text-bw-line-top");
  const tbwlb = document.querySelector("#text-bw-line-bottom");
  const els = document.querySelectorAll(".slow-moment");

  const maxOffset = 45;

  const motionEase = {
    duration: 1.2,
    ease: "power3.out",
    overwrite: "auto", // kills the previous tween
  };

  body.addEventListener("mousemove", (e) => {
    if (!isStAnimationEnded) return;

    // position relative to viewport center
    const xOffset = (e.clientX / window.innerWidth - 0.5) * 2 * maxOffset;
    const yOffset = (e.clientY / window.innerHeight - 0.5) * 2 * maxOffset;

    gsap.to(target, {
      x: gsap.utils.clamp(-maxOffset, maxOffset, xOffset),
      y: gsap.utils.clamp(-maxOffset, maxOffset, yOffset),
      ...motionEase,
    });

    gsap.to(els, {
      x: gsap.utils.clamp(-maxOffset, maxOffset, xOffset) / 2,
      y: gsap.utils.clamp(-maxOffset, maxOffset, yOffset) / 2,
      ...motionEase,
    });

    const vectorResultant = Math.sqrt(
      (xOffset + 50) ** 2 + (yOffset + 50) ** 2,
    );

    gsap.to(tbwlt, {
      width: 4 * 59 + vectorResultant,
      ...motionEase,
    });

    gsap.to(tbwlb, {
      width: 4 * 100 + vectorResultant,
      ...motionEase,
    });
  });
}
