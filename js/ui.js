import {drawMap,showLocatime} from "./utilities.js"

// ======== DOM ELEMENTS ========
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const countryDescriptions = document.querySelector(".descriptions");
const countryMap = document.querySelector(".map");


function renderCountry(country) {
  const languages = country.languages ? Object.values(country.languages).join(", ") : ["N/A"];

  countryDescriptions.innerHTML = `
    <div class="name">
      <h1>${country.name.common}</h1>
      <img src="${country.flags.svg}" class="flag" alt="Flag">
    </div>
    <p><strong>Name: </strong> ${country.name.official}</p>
    <p><strong>Capital city: </strong> ${country.capital.join(", ")}</p>
    <p><strong>Region/Subregion: </strong> ${country.region} / ${country.subregion}</p>
    <p><strong>Population: </strong> ${country.population.toLocaleString()}</p>
    <p><strong>Area:</strong> ${country.area.toLocaleString()} km<sup>2</sup></p>
    <p><strong>Languages: </strong> ${languages}</p>
    <div>
      <h1>Local times</h1>
      <ul class="local-times"></ul>
    </div>
  `;

  countryDescriptions.classList.add("show");
  drawMap(country.latlng, country.name.common);
  showLocatime(country.timezones);
}

// ======== UI HANDLERS ========
function resetUI() {
  countryDescriptions.classList.remove("show");
  countryMap.innerHTML = "";
  error.classList.remove("show");
  loader.classList.add("show");
  countryDescriptions.innerHTML = "";
}
export {renderCountry,resetUI}