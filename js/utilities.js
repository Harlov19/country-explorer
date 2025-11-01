//====Module import===//
import countries from "./countries.js";
import {fetchCountry} from "./API.js";

// ======== DOM ELEMENTS ========
const searchInput = document.querySelector(".search-input");
const liveSearchList = document.querySelector(".suggestions"); 
// ======== LIVE SEARCH FUNCTIONS ========


function handleSearch(name) {
  const countryName = name || searchInput.value.trim();
  if (!countryName) return;
  fetchCountry(countryName);
  searchInput.value = "";
  liveSearchList.innerHTML = ""; 
}
async function showLiveSearch(query) {
  const regex = new RegExp(`^${query}`, "i"); 
  const filtered = countries
  .filter((c) => regex.test(c))
  .slice(0, 7);
  liveSearchList.innerHTML = "";
  filtered.forEach((country) => {
    const li = document.createElement("li");
    li.textContent = country;
    li.className = "live-search";
    li.addEventListener("click", () => handleSearch(country));
    liveSearchList.appendChild(li);
  });
}

// ======== MAP FUNCTIONS ========
let map;
function drawMap(latlng, name) {
  const [lat, lng] = latlng;

  if (!map) {
    map = L.map('map').setView([lat, lng], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
  } else {
    map.setView([lat, lng], 6);
  }

  L.marker([lat, lng]).addTo(map).bindPopup(`<b>${name}</b>`).openPopup();
}

// ======== TIME FUNCTIONS ========
function getLocalTime(timeZone) {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: convertToIANA(timeZone)
  }).format(now);
}

let timeInterval;

function showLocatime(timezones) {
  if (!timezones) return;
  const locatTimes = document.querySelector(".local-times");
  locatTimes.innerHTML = "";
  if (timeInterval) clearInterval(timeInterval);

  const renderTimes = () => {
    locatTimes.innerHTML = "";
    timezones.forEach((tz) => {
      const li = document.createElement("li");
      li.innerHTML = `${tz} - ${getLocalTime(tz)}`;
      locatTimes.appendChild(li);
    });
  };

  renderTimes();
  timeInterval = setInterval(renderTimes, 1000);
}

function convertToIANA(utcString) {
  if (utcString === "UTC") return "Etc/UTC";

  const match = utcString.match(/^UTC([+-]\d{2}):(\d{2})$/);
  if (match) {
    const [, hourStr, minStr] = match;
    const hour = parseInt(hourStr, 10);
    const min = parseInt(minStr, 10);
    const totalOffset = hour + (min >= 30 ? (hour >= 0 ? 1 : -1) : 0);
    const sign = totalOffset < 0 ? "+" : "-";
    return `Etc/GMT${sign}${Math.abs(totalOffset)}`;
  }

  return "Etc/UTC";
}

export {drawMap,showLocatime,showLiveSearch,handleSearch};