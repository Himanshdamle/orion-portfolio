import {
  blurOverlay,
  menuAnimation,
  scrollDownNav,
  scrollUpNav,
  moveTsSliderLeft,
  slideBackendTs,
  slideFrontendTs,
  isStAnimationEnded,
  iniWaveAnima,
  waveRunAnima,
  scrollToSection,
} from "./animation";
import gsap from "gsap";
import { locoScroll } from "./scroll.js";
import { deepSwooshSoundEffect, swooshSoundEffect } from "./soundEffects.js";
import { angleBetween } from "./core.js";

export function setupAllEvents() {
  slowCursorMoment();
  rotateLines();

  menu();
  navigate();
  scrollToMenu();
  onScrollNavControl();

  techStackSlider();
  hoverOnSkill();

  onClickEffect();

  controlSound();
}

let isMenuOpen = false;
let scrollToFunc = false;
let targetSection;
const menuBtn = document.querySelector("#menu-btn");
function menu() {
  isMenuOpen = false;

  menuBtn.addEventListener("click", (e) => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen == false) {
      setTimeout(() => {
        deepSwooshSoundEffect();
      }, 100);
    } else {
      setTimeout(() => {
        deepSwooshSoundEffect();
      }, 600);
    }

    menuAnimation(isMenuOpen);
    blurOverlay(isMenuOpen, e, () => {
      if (!scrollToFunc) return;

      scrollToSection(targetSection);
    });
  });
}

function navigate() {
  const btns = document.querySelectorAll(".navigate-btns");

  btns.forEach((btn) => {
    const section = btn.getAttribute("data-menu-target");

    btn.addEventListener("click", () => {
      scrollToSection(section);
    });
  });
}

const sliderBar = document.querySelector("#menu-slider");
function menuSlider(seq, lastBtn, currBtn, preventClick = true) {
  const tl = gsap.timeline({
    onComplete: () => {
      if (preventClick) return;

      menuBtn.click();
    },
  });

  if (lastBtn != currBtn) {
    swooshSoundEffect(0.2);
  }

  tl.to(sliderBar, {
    top: `${20 * Number(seq)}%`,
    duration: 0.7,
    ease: "power3.out",
  })

    .to(lastBtn, { color: "#B9BBFF", fontWeight: 400 }, "-=0.5") //de-highlight
    .to(currBtn, { color: "#8385FF", fontWeight: 600 }, "<<"); //highlight
}

let lastBtn = document.querySelector("[data-menu-target='#home'");
function scrollToMenu() {
  const btns = document.querySelectorAll(".menu-btn");

  const isMobile = window.innerWidth < 1024;

  btns.forEach((btn) => {
    const seq = btn.getAttribute("data-seq");

    btn.addEventListener("click", () => {
      targetSection = btn.getAttribute("data-menu-target");

      scrollToFunc = true;
      menuSlider(seq, lastBtn, btn, false);

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
  let currentState = true; // left

  buttonWrapper.addEventListener("click", (e) => {
    const targetID = e.target.id;

    const moveLeft = targetID == "frontend-ts";

    if (moveLeft) {
      if (currentState == true) return;

      deepSwooshSoundEffect();
      moveTsSliderLeft(true);
      currentState = true;
    } else if (targetID == "backend-ts") {
      if (currentState == false) return;

      deepSwooshSoundEffect();
      moveTsSliderLeft(false);

      currentState = false;
    } else return;

    slideBackendTs();
    slideFrontendTs();
  });
}

function hoverOnSkill() {
  if (window.innerWidth < 1040) return;

  const tsw = document.querySelector("#tech-stack-wrapper");

  function adjustGlow(g, o) {
    if (!g || !o) return;

    gsap.to(g, {
      opacity: o,
      duration: 0.5,
    });
  }

  let lastHoverGlow;
  tsw.addEventListener(
    "mousemove",
    (e) => {
      const card = e.target.closest(".tech-skill-card");

      if (!card) return;

      if (lastHoverGlow) {
        adjustGlow(lastHoverGlow, 0.5);

        lastHoverGlow = undefined;
      }

      const hoverGlow = card.querySelector(".glow");
      if (!hoverGlow) return;

      lastHoverGlow = hoverGlow;

      const allCardGlow = document.querySelectorAll(".glow");

      adjustGlow(hoverGlow, 1);

      allCardGlow.forEach((g) => {
        if (g == hoverGlow) return;

        adjustGlow(g, 0.5);
      });
    },
    true,
  );

  tsw.addEventListener("mouseenter", () => {
    const allCardGlow = document.querySelectorAll(".glow");
    allCardGlow.forEach((g) => {
      adjustGlow(g, 0.5);
    });
  });

  tsw.addEventListener("mouseleave", () => {
    const allCardGlow = document.querySelectorAll(".glow");
    allCardGlow.forEach((g) => {
      adjustGlow(g, 1);
    });
  });
}

function slowCursorMoment() {
  if (window.innerWidth < 1024) return;

  const body = document.body;
  const target = document.querySelector("#hero-section-center");
  const tbwlt = document.querySelector("#text-bw-line-top");
  const tbwlb = document.querySelector("#text-bw-line-bottom");

  const maxOffset = 45;

  const motionEase = {
    duration: 1.2,
    ease: "power3.out",
    overwrite: "auto", // kills the previous tween
  };

  function move(current, intensity = 1, min = -maxOffset, max = maxOffset) {
    return gsap.utils.clamp(min, max, current * intensity);
  }

  function ym(e, min) {
    return (e.clientY / window.innerHeight) * (maxOffset - min) + min;
  }

  body.addEventListener("mousemove", (e) => {
    if (!isStAnimationEnded) return;

    // position relative to viewport center
    const xOffset = (e.clientX / window.innerWidth - 0.5) * 2 * maxOffset;
    const yOffset = (e.clientY / window.innerHeight - 0.5) * 2 * maxOffset;

    // hero section center
    gsap.to(target, {
      x: move(xOffset, 1),
      y: move(xOffset, 1),
      ...motionEase,
    });

    // slow cursor moment
    gsap.to(".slow-moment", {
      x: move(xOffset, 1 / 2),
      y: move(yOffset, 1 / 2),
      ...motionEase,
    });

    gsap.to(".slow-moment-y", {
      y: move(ym(e, 0), 1 / 2, 0),
      ...motionEase,
    });

    gsap.to("#con-line-aboutme", {
      height: move(ym(e, 25), 64 / 45, 25, 64),
      ...motionEase,
    });

    gsap.to(["#arr-stick-nextlearningsec", "#arr-stick-aboutme"], {
      attr: {
        d: `M49.5022 -${Math.floor(move(ym(e, 0), 0.8, 0))}.311897C54.3114 48.5808 29.2247 73.8977 2.10856 73.7174`,
      },
      ...motionEase,
    });

    const vectorResultant = Math.sqrt(
      (xOffset + 60) ** 2 + (yOffset + 60) ** 2,
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

function rotateLines() {
  const canRotate = document.querySelectorAll(".c-rotate");

  let trackPos = false;
  let cParent, iniAngle, prefix;
  let hinge = [];
  let stPoint = [];

  document.body.addEventListener("mouseup", () => {
    trackPos = false;

    gsap.to(cParent, { rotate: -iniAngle, duration: 0.5, ease: "power2.out" });

    gsap.to(`.${prefix}-rotate`, {
      rotate: iniAngle,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  canRotate.forEach((domEL) => {
    domEL.addEventListener("mousedown", (e) => {
      trackPos = true;
      stPoint = [e.clientX, e.clientY];
      cParent = domEL.closest(".c-parent");

      if (cParent) {
        let cParentPos = cParent.getBoundingClientRect();
        iniAngle = Number(cParent.getAttribute("data-initial-angle"));
        prefix = cParent.getAttribute("data-prefix");

        hinge = [
          (cParentPos.width + cParentPos.left) / 2,
          cParentPos.height / 2 + cParentPos.top,
        ];
      }
    });
  });

  document.body.addEventListener("mousemove", (e) => {
    if (!trackPos) return;

    let locus = [e.clientX, e.clientY];

    let angle = angleBetween(hinge, stPoint, locus);

    angle = angle + iniAngle;

    gsap.set(cParent, { rotate: -angle });

    gsap.set(`.${prefix}-rotate`, {
      rotate: angle,
    });
  });
}

function onClickEffect() {
  const blobHTML = `<div class="bg-[#000275] blur-[10px] rounded-full fixed w-20 h-20 select-none -z-1"></div>`;

  document.body.addEventListener("click", (e) => {
    const tempNode = document.createElement("div");
    tempNode.innerHTML = blobHTML;
    const blobNode = tempNode.children[0];

    document.body.appendChild(blobNode);

    // subtract half the width or height from the click coords to center the blob
    gsap.set(blobNode, { scale: 0, left: e.clientX - 40, top: e.clientY - 40 });

    gsap.to(blobNode, {
      scale: 2,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.5,
      ease: "power3.out",

      onComplete() {
        // remove from html
        blobNode.remove();
      },
    });
  });
}

export let isSoundOn;
function controlSound() {
  const ctrlSoundBtn = document.querySelector("#ctrl-sound-nav");
  const waveSvgWrapper = document.querySelector("#wave-svg-nav");

  const bgMusic = document.querySelector("#bg-music");
  bgMusic.volume = 0.15;

  isSoundOn = false;

  ctrlSoundBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;

    if (!isSoundOn) {
      bgMusic.pause();

      iniWaveAnima(false);
    } else {
      iniWaveAnima();
      waveRunAnima();

      bgMusic.play();
    }
  });
}
