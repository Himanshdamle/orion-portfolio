import gsap from "gsap";

function stGradient() {
  gsap.to(".bg-gradient", {
    backgroundSize: "100% 100%",
    duration: 4,
    ease: "power2.out",
  });
}
stGradient();

const stAnimationBox = document.querySelector("#st-animation-box");
function stCounter() {
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
stCounter();

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
  gsap.to("#content", {
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
          document.querySelector(".st-counter").remove();
        },
      });
    },
  });
}
