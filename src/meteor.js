import { randomFloat, randomInt } from "./core";
import gsap from "gsap";

const display = document.querySelector("#meteor-shower-display");

function spawnMeteor() {
  const randomWidth = randomInt(80, 150);
  const randomScale = randomFloat(1.8, 3);
  const randomMeteor = randomInt(0, 1);

  const meteorHtml = [
    `
    <div
      class="bg-linear-to-r from-[#000275] to-[#00027500] blur-[10px] rounded-full fixed select-none"
    ></div>
  `,

    ` <div
        class="bg-linear-to-r from-[#B9BBFF] to-[#b9bbff00] fixed select-none"
      ></div>`,
  ];

  const tempNode = document.createElement("div");
  tempNode.innerHTML = meteorHtml[randomMeteor];
  const meteor = tempNode.children[0];

  const randPosition = randomInt(100, window.innerWidth);

  const isLineMetoer = randomMeteor == 1;

  gsap.set(meteor, {
    x: randPosition,
    y: -randomWidth * Math.sin(Math.PI / 4),

    width: randomWidth,
    height: isLineMetoer ? 1 : 20,
    scale: isLineMetoer ? 1 : randomScale,
    rotate: -45,
    transformOrigin: "center center",
    force3D: true,
  });

  display.appendChild(meteor);
  return { meteor, posX: randPosition, meteorWidth: randomWidth };
}

function animateMeteor(meteorInfo) {
  const duration = randomFloat(0.7, 3);

  const angle = (-45 * Math.PI) / 180;
  const distance =
    meteorInfo.posX + meteorInfo.meteorWidth * Math.cos(Math.PI / 4) + 100;

  gsap.to(meteorInfo.meteor, {
    x: `-=${distance}`,
    y: `+=${distance}`,
    opacity: 0.2,
    duration,

    onComplete() {
      meteorInfo.meteor.remove();
    },
  });
}

function randomInterval() {
  const randomSec = randomInt(1, 3) * 1000;

  setTimeout(() => {
    const meteorInfo = spawnMeteor();
    animateMeteor(meteorInfo);

    randomInterval();
  }, randomSec);
}

randomInterval();
