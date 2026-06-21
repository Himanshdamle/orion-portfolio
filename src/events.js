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
import { locoScroll } from "./scroll.js";

export function setupAllEvents() {
  menu();
  scrollToMenu();
  onScrollNavControl();

  techStackSlider();
  slowCursorMoment();
}

let isMenuOpen = false;
let scrollToFunc = false;
let targetSection;
const menuBtn = document.querySelector("#menu-btn");
function menu() {
  isMenuOpen = false;

  menuBtn.addEventListener("click", (e) => {
    isMenuOpen = !isMenuOpen;

    menuAnimation(isMenuOpen);

    blurOverlay(isMenuOpen, e, () => {
      if (!scrollToFunc) return;

      locoScroll.scrollTo(targetSection, {
        offset: 0,
        duration: 1.5,

        onComplete: () => (scrollToFunc = false),
      });
    });
  });
}

let lastBtn = document.querySelector("[data-menu-target='#home'");
function scrollToMenu() {
  document.querySelectorAll("[data-menu-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      targetSection = btn.getAttribute("data-menu-target");
      const seq = btn.getAttribute("data-seq");

      const tl = gsap.timeline({
        onComplete: () => {
          scrollToFunc = true;
          menuBtn.click();
        },
      });

      tl.to("#menu-slider", {
        top: `${20 * Number(seq)}%`,
        duration: 0.7,
        ease: "power3.out",
      })

        .to(lastBtn, { color: "#B9BBFF", fontWeight: 400 }, "-=0.5")
        .to(btn, { color: "#8385FF", fontWeight: 600 }, "<<");

      lastBtn = btn;
    });
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
