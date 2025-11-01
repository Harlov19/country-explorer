//====Module import===//
import {showLiveSearch,handleSearch} from "./utilities.js";
// ======== DOM ELEMENTS ========
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// ======== EVENT LISTENERS ========
searchBtn.addEventListener("click", ()=>{
   const query = searchInput.value.trim();
   if(!query) return;
  handleSearch(query)

});
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    liveSearchList.innerHTML = "";
    return;
  }
  await showLiveSearch(query);
});



//=========TOGGLING THEME=====//
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
  themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const isLight = body.classList.contains("light-theme");

  themeToggle.innerHTML = isLight
    ? `<i class="fa-solid fa-sun"></i>`
    : `<i class="fa-solid fa-moon"></i>`;

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

