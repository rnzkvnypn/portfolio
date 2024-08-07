const filterCategory = document.querySelector(".works-nav");
const filterItems = document.querySelectorAll(".work");
const previewBox = document.querySelector(".preview-box");
const previewContent = previewBox.querySelector(".image-box");
const closeIcon = previewBox.querySelector(".close");
const shadow = document.querySelector(".shadow");

let currentIndex = 0;
let filteredItems = [];

// Event listeners
window.onload = () => {
  filterCategory.addEventListener("click", handleFilterClick);
  filterItems.forEach(item => item.addEventListener("click", handleItemClick));
  document.querySelectorAll(".previous, .next").forEach(btn => btn.addEventListener("click", () => updatePreview(btn.classList.contains("previous") ? -1 : 1)));
  window.addEventListener("keydown", handleKeyPress);

  // Initial setup: simulate click on 'all' filter
  filterCategory.querySelector(".category[data-name='all']").click();
};

function handleFilterClick(event) {
  if (event.target.classList.contains("category")) {
    const filterName = event.target.getAttribute("data-name");
    toggleActiveClass(event.target, filterCategory.querySelectorAll(".category"));

    updateFilteredItems(filterName);
    updateVisibility();
    currentIndex = 0; // Reset current index after filtering
  }
}

function handleItemClick() {
  if (!this.classList.contains("hide")) {
    currentIndex = filteredItems.indexOf(this);
    updatePreview(0);
    openPreview();
  }
}

function handleKeyPress(event) {
  if (event.key === "Escape") closePreview();
  else if (event.key === "ArrowLeft" || event.key === "ArrowRight") updatePreview(event.key === "ArrowLeft" ? -1 : 1);
}

function toggleActiveClass(target, elements) {
  elements.forEach(element => element.classList.remove("active"));
  target.classList.add("active");
}

function updateFilteredItems(filterName) {
  filteredItems = Array.from(filterItems).filter(item => filterName === "all" || item.getAttribute("data-name") === filterName);
}

function updateVisibility() {
  filterItems.forEach(item => {
    const shouldShow = filteredItems.includes(item);
    item.classList.toggle("show", shouldShow);
    item.classList.toggle("hide", !shouldShow);
  });
}

function updatePreview(direction) {
  if (filteredItems.length === 0) return; // Ensure there are items to preview
  currentIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
  showContentAtIndex(currentIndex);
}

function showContentAtIndex(index) {
  previewContent.innerHTML = filteredItems[index].innerHTML;
  const video = previewContent.querySelector("video");
  if (video) {
    video.muted = false;
    video.play();
  }
}

function openPreview() {
  previewBox.classList.add("show");
  shadow.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Event listeners for closing the modal
closeIcon.onclick = shadow.onclick = closePreview;

function closePreview() {
  const video = previewContent.querySelector("video");
  if (video) {
    video.pause();
    video.muted = true;
  }
  previewBox.classList.remove("show");
  shadow.classList.remove("show");
  document.body.style.overflow = "auto";
}