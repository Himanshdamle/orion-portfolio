import { menuAnimation } from "./animation";

export function setupAllEvents() {
  menu();
}

function menu() {
  const menuBtn = document.querySelector("#menu-btn");

  let isOpen = false;
  menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    menuAnimation(isOpen);
  });
}
