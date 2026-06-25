import gsap from "gsap";
import { swooshSoundEffect } from "./soundEffects";

export function runAllAnima() {
  stGradient();
  stCounterAnima();

  infiniteScroll();

  gsap.set(".ts-overlay-b", { overflow: "hidden" });
  gsap.set(".ts-box-b", { x: "-105%" });
  gsap.set(".ts-box-glow-b", { opacity: 0 });
}

const stCounter = document.querySelector(".st-counter");
function stGradient() {
  gsap.to(".bg-gradient", {
    backgroundSize: "100% 100%",
    duration: 4,
    ease: "power2.out",
  });

  gsap.to(stCounter, {
    filter: "blur(0px)",
    duration: 0.5,
  });
}

const stAnimationBox = document.querySelector("#st-animation-box");
function stCounterAnima() {
  const counter = document.querySelectorAll(".counter-txt");
  const mainHeadingRect = document
    .querySelector(".main-head")
    .getBoundingClientRect();

  const stAnimationBoxRect = document
    .querySelector("#st-animation-box")
    .getBoundingClientRect();

  // align perfectly
  const y = mainHeadingRect.top - stAnimationBoxRect.top;

  gsap.set("#st-animation-box", { y: y });

  const obj = { value: 0 };

  gsap.to(obj, {
    value: 99,
    duration: 1,
    ease: "none",

    onUpdate: () => {
      const v = String(Math.floor(obj.value)).padStart(3, "0") + "%";
      counter[0].textContent = v;
      counter[1].textContent = v;
    },

    onComplete: () => {
      counter[0].textContent = "Himansh";
      counter[1].textContent = "Himansh";

      moveUp();
      scrollDownNav();
    },
  });
}

function moveUp() {
  const tl = gsap.timeline({
    duration: 0.3,
    ease: "power2.out",

    onComplete() {
      revealContent();
    },
  });

  tl.to(".t1", {
    opacity: 0,
    filter: "blur(5px)",
  })
    .to(
      ".jskdjf",
      {
        y: "-100%",
      },
      "<<",
    )
    .to(
      ".t2",
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      "<<",
    );
}

export let isStAnimationEnded = false;
function revealContent() {
  gsap.to("#web-container", {
    opacity: 1,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",

    onComplete() {
      gsap.set("#web-container", { filter: "none" });
      gsap.to("#st-anima-glow", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",

        onComplete() {
          isStAnimationEnded = true;
          stCounter.remove();
        },
      });
    },
  });
}

let waveFormAnima;
export function iniWaveAnima(ini = true) {
  if (!ini) {
    waveFormAnima.reverse();
    return;
  }

  waveFormAnima = gsap.timeline({
    onReverseComplete() {
      waveFormAnima = null;
      waveRunAnima(true);
    },
  });

  waveFormAnima
    .to(".wave-left", {
      duration: 1,
      attr: {
        d: "M0 6.99957 C21.6918 22.4996 45.8069 6.99957 45.8069 6.99957",
      },
      ease: "power2.inOut",
    })

    .to(
      ".wave-right",
      {
        duration: 1,
        attr: {
          d: "M89.591 7.88867 C68.4902 -7.61133 44.3751 7.88867 44.3751 7.88867",
        },
        ease: "power2.inOut",
      },
      "<<",
    );
}

let waveAnima;
export function waveRunAnima(killAnima) {
  if (killAnima) {
    if (!waveAnima) return;

    waveAnima.kill();
    gsap.set("#wave-marquee", {
      x: 0,
    });
  } else {
    waveAnima = gsap.to("#wave-marquee", {
      x: "-50%",
      ease: "none",
      duration: 2,
      repeat: -1,
    });
  }
}

let tl;
export function menuAnimation(openAnima) {
  if (!openAnima) {
    tl.reverse();
    return;
  }

  if (tl) {
    menuAnimation(false);
    return;
  }

  tl = gsap.timeline({
    onReverseComplete() {
      tl = null;
    },
  });

  tl.to(".t-menu-bar-wrp", {
    marginLeft: 0,
  })
    .to([".t1-mb", ".b2-mb"], {
      rotate: 45,
    })
    .to(
      [".t2-mb", ".b1-mb"],
      {
        rotate: -45,
      },
      "<<",
    )
    .to(
      [".t1-mb", ".b1-mb"],
      {
        marginRight: 4,
      },
      "<<",
    );
}

let ani, revCompleteFunc;
export function blurOverlay(open, e, revComplete) {
  if (window.innerWidth >= 550) return;

  revCompleteFunc = revComplete ? revComplete : undefined;

  if (!open) {
    ani.reverse();
    return;
  }

  const tl = gsap.timeline({
    duration: 0.35,
    ease: "power2.in",

    onReverseComplete() {
      console.log(revComplete, e);

      revComplete?.();
    },
  });

  ani = tl
    .set("#blur-overlay", {
      top: e.y,
      left: e.x,
      filter: "blur(30px)",
      opacity: 0.3,
    })
    .set("#nav-wrapper", { backdropFilter: "blur(16px)" })
    .set("#menu-content", {
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.95,
      x: "-12%",
    })
    .set("#infinite-scroll-menu", {
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.9,
      x: 50,
    });

  tl.to("#blur-overlay", {
    width: "100%",
    height: "100%",

    top: 0,
    left: 0,

    borderRadius: 0,
    opacity: 1,
    filter: "blur(0px)",

    duration: 0.5,
    ease: "power2.inOut",
  })
    .to("#nav-wrapper", { backdropFilter: "blur(0px)", duration: 0.5 }, "<<")
    .to(
      "#infinite-scroll-menu",
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      },
      "-=0.2",
    )
    .to(
      "#menu-content",
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x: 0,
      },
      "-=0.1",
    );
}

function infiniteScroll() {
  gsap.to(".ism", {
    x: "-105%",
    duration: 8,
    repeat: -1,

    ease: "none",
  });
}

const navWrapper = document.querySelector("#nav-wrapper");
export function scrollUpNav() {
  gsap.to(navWrapper, {
    y: "-100%",
    filter: "blur(10px)",
    opacity: 0.5,
    scale: 0.8,

    duration: 0.5,
  });
}

export function scrollDownNav() {
  gsap.to(navWrapper, {
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
    scale: 1,

    duration: 0.5,
  });
}

const frontendTs = document.querySelector("#frontend-ts");
const backendTs = document.querySelector("#backend-ts");
const tsSlider = document.querySelector("#ts-slider");
let lastState = true;
export function moveTsSliderLeft(isMoveLeft) {
  // meaning user is clicking the same state btn
  if (lastState == isMoveLeft) return;

  lastState = isMoveLeft;

  const tl = gsap.timeline({
    duration: 0.3,

    onComplete() {
      gsap.to(tsSlider, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",

        duration: 0.3,
      });
    },
  });

  tl.to(tsSlider, {
    x: isMoveLeft ? 0 : "100%",
  });
  tl.to(tsSlider, { scale: 1.2, opacity: 0.9, filter: "blur(1px)" }, "<<")
    .to(
      isMoveLeft ? frontendTs : backendTs,
      {
        color: "#000275",
      },
      "<<",
    )
    .to(
      isMoveLeft ? backendTs : frontendTs,
      {
        color: "#E2E2FD",
      },
      "<<",
    );

  if (isMoveLeft) {
    tsGlowBoxB.forEach((box) => {
      box.classList.remove("glow");
    });
    tsBoxGlow.forEach((g) => {
      g.classList.add("glow");
    });
  } else {
    tsGlowBoxB.forEach((box) => {
      box.classList.add("glow");
    });
    tsBoxGlow.forEach((g) => {
      g.classList.remove("glow");
    });
  }
}

let tl1;
const tsOverlayB = document.querySelectorAll(".ts-overlay-b");
const tsGlowBoxB = document.querySelectorAll(".ts-box-glow-b");
const tsBoxB = document.querySelectorAll(".ts-box-b");
export function slideBackendTs() {
  if (tl1) {
    tl1.reverse();
    return;
  }

  gsap.set(tsOverlayB, { overflow: "hidden" });
  gsap.set(tsBoxB, { x: "-100%" });
  gsap.set(tsGlowBoxB, { opacity: 0 });

  tl1 = gsap.timeline({
    onReverseComplete() {
      tl1 = null;
    },
  });

  tl1
    .to(tsBoxB, {
      x: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.02,
    })
    .set(tsOverlayB, { overflow: "unset" })
    .to(tsGlowBoxB, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.02,
    });
}

let tl2;
const tsBoxGlow = document.querySelectorAll(".ts-box-glow");
const tsOverlay = document.querySelectorAll(".ts-overlay");
const tsBox = document.querySelectorAll(".ts-box");
export function slideFrontendTs() {
  if (tl2) {
    tl2.reverse();
    return;
  }

  tl2 = gsap.timeline({
    onReverseComplete() {
      tl2 = null;
    },
  });

  tl2
    .to(tsBoxGlow, {
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
    })
    .set(tsOverlay, { overflow: "hidden" })
    .to(tsBox, {
      x: "100%",
      duration: 0.5,
      stagger: 0.02,
      ease: "power1.in",
    });
}
