const files = {
  "socials.txt": [
    toLink("Github", "https://github.com/idandrori555"),
    toLink("Instagram", "https://instagram.com/idan.drori"),
    toLink("LinkedIn", "https://www.linkedin.com/in/idan-drori-5836ab198/"),
  ].join("\n"),
};

const output = document.querySelector("output");
output.innerText += "\n";

/**
 * Creates a hyperlink.
 * @param {string} text - The display text.
 * @param {string} url - The target URL.
 * @returns {string} HTML string for a link.
 */
function toLink(text, url) {
  return `<a target="_blank" href="${url}">${text}</a>`;
}

/**
 * Logs a message to the output.
 * @param {string} msg - The message to log.
 * @param {number} delay - Delay in ms between characters (optional).
 * @param {boolean} instant - If true, skip the typing effect.
 */
const log = (msg, delay = 15, instant = false) => {
  msg = msg.replaceAll("\n", "<br>");

  if (instant) {
    output.innerHTML = msg;
    return;
  }

  let index = 0;
  let str = "";

  const typeChar = () => {
    if (index < msg.length) {
      str += msg[index++];
      output.innerHTML = str;
      setTimeout(typeChar, delay);
    }
  };

  typeChar();
};

/**
 * Logs an error message.
 * @param {string} error - The error message.
 */
const showError = (error) => {
  log(`${error}\n`);
};

// List of commands
const commands = {
  clear: () => {
    output.innerHTML = "";
  },

  help: () => {
    const helpText = Object.keys(commands)
      .map((cmd) => `- ${cmd}`)
      .join("\n");
    log(`List of useful commands:\n${helpText}`);
  },

  whoami: () => {
    log(
      "Hey, I'm Idan, a 16-year-old full-stack developer from Israel.\nI build cool stuff on both the server side and what you see on the website.",
    );
  },

  projects: () => {
    log(
      toLink("Projects here (click)", "http://idandrori555.github.io", 0, true),
    );
  },

  pwd: () => {
    log("/");
  },

  ip: async () => {
    const ip = await (await fetch("https://ifconfig.me/ip")).text();
    log(`IP: ${ip}`);
  },

  ls: () => {
    log(Object.keys(files).join("\n"));
  },

  cat: (args) => {
    if (args.length <= 1) {
      return showError("Usage: cat (filename)");
    }

    const filename = args[1];
    if (!files[filename]) {
      return showError(`'${filename}' file not found.`);
    }

    log(files[filename], 0, true);
  },

  tech: () => {
    log(
      "Technologies I use:\n- TypeScript\n- Express\n- Vite \n- SQLite\n- Firebase\n- Deno",
    );
  },
};

const legalCommands = Object.keys(commands);

/**
 * Executes a command if valid.
 * @param {string} inputCommand - The full command input.
 */
const executeCommand = (inputCommand) => {
  const args = inputCommand
    .trim()
    .split(" ")
    .map((arg) => arg.toLowerCase());
  const command = args[0];

  if (!legalCommands.includes(command)) {
    return showError("Invalid command.");
  }

  if (command === "clear") return commands.clear();

  output.hidden = false;
  commands[command]?.(args);
};

// Input handler
document.documentElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    executeCommand(input.value ?? "");
    input.value = "";
  }
});

// Init message
window.onload = () => {
  log("Type 'help' to begin", 40);
};
