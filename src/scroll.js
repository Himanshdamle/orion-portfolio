import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isStAnimationEnded } from "./animation";

gsap.registerPlugin(ScrollTrigger);

function onScroll({ velocity }) {
  if (!isStAnimationEnded) return;

  ScrollTrigger.update();

  if (window.innerWidth < 1024) return;

  const skew = gsap.utils.clamp(-5, 5, velocity * 0.04);

  gsap.to("[data-scroll-section]", {
    skewY: skew,
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto",
  });
}

export const locoScroll = new LocomotiveScroll({
  lenisOptions: {
    lerp: 0.08,
    wheelMultiplier: 0.85,
    touchMultiplier: 2,
    smoothWheel: true,
    smoothTouch: false,
  },

  scrollCallback: onScroll,

  initCustomTicker: (render) => {
    gsap.ticker.add(render);
    gsap.ticker.lagSmoothing(0);
  },

  destroyCustomTicker: (render) => {
    gsap.ticker.remove(render);
  },
});

ScrollTrigger.refresh();
