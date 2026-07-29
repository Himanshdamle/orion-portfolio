import gsap from "gsap";

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min, max, decimals = 2) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

export function giveNode(str) {
  const tempNode = document.createElement("div");
  tempNode.innerHTML = str.trim();

  return tempNode.firstElementChild;
}

export function angleBetween(hinge, p1, p2) {
  const AB = {
    x: hinge[1] - p1[1],
    y: hinge[0] - p1[0],
  };

  const AC = {
    x: hinge[1] - p2[1],
    y: hinge[0] - p2[0],
  };

  const angleAB = Math.atan2(AB.y, AB.x);
  const angleAC = Math.atan2(AC.y, AC.x);

  let angle = angleAC - angleAB;
  angle = (angle + 2 * Math.PI) % (2 * Math.PI);
  angle = (angle * 180) / Math.PI;

  return angle;
}
