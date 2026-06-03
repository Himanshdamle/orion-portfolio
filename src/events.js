import { blurOverlay, menuAnimation } from "./animation";
import gsap from "gsap";

export function setupAllEvents() {
  menu();
  onScrollNavControl();
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
    const upScroll = lastScroll < window.scrollY;

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

      gsap.to(navWrapper, {
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
