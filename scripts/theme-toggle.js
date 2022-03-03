// array of theme objects with id and display
const themes = [
  {
    "id": "theme-maki",
    "display": "Maki"
  },
  {
    "id": "theme-dark",
    "display": "Dark"
  }
];

const body = document.body;
const elementThemes = document.getElementById("themes");

function switchToTheme(newTheme) {
  for (let i = 0; i < themes.length; i++) {
    if (themes[i].id !== newTheme.id) {
      body.classList.remove(themes[i].id);
    }
  }
  if (!body.classList.contains(newTheme.id)) {
    body.classList.add(newTheme.id);
  }
}

// input: object of the themes array
function createElementTheme(theme) {
  const elementLI = document.createElement("li");
  const elementAnchor = document.createElement("a");
  elementAnchor.classList.add("dropdown-item", `${theme.id}`);
  elementAnchor.id = theme.id;
  elementAnchor.innerHTML = theme.display;
  elementLI.appendChild(elementAnchor);
  elementThemes.appendChild(elementLI);
  const elementTheme = document.getElementById(`${theme.id}`);
  elementTheme.addEventListener("click", () => {
    switchToTheme(theme);
  });
}

for (let i = 0; i < themes.length; i++) {
  createElementTheme(themes[i]);
}

// detects dark mode when loading the page
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  // dark mode
  document.getElementById(`${themes[1].id}`).click();
} else {
  // light mode
  document.getElementById(`${themes[0].id}`).click();
}

// page changes theme when the device's dark mode settings change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (event.matches) {
      // dark mode
      document.getElementById(`${themes[1].id}`).click();
    } else {
      // light mode
      document.getElementById(`${themes[0].id}`).click();
    }
  });
