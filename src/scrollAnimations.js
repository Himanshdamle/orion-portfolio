import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();

export function runAllScrollAnima() {
  sideInfoReveal();
  aboutMeReveal();

  revealTechStack();
}

function aboutMeReveal() {
  gsap.from(".about-me-text", {
    scrollTrigger: {
      trigger: "#about-me",
      start: "top 40%",
      end: "bottom 20%",
      toggleActions: "play none play reverse",
    },

    opacity: 0,
    filter: "blur(20px)",
    scale: 0.9,
    x: -100,
    duration: 1.5,
    ease: "power3.out",
    overwrite: "auto",

    stagger: 0.2,
  });
}

// desktop only
function sideInfoReveal() {
  if (window.innerWidth < 1024) return;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#about-me",
        start: "bottom bottom", // trigger starts once About has fully scrolled into view
        end: "+=600", // extra scroll distance (in px) needed to complete the reveal — tune this
        scrub: 1,
        pin: true, // pins #about in place while user scrolls through this extra distance
        pinSpacing: true, // keeps layout from jumping (default true, but explicit here)
      },
    })

    .from(".si-heading", {
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.9,
      x: -30,

      stagger: 0.2,
    })
    .from(
      ".si-side-bar",
      {
        height: 0,
        stagger: 0.2,
      },
      "+=0.3",
    )
    .from(
      ".si-list",
      {
        x: -32,
        opacity: 0,
        filter: "blur(5px)",
        stagger: 0.2,
      },
      "+=0.3",
    );
}

// mobile only
function revealTechStack() {
  gsap.set(".ts-box-glow", {
    opacity: 0,
  });
  gsap.set(".ts-overlay", { overflow: "hidden" });

  gsap.from(".ts-box", {
    scrollTrigger: {
      trigger: "#skills",
      start: "top 40%",
      end: "bottom 20%",
      toggleActions: "play none play reverse",
      onEnter: () => gsap.set(".ts-overlay", { overflow: "hidden" }),
      onEnterBack: () => gsap.set(".ts-overlay", { overflow: "hidden" }),
      onLeaveBack: () => gsap.set(".ts-overlay", { overflow: "hidden" }),
    },

    x: "-105%",
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto",
    stagger: 0.1,

    onComplete() {
      gsap.set(".ts-overlay", { overflow: "unset" });
      gsap.to(".ts-box-glow", { opacity: 1, duration: 0.5 });
    },

    onReverseComplete() {
      // optional: reset glow back to 0 when reversed, so it's ready for next play
      gsap.set(".ts-box-glow", { opacity: 0 });
    },
  });
}
