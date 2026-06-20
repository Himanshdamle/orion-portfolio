import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

function onScroll({ velocity }) {
  const skew = gsap.utils.clamp(-8, 8, velocity * 0.2);

  gsap.to("[data-scroll-section]", {
    skewY: skew,
    duration: 0.6,
    ease: "power3.out",
  });
}

const locoScroll = new LocomotiveScroll({
  lenisOptions: {
    lerp: 0.08,
    wheelMultiplier: 0.85,
    touchMultiplier: 2,
    smoothWheel: true,
    smoothTouch: false, // native touch scroll on mobile, which is what you wanted anyway
  },
  scrollCallback: onScroll,
});

export { locoScroll };
