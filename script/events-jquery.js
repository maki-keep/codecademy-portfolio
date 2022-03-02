$(document).ready(function() {

  // Maki's star toggles the themes dropdown list
  // click anywhere else to hide the themes dropdown list
  $("#themes").animate({ right: "-15%" }, 0).hide().attr("aria-expanded", "false");
  $("#themes-button").css({ cursor: "pointer" }).on("click", (event) => {
    const $dropdown = $(event.currentTarget).next();
    let display = $dropdown.css("display") === "none";
    if (display) {
      $dropdown.show().animate({ right: "0" }, 200).attr("aria-expanded", "true");
    } else if (!display) {
      $dropdown.animate({ right: "-15%" }, 200);
      setTimeout(() => {
        $dropdown.hide().attr("aria-expanded", "false");
      }, 200);
    }
  });
  $(document).on("click", event => {
    const $outerContainer = $(".dropdown-right").parent();
    if (!$(event.target).closest($outerContainer).length) {
      $(".dropdown-right").animate({ right: "-15%" }, 200)
      setTimeout(() => {
        $(".dropdown-right").hide().attr("aria-expanded", "false");
      }, 200);
    }
  });
});
