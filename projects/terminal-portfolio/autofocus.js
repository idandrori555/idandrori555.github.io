const input = document.getElementById("input");

/**
 * Focuses the input field.
 */
const focus = () => input.focus();

document.documentElement.addEventListener("click", () => {
  focus();
});