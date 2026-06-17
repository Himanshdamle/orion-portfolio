import gsap from "gsap";

export function runAllAnima() {
  stGradient();
  stCounterAnima();

  infiniteScroll();

  gsap.set(".ts-overlay-b", { overflow: "hidden" });
  gsap.set(".ts-box-b", { x: "-100%" });
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

function revealContent() {
  gsap.to("#home", {
    opacity: 1,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",

    onComplete() {
      gsap.to("#st-anima-glow", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",

        onComplete() {
          stCounter.remove();
        },
      });
    },
  });
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

let ani;
export function blurOverlay(open, e) {
  if (!open) {
    ani.reverse();
    return;
  }

  const tl = gsap.timeline({
    duration: 0.35,
    ease: "power2.in",
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
export function moveTsSlider(isMoveLeft) {
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
}

let tl1;
export function slideBackendTs() {
  if (tl1) {
    tl1.reverse();
    return;
  }

  gsap.set(".ts-overlay-b", { overflow: "hidden" });
  gsap.set(".ts-box-b", { x: "-100%" });
  gsap.set(".ts-box-glow-b", { opacity: 0 });

  tl1 = gsap.timeline({
    onReverseComplete() {
      tl1 = null;
    },
  });

  tl1
    .to(".ts-box-b", {
      x: 0,
      duration: 0.5,
      ease: "power1.out",

      delay: 0.5,
    })
    .set(".ts-overlay-b", { overflow: "unset" })
    .to(".ts-box-glow-b", {
      opacity: 1,
      duration: 0.3,
    });
}

let tl2;
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
    .to(".ts-box-glow", {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
    })
    .set(".ts-overlay", { overflow: "hidden" })
    .to(".ts-box", {
      x: "100%",
      duration: 0.5,
      ease: "power1.in",
    });
}
