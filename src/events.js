import { blurOverlay, menuAnimation, moveTsSlider } from "./animation";
import gsap from "gsap";

export function setupAllEvents() {
  menu();
  onScrollNavControl();

  techStackSlider();
}

function menu() {
  const menuBtn = document.querySelector("#menu-btn");
  const btnRect = menuBtn.getBoundingClientRect();

  let isOpen = false;
  menuBtn.addEventListener("click", (e) => {
    isOpen = !isOpen;
    menuAnimation(isOpen);
    blurOverlay(isOpen, e);
  });
}

function onScrollNavControl() {
  const navWrapper = document.querySelector("#nav-wrapper");
  const navWrapperRect = navWrapper.getBoundingClientRect();

  let lastScroll = 0;
  let anima1, anima2;
  window.addEventListener("scroll", (e) => {
    const scrollY = window.scrollY;
    let upScroll = lastScroll < scrollY;

    if (scrollY == 0) upScroll = false;

    if (upScroll) {
      if (anima1) return;

      anima1 = gsap.to(navWrapper, {
        y: "-100%",
        filter: "blur(10px)",
        opacity: 0.5,
        scale: 0.8,

        duration: 0.5,

        onComplete() {
          anima1 = null;
        },
      });
    } else {
      if (anima2) return;

      anima2 = gsap.to(navWrapper, {
        y: 0,
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,

        duration: 0.5,

        onComplete() {
          anima2 = null;
        },
      });
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
  });
}
