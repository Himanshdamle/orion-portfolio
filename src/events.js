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
} from "./animation";
import gsap from "gsap";
import { locoScroll } from "./scroll.js";
import { deepSwooshSoundEffect } from "./soundEffects.js";

export function setupAllEvents() {
  menu();
  scrollToMenu();
  onScrollNavControl();

  techStackSlider();
  hoverOnSkill();
  slowCursorMoment();

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

    menuAnimation(isMenuOpen);

    blurOverlay(isMenuOpen, e, () => {
      if (!scrollToFunc) return;

      locoScroll.scrollTo(targetSection, {
        offset: 0,
        duration: 1.5,

        onComplete: () => (scrollToFunc = false),
      });
    });
  });
}

let lastBtn = document.querySelector("[data-menu-target='#home'");
function scrollToMenu() {
  document.querySelectorAll("[data-menu-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      targetSection = btn.getAttribute("data-menu-target");
      const seq = btn.getAttribute("data-seq");

      const tl = gsap.timeline({
        onComplete: () => {
          scrollToFunc = true;
          menuBtn.click();
        },
      });

      tl.to("#menu-slider", {
        top: `${20 * Number(seq)}%`,
        duration: 0.7,
        ease: "power3.out",
      })

        .to(lastBtn, { color: "#B9BBFF", fontWeight: 400 }, "-=0.5")
        .to(btn, { color: "#8385FF", fontWeight: 600 }, "<<");

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
  const tsw = document.querySelector("#tech-stack-wrapper");

  function adjustGlow(g, o) {
    if (!g || !o) return;

    gsap.to(g, {
      opacity: o,
      duration: 0.5,
    });
  }

  tsw.addEventListener(
    "mousemove",
    (e) => {
      const card = e.target.closest(".tech-skill-card");

      if (!card) return;

      const hoverGlow = card.querySelector(".glow");
      if (!hoverGlow) return;
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

  body.addEventListener("mousemove", (e) => {
    if (!isStAnimationEnded) return;

    // position relative to viewport center
    const xOffset = (e.clientX / window.innerWidth - 0.5) * 2 * maxOffset;
    const yOffset = (e.clientY / window.innerHeight - 0.5) * 2 * maxOffset;

    gsap.to(target, {
      x: gsap.utils.clamp(-maxOffset, maxOffset, xOffset),
      y: gsap.utils.clamp(-maxOffset, maxOffset, yOffset),
      ...motionEase,
    });

    gsap.to(".slow-moment", {
      x: gsap.utils.clamp(-maxOffset, maxOffset, xOffset) / 2,
      y: gsap.utils.clamp(-maxOffset, maxOffset, yOffset) / 2,
      ...motionEase,
    });

    const vectorResultant = Math.sqrt(
      (xOffset + 50) ** 2 + (yOffset + 50) ** 2,
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
