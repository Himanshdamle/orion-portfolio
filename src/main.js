import { runAllAnima } from "./animation";
import { giveTime } from "./core";
import { setupAllEvents } from "./events";
import { runAllScrollAnima } from "./scrollAnimations";

runAllAnima();
runAllScrollAnima();
setupAllEvents();

const hourTxt = document.querySelectorAll(".hour");
const minTxt = document.querySelectorAll(".min");
const ampm = document.querySelectorAll(".ampm");
const timeContextBox = document.querySelector("#time-context");

const timeContext = {
  "0-3": "Sleep? Yeah, probably. Surely. 🤡",
  "3-9": "Professional unconsciousness",
  "9-24": "Building cool sh*t like sleep isn't a thing",
};

function updateTime() {
  const time = giveTime();
  hourTxt.forEach((hour, index) => {
    hour.textContent = time.hour;

    minTxt[index].textContent = time.min;

    ampm[index].textContent = time.ampm.toUpperCase();

    const hour24 = time.hour24;
    let giveTimeContext = "---";

    if (0 <= hour24 && hour24 < 3) {
      giveTimeContext = timeContext["0-3"];
    } else if (3 <= hour24 && hour24 < 9) {
      giveTimeContext = timeContext["3-9"];
    } else {
      giveTimeContext = timeContext["9-24"];
    }

    timeContextBox.textContent = `( ${giveTimeContext} )`;
  });
}

const now = new Date();
let updateAfter = (60 - now.getSeconds()) * 1000;

setInterval(() => {
  updateAfter = 60 * 1000;
  updateTime();
}, updateAfter);
updateTime();
