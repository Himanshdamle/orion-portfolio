const canvas = document.querySelector("#trail");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const points = [];

window.addEventListener("mousemove", (e) => {
  points.push({
    x: e.clientX,
    y: e.clientY,
    life: 0.7,
  });
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < points.length; i++) {
    points[i].life -= 0.009;
  }

  while (points.length && points[0].life <= 0) {
    points.shift();
  }

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];

    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 2, 117, ${p2.life})`;
    ctx.lineWidth = 35 * p2.life;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}

animate();
