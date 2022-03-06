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

$(document).ready(function() {

  // Maki's star toggles the themes dropdown list
  // click anywhere else to hide the themes dropdown list
  $("#themes").animate({ right: offset }, 0).hide();
  $("#themes-button").attr("aria-expanded", "false");
  $("#themes-button").addClass("loaded").on("click", (event) => {
    const $dropdown = $(event.currentTarget).next();
    let display = $dropdown.css("display") === "none";
    if (display) {
      $dropdown.show().animate({ right: "0" }, 200);
      $(event.currentTarget).attr("aria-expanded", "true");
    } else if (!display) {
      $dropdown.animate({ right: offset }, 200);
      setTimeout(() => {
        $dropdown.hide();
        $(event.currentTarget).attr("aria-expanded", "false");
      }, 200);
    }
  });
  $(document).on("click", event => {
    const $outerContainer = $(".dropdown-right").parent();
    if (!$(event.target).closest($outerContainer).length) {
      $(".dropdown-right").animate({ right: offset }, 200);
      setTimeout(() => {
        $(".dropdown-right").hide();
        $(".dropdown-right").prev().attr("aria-expanded", "false");
      }, 200);
    }
  });
});
