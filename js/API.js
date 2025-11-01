import  {renderCountry,resetUI} from "./ui.js"
// ======== DOM ELEMENTS ========
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

// ======== COUNTRY FETCH & RENDER ========
const countryCache = {};
async function fetchCountry(name) {
  resetUI();
  try {
    const country = await getCountryData(name);
    renderCountry(country);
  } catch (err) {
    error.classList.add("show");
    error.innerHTML = err.message || "Failed to load the country information.";
  } finally {
    loader.classList.remove("show");
  }
}

async function getCountryData(name) {
  
  if (countryCache[name]) return countryCache[name];

  const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
  if (!response.ok) throw new Error("Country not found");
  const data = await response.json();
  const country = data[0];
  if (!country) throw new Error("Invalid country name.");

  countryCache[name] = country;
  return country;
}

export {fetchCountry}