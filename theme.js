const toggle = document.getElementById("theme-toggle");

// Decide theme based on local time
function getTimeBasedTheme() {
  const hour = new Date().getHours(); // local time
  return hour >= 22 || hour < 6 ? "dark" : "light";
}

// Apply theme
function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", theme);

  if (toggle) {
    toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

// On page load
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  // Use manually chosen theme if it exists
  applyTheme(savedTheme);
} else {
  // Otherwise auto-select based on time
  applyTheme(getTimeBasedTheme());
}

// Manual toggle, overrides auto
if (toggle) {
  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  });
}
