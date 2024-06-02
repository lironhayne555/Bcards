export function toggleDarkMode() {
  const isDark = getDarkMode();
  localStorage.setItem("isDark", JSON.stringify(!isDark));
}

export function getDarkMode() {
  return localStorage.getItem("isDark");
}
