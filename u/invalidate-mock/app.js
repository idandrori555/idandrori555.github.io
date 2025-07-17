document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Element References ---
  const appContainer = document.getElementById("app-container");
  const unsupportedBrowser = document.getElementById("unsupported-browser");
  const micButton = document.getElementById("mic-button");
  const micIcon = document.getElementById("mic-icon");
  const stopIcon = document.getElementById("stop-icon");
  const interimTranscriptContainer = document.getElementById(
    "interim-transcript-container"
  );
  const interimTranscriptEl = document.getElementById("interim-transcript");
  const resultsList = document.getElementById("results-list");
  const placeholder = document.getElementById("placeholder");
  const apiKeyPrompt = document.getElementById("api-key-prompt");

  // Settings Modal Elements
  const settingsModal = document.getElementById("settings-modal");
  const settingsButton = document.getElementById("settings-button");
  const cancelSettingsButton = document.getElementById(
    "cancel-settings-button"
  );
  const saveSettingsButton = document.getElementById("save-settings-button");
  const apiKeyInput = document.getElementById("api-key-input");

  // Templates
  const resultItemTemplate = document.getElementById("result-item-template");
  const loadingItemTemplate = document.getElementById("loading-item-template");

  // --- State Variables ---
  let isListening = false;
  let apiKey = "";
  let recognition;

  // --- Icon SVGs ---
  const icons = {
    true: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    false: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    controversial: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  };

  const classificationClasses = {
    true: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
    },
    false: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
    },
    controversial: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
    },
  };

  // --- Speech Recognition Setup ---
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    appContainer.classList.add("hidden");
    unsupportedBrowser.classList.remove("hidden");
    unsupportedBrowser.classList.add("flex");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let finalTranscript = "";
    let currentInterim = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        currentInterim += event.results[i][0].transcript;
      }
    }
    interimTranscriptEl.textContent = currentInterim || "Listening...";
    if (finalTranscript.trim()) {
      handleFactCheck(finalTranscript.trim());
    }
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // Restart if it stops unexpectedly
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    if (event.error === "no-speech" || event.error === "network") {
      if (isListening) recognition.start();
    } else {
      toggleListen(); // Stop on more serious errors
    }
  };

  // --- Core Functions ---
  const toggleListen = () => {
    isListening = !isListening;
    if (isListening) {
      recognition.start();
      micButton.classList.remove(
        "bg-blue-600",
        "shadow-blue-500/30",
        "ring-blue-500/50"
      );
      micButton.classList.add(
        "bg-red-600",
        "shadow-red-500/30",
        "ring-red-500/50",
        "animate-pulse-strong"
      );
      micIcon.classList.add("hidden");
      stopIcon.classList.remove("hidden");
      interimTranscriptContainer.classList.remove("hidden");
      placeholder.classList.add("hidden");
    } else {
      recognition.stop();
      micButton.classList.add(
        "bg-blue-600",
        "shadow-blue-500/30",
        "ring-blue-500/50"
      );
      micButton.classList.remove(
        "bg-red-600",
        "shadow-red-500/30",
        "ring-red-500/50",
        "animate-pulse-strong"
      );
      micIcon.classList.remove("hidden");
      stopIcon.classList.add("hidden");
      interimTranscriptContainer.classList.add("hidden");
      if (resultsList.children.length === 1) {
        // only placeholder is there
        placeholder.classList.remove("hidden");
      }
    }
  };

  const handleFactCheck = async (statement) => {
    // Client-side check to ignore very short inputs immediately
    if (statement.trim().split(" ").length < 3) {
      console.log("Ignoring short input (less than 3 words):", statement);
      return; // Do nothing, don't show on screen
    }

    placeholder.classList.add("hidden");
    const resultId = `result-${Date.now()}`;

    // Add loading skeleton to UI
    const loadingClone = loadingItemTemplate.content.cloneNode(true);
    const loadingElement = loadingClone.firstElementChild;

    loadingElement.id = resultId;
    loadingElement.querySelector(
      ".statement-loading"
    ).textContent = `"${statement}"`;
    resultsList.prepend(loadingElement);
    resultsList.scrollTop = 0;

    let apiResult;
    if (!apiKey) {
      apiResult = {
        is_statement: true, // Force display of the error message
        classification: "Controversial",
        reason:
          "Please set your Gemini API key in the settings to use the fact-checker.",
        statement,
      };
    } else {
      try {
        const prompt = `respond shortly as possible without disregarding any details. Analyze the following text: "${statement}". First, determine if it is a declarative statement that can be fact-checked. If it is not a statement (e.g., it's a question, command, or gibberish), respond with a JSON object containing only this: { "is_statement": false }. If it IS a statement, fact-check it and respond ONLY with a JSON object like this: { "is_statement": true, "classification": "...", "reason": "...", "statement": "..." }.`;
        const payload = {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                is_statement: { type: "BOOLEAN" },
                classification: { type: "STRING" },
                reason: { type: "STRING" },
                statement: { type: "STRING" },
              },
              required: ["is_statement"],
            },
          },
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();
        apiResult = JSON.parse(result.candidates[0].content.parts[0].text);
      } catch (error) {
        console.error("Error with Gemini API:", error);
        apiResult = {
          is_statement: true, // Force display of the error message
          classification: "Controversial",
          reason:
            "Could not connect to the fact-checking service. Please check your API key and network connection.",
          statement,
        };
      }
    }

    const elementToProcess = document.getElementById(resultId);

    if (apiResult && apiResult.is_statement) {
      // It's a statement, so replace skeleton with actual result
      updateResultInDOM(resultId, apiResult);
    } else {
      // It's not a statement, remove the loading skeleton
      if (elementToProcess) {
        elementToProcess.remove();
      }
      console.log("Ignoring non-statement:", statement);
    }
  };

  const updateResultInDOM = (resultId, data) => {
    const resultElement = document.getElementById(resultId);
    if (!resultElement) return;

    const clone = resultItemTemplate.content.cloneNode(true);
    const newElement = clone.firstElementChild;

    const classification = data.classification.toLowerCase();
    const classes =
      classificationClasses[classification] ||
      classificationClasses.controversial;

    newElement.classList.add(classes.bg, classes.border);
    newElement.querySelector(".statement").textContent = `"${data.statement}"`;
    newElement.querySelector(".classification").textContent =
      data.classification;
    newElement.querySelector(".classification").classList.add(classes.text);
    newElement.querySelector(".icon").innerHTML =
      icons[classification] || icons.controversial;
    newElement.querySelector(".icon").classList.add(classes.text);
    newElement.querySelector(".reason").textContent = data.reason;

    resultElement.replaceWith(newElement);
  };

  // --- Settings Modal Logic ---
  const toggleSettingsModal = (show) => {
    if (show) {
      settingsModal.classList.remove("hidden");
    } else {
      settingsModal.classList.add("hidden");
    }
  };

  settingsButton.addEventListener("click", () => toggleSettingsModal(true));
  cancelSettingsButton.addEventListener("click", () =>
    toggleSettingsModal(false)
  );
  saveSettingsButton.addEventListener("click", () => {
    apiKey = apiKeyInput.value;
    localStorage.setItem("gemini-api-key", apiKey);
    toggleSettingsModal(false);
    checkApiKeyPrompt();
  });

  const checkApiKeyPrompt = () => {
    if (!apiKey) {
      apiKeyPrompt.classList.remove("hidden");
    } else {
      apiKeyPrompt.classList.add("hidden");
    }
  };

  // --- Initialization ---
  micButton.addEventListener("click", toggleListen);

  // Load API key from localStorage on start
  const storedKey = localStorage.getItem("gemini-api-key");
  if (storedKey) {
    apiKey = storedKey;
    apiKeyInput.value = storedKey;
  }
  checkApiKeyPrompt();
});
