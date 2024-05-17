const hamMenu = document.querySelector(".hamburger");
const offScreen = document.querySelector(".offscreen-menu");

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("open");
    offScreen.classList.toggle("open");
});