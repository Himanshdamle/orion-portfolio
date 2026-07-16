import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isStAnimationEnded } from "./animation";

gsap.registerPlugin(ScrollTrigger);

function onScroll({ velocity }) {
  if (!isStAnimationEnded) return;

  ScrollTrigger.update();
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
