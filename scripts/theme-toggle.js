const { body } = document;

// detects dark mode when loading the page
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  // dark mode
  body.classList.add("dark-mode");
} else {
  // light mode
  body.classList.remove("dark-mode");
}

// page changes theme when the device's dark mode settings change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (event.matches) {
    // dark mode
    body.classList.add("dark-mode");
  } else {
    // light mode
    body.classList.remove("dark-mode");
  }
});

// array of theme objects with id and display
const themes = [
  {
    "id": "theme-maki",
    "display": "Maki"
  },
  {
    "id": "theme-dark",
    "display": "Dark"
  },
  {
    "id": "theme-yousolo",
    "display": "YouSolo"
  },
  {
    "id": "theme-dracula",
    "display": "Dracula"
  }
];

// manage the themes array
const switchToTheme = function(newTheme) {
  for (let i = 0; i < themes.length; i++) {
    if (themes[i].id !== newTheme.id) {
      body.classList.replace(themes[i].id, newTheme.id);
    }
  }
  if (!body.classList.contains(newTheme.id)) {
    body.classList.add(newTheme.id);
  }
}

const clearThemes = function() {
  for (let i = 0; i < themes.length; i++) {
    body.classList.remove(themes[i].id);
  }
}

// manage the local storage
const addThemeStorage = function(theme) {
  localStorage.setItem("theme", theme.id);
  switchToTheme(theme);
}

const clearThemeStorage = function() {
  localStorage.removeItem("theme");
  clearThemes();
}

const elementThemes = document.getElementById("themes");

// input: object of the themes array
const createElementTheme = function(theme) {
  const elementLI = document.createElement("li");
  const elementButton = document.createElement("button");
  elementButton.classList.add("dropdown-item", `${theme.id}`);
  elementButton.id = theme.id;
  elementButton.innerHTML = theme.display;
  elementButton.setAttribute("tabindex", "0");
  elementButton.setAttribute("role", "button");
  elementLI.appendChild(elementButton);
  elementThemes.appendChild(elementLI);
  const elementTheme = document.getElementById(`${theme.id}`);
  elementTheme.addEventListener("click", () => {
    addThemeStorage(theme);
  });
  elementTheme.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addThemeStorage(theme);
    }
  });
}

// create the "Clear themes" button after the themes
const createElementClear = function() {
  const elementLI = document.createElement("li");
  const elementButton = document.createElement("button");
  elementButton.classList.add("dropdown-item");
  elementButton.id = "clear-themes";
  elementButton.innerHTML = "Clear themes";
  elementButton.setAttribute("tabindex", "0");
  elementButton.setAttribute("role", "button");
  elementLI.appendChild(elementButton);
  elementThemes.appendChild(elementLI);
  const elementClear = document.getElementById("clear-themes");
  elementClear.addEventListener("click", () => {
    clearThemeStorage();
  });
  elementClear.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      clearThemeStorage();
    }
  });
}

// function calls
for (let i = 0; i < themes.length; i++) {
  createElementTheme(themes[i]);
  if (localStorage.getItem("theme") === themes[i].id) {
    switchToTheme(themes[i]);
  }
}
createElementClear();
