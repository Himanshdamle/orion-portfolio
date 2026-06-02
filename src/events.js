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
  let pull = 0;
  let hPull = 0;
  window.addEventListener("scroll", (e) => {
    const upScroll = lastScroll > window.scrollY;

    if (upScroll) {
      hPull = lastScroll;
      const yPull = pull - window.scrollY;

      gsap.set(navWrapper, {
        y: yPull > navWrapperRect.height ? 0 : yPull - navWrapperRect.height,
      });
    } else {
      pull = lastScroll;

      const h = lastScroll - hPull;

      console.log(h);

      gsap.set(navWrapper, {
        y: h > navWrapperRect.height ? "-100%" : -h,
      });
    }

    lastScroll = window.scrollY;
  });
}
