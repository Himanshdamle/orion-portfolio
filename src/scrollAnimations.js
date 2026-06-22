import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();

export function runAllScrollAnima() {
  sideInfoReveal();
  aboutMeReveal();

  revealSkillSection();
  // revealTechStack();
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
    y: 200,
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

function revealSkillSection() {
  const psuedoSH = document.querySelector("#psuedo-skill-heading");
  gsap.set(psuedoSH, { xPercent: -50, yPercent: -50 });

  const sh = document.querySelector("#skill-heading");

  const tp1 = sh.getBoundingClientRect().top;
  const tp2 = document.querySelector("#skills").getBoundingClientRect().top;

  const topPosition = tp1 - tp2;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#skills",
      start: "bottom bottom",
      end: "+=500",
      pin: true,
      scrub: 1,
    },
  });

  if (window.innerWidth > 1024) {
    tl.to(
      psuedoSH,
      {
        top: topPosition,
        x: 0,
        y: 0,
        left: sh.getBoundingClientRect().left,
        scale: 1,
      },
      "+=0.3",
    );
  } else {
    tl.to(
      psuedoSH,
      {
        y: -50,
        filter: "blur(10px)",
        opacity: 0,
        scale: 1,
      },
      "+=0.3",
    );
  }

  tl.from("#tech-stack-grid", {
    filter: "blur(5px)",
    y: 100,
    opacity: 0,
  }).from(
    "#learning-next-wrap",
    {
      opacity: 0,
      y: 100,
      filter: "blur(5px)",
    },
    "+=0.3",
  );
}
