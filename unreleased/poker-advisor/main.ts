// Type definitions
interface AnswerOption {
  answer: string;
  soundSrc: string;
}

type EasingFunction = (t: number) => number;
type AnimationCallback = (value: number) => void;

const ASSETS_PATH = "../assets";

// Constants for answers and sounds
const answers: AnswerOption[] = [
  { answer: "פולד רציני", soundSrc: `${ASSETS_PATH}/fold.mp3` },
  { answer: "קול בזריז", soundSrc: `${ASSETS_PATH}/call.mp3` },
  { answer: "ריס ימלך", soundSrc: `${ASSETS_PATH}/raise.mp3` },
];

// DOM element references
const askButton = document.getElementById("askButton") as HTMLButtonElement;
const buttonTextSpan = document.getElementById("buttonText") as HTMLSpanElement;
const askButtonGradient = document.getElementById(
  "askButtonGradient"
) as HTMLDivElement;
const answerDisplay = document.getElementById(
  "answerDisplay"
) as HTMLDivElement;
const currentAnswerText = document.getElementById(
  "currentAnswer"
) as HTMLParagraphElement;

// State variables
let isButtonDisabled = false;
let buttonText = "שאל את הקונכייה!";
let currentAnswer = "";

// make sounds array
const sounds: HTMLAudioElement[] = answers.map((a) => new Audio(a.soundSrc));

// Animation utility
function animateValue(
  startValue: number,
  endValue: number,
  duration: number,
  easingFn: EasingFunction,
  onUpdate: AnimationCallback,
  onComplete?: () => void
): void {
  let startTime: number | null = null;

  function step(currentTime: number) {
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

// Easing functions
const Easing: Record<string, EasingFunction> = {
  ease: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOut: (t) => t * (2 - t),
  easeIn: (t) => t * t,
};

function updateButtonState(): void {
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

const handleAsk = (): void => {
  currentAnswer = "";
  answerDisplay.style.opacity = "0";
  answerDisplay.style.transform = "translateY(20px)";
  currentAnswerText.textContent = "";

  isButtonDisabled = true;
  buttonText = "הקונכייה חושבת... 🤔";
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
      soundToPlay.volume = 1.0;
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
        buttonText = "שאל את הקונכייה! ♠️";
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
  }, 2000);
};

askButton.addEventListener("click", handleAsk);

globalThis.onload = () => {
  updateButtonState();
  askButton.disabled = false;
};
