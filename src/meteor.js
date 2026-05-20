import { randomFloat, randomInt } from "./core";
import gsap from "gsap";

const display = document.querySelector("#meteor-shower-display");

function spawnMeteor() {
  const randomWidth = randomInt(80, 150);
  const randomScale = randomFloat(1.8, 3);
  const html = `
    <div
      class="bg-linear-to-r from-[#000275] to-[#00027500] blur-[10px] rounded-full fixed"
    ></div>
  `;
  const tempNode = document.createElement("div");
  tempNode.innerHTML = html;
  const meteor = tempNode.children[0];

  const randPosition = randomInt(100, window.innerWidth);

  gsap.set(meteor, {
    x: randPosition,
    y: -randomWidth * Math.sin(Math.PI / 4),

    width: randomWidth,
    height: 20,
    scale: randomScale,
    rotate: -45,
    transformOrigin: "center center",
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
