document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const offCanvas = document.getElementById("off-canvas");

  if (menuIcon && offCanvas) {
    menuIcon.addEventListener(
      "click",
      function () {
        menuIcon.classList.toggle("close");
        offCanvas.classList.toggle("toggled");
      },
      false,
    );
  }

  // Open Twitter/share in a Pop-Up
  const popup = document.querySelector(".popup");
  if (!popup) {
    return;
  }

  popup.addEventListener("click", function (e) {
    e.preventDefault();
    const width = 575;
    const height = 400;
    const left = (document.documentElement.clientWidth - width) / 2;
    const top = (document.documentElement.clientHeight - height) / 2;
    const url = this.href;
    const opts =
      "status=1" +
      ",width=" +
      width +
      ",height=" +
      height +
      ",top=" +
      top +
      ",left=" +
      left;

    window.open(url, "twitter", opts);

    return false;
  });
});
