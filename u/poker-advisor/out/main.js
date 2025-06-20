var ASSETS_PATH = "../assets";
var answers = [
  {
    answer: "\u05E4\u05D5\u05DC\u05D3 \u05E8\u05E6\u05D9\u05E0\u05D9",
    soundSrc: `${ASSETS_PATH}/fold.mp3`,
  },
  {
    answer: "\u05E7\u05D5\u05DC \u05D1\u05D6\u05E8\u05D9\u05D6",
    soundSrc: `${ASSETS_PATH}/call.mp3`,
  },
  {
    answer: "\u05E8\u05D9\u05E1 \u05D9\u05DE\u05DC\u05DA",
    soundSrc: `${ASSETS_PATH}/raise.mp3`,
  },
];
var askButton = document.getElementById("askButton");
var buttonTextSpan = document.getElementById("buttonText");
var askButtonGradient = document.getElementById("askButtonGradient");
var answerDisplay = document.getElementById("answerDisplay");
var currentAnswerText = document.getElementById("currentAnswer");
var isButtonDisabled = false;
var buttonText =
  "\u05E9\u05D0\u05DC \u05D0\u05EA \u05D4\u05E7\u05D5\u05E0\u05DB\u05D9\u05D9\u05D4!";
var currentAnswer = "";
var sounds = answers.map((a) => new Audio(a.soundSrc));
function animateValue(
  startValue,
  endValue,
  duration,
  easingFn,
  onUpdate,
  onComplete
) {
  let startTime = null;
  function step(currentTime) {
    if (startTime === null) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = easingFn(progress);
    onUpdate(startValue + (endValue - startValue) * easedProgress);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onComplete?.();
    }
  }
  requestAnimationFrame(step);
}
var Easing = {
  ease: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOut: (t) => t * (2 - t),
  easeIn: (t) => t * t,
};
function updateButtonState() {
  askButton.disabled = isButtonDisabled;
  buttonTextSpan.textContent = buttonText;
  askButtonGradient.classList.toggle(
    "ask-button-gradient-enabled",
    !isButtonDisabled
  );
  askButtonGradient.classList.toggle(
    "ask-button-gradient-disabled",
    isButtonDisabled
  );
}
var handleAsk = () => {
  currentAnswer = "";
  answerDisplay.style.opacity = "0";
  answerDisplay.style.transform = "translateY(20px)";
  currentAnswerText.textContent = "";
  isButtonDisabled = true;
  buttonText =
    "\u05D4\u05E7\u05D5\u05E0\u05DB\u05D9\u05D9\u05D4 \u05D7\u05D5\u05E9\u05D1\u05EA... \u{1F914}";
  updateButtonState();
  animateValue(1, 0.95, 100, Easing.easeOut, (value) => {
    askButton.style.transform = `scale(${value})`;
  });
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * answers.length);
    const { answer } = answers[randomIndex];
    const soundToPlay = sounds[randomIndex];
    currentAnswer = answer;
    currentAnswerText.textContent = currentAnswer;
    try {
      soundToPlay.volume = 1;
      soundToPlay.currentTime = 0;
      soundToPlay
        .play()
        .catch((err) => console.error("Error playing sound:", err));
    } catch (err) {
      console.error("Error playing answer sound:", err);
    }
    let animationsCompleted = 0;
    const totalAnimations = 2;
    const onAnimationComplete = () => {
      animationsCompleted++;
      if (animationsCompleted === totalAnimations) {
        isButtonDisabled = false;
        buttonText =
          "\u05E9\u05D0\u05DC \u05D0\u05EA \u05D4\u05E7\u05D5\u05E0\u05DB\u05D9\u05D9\u05D4! \u2660\uFE0F";
        updateButtonState();
      }
    };
    animateValue(
      0,
      1,
      500,
      Easing.easeIn,
      (value) => {
        answerDisplay.hidden = false;
        answerDisplay.style.opacity = `${value}`;
        answerDisplay.style.transform = `translateY(${20 * (1 - value)}px)`;
      },
      onAnimationComplete
    );
    animateValue(
      0.95,
      1,
      200,
      Easing.easeIn,
      (value) => {
        askButton.style.transform = `scale(${value})`;
      },
      onAnimationComplete
    );
  }, 2e3);
};
askButton.addEventListener("click", handleAsk);
globalThis.onload = () => {
  updateButtonState();
  askButton.disabled = false;
};
