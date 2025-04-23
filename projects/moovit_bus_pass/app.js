const container = document.getElementById("container");
const dateTimeP = document.getElementById("dateTime");
const mainText = document.querySelector("h1");

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}

function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}.${month}.${year}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const isMobile =
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768;
  const mobileWarning = document.getElementById("mobile-warning");
  if (!isMobile) {
    mobileWarning.style.display = "block";
    return;
  }

  // ON MOBILE:
  let currentTime = getCurrentTime();
  let currentDate = getCurrentDate();

  dateTimeP.innerText = `${currentTime} | ${currentDate}`;

  setInterval(() => {
    currentTime = getCurrentTime();
    currentDate = getCurrentDate();

    dateTimeP.innerText = `${currentTime} | ${currentDate}`;

    console.log("updated");
  }, 10_000);

  document.addEventListener("click", async function (event) {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Safari
      await document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // Edge
      await document.documentElement.msRequestFullscreen();
    }

    container.style.display = "flex";
    mainText.style.display = "none";
  });
});
