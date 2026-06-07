(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const label = toggle?.querySelector(".theme-toggle-label");
  const icon = toggle?.querySelector("[aria-hidden='true']");
  const storageKey = "lecture-summary-theme-editorial-v1";

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Theme switching still works when storage is unavailable.
    }
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (!toggle || !label || !icon) {
      return;
    }

    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "라이트 모드로 전환" : "다크 모드로 전환"
    );
    label.textContent = isDark ? "라이트 모드" : "다크 모드";
    icon.textContent = isDark ? "☀" : "☾";
  }

  const initialTheme = getSavedTheme() || "dark";

  applyTheme(initialTheme);

  toggle?.addEventListener("click", function () {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
})();
