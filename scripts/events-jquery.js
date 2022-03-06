let offset;

// detects screen size when loading the page
if (window.matchMedia && window.matchMedia("(max-width: 1023px)").matches) {
  // large offset
  offset = "-30%";
} else {
  // small offset
  offset = "-15%";
}

// dropdown changes offset with the screen size
window.matchMedia("(max-width: 1023px)").addEventListener("change", (event) => {
  if (event.matches) {
    // large offset
    offset = "-30%";
  } else {
    // small offset
    offset = "-15%";
  }
});

const toggleDropdown = (event) => {
  const $dropdown = $(event.currentTarget).next();
  let display = $dropdown.css("display") === "none";
  if (display) {
    $dropdown.show().attr("aria-hidden", "false").animate({ right: "0" }, 200);
    $(event.currentTarget).attr("aria-expanded", "true");
  } else if (!display) {
    $dropdown.animate({ right: offset }, 200);
    setTimeout(() => {
      $dropdown.hide().attr("aria-hidden", "true");
      $(event.currentTarget).attr("aria-expanded", "false");
    }, 200);
  }
};

$(document).ready(function() {

  // Maki's star toggles the themes dropdown list
  // click anywhere else to hide the themes dropdown list
  $("#themes").animate({ right: offset }, 0);
  $("#themes-button").attr("tabindex", "0").attr("role", "button").attr("aria-expanded", "false");
  $("#themes-button").addClass("loaded").on("click", toggleDropdown).on("keydown", (event) => {
    if (event.key === "Enter") toggleDropdown(event)
  });
  $(document).on("click", event => {
    const $outerContainer = $(".dropdown-right").parent();
    if (!$(event.target).closest($outerContainer).length) {
      $(".dropdown-right").animate({ right: offset }, 200);
      setTimeout(() => {
        $(".dropdown-right").hide().attr("aria-hidden", "true");
        $(".dropdown-right").prev().attr("aria-expanded", "false");
      }, 200);
    }
  });
});
