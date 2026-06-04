import gsap from "gsap";

export function runAllAnima() {
  stGradient();
  stCounterAnima();

  infiniteScroll();
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

  const tl = gsap.timeline();
  ani = tl
    .set("#blur-overlay", {
      top: e.y,
      left: e.x,
      filter: "blur(30px)",
      opacity: 0.3,
    })
    .set("#menu-content", {
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.95,
      x: "-12%",
    })
    .to("#blur-overlay", {
      width: "100%",
      height: "100%",

      top: 0,
      left: 0,

      borderRadius: 0,
      opacity: 1,
      filter: "blur(0px)",

      duration: 0.7,
      ease: "power2.inOut",
    })
    .to(
      "#menu-content",
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x: 0,
        duration: 0.35,
      },
      "+=0.1",
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
