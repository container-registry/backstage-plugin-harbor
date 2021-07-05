export function getTheme() {
  const localTheme = window.localStorage.getItem("theme");
  let theme: string = "light";
  if (localTheme === "dark") {
    theme = localTheme;
  }

  return theme;
}
