import { getFavorites } from "./favorites.js"

// display country data
export function displayCountry(country, isList=false) {
    const details = document.getElementById('countryDetails');
    const name = country.name?.common || 'N/A'
    const flag = country.flags?.png || 'N/A'
    const capital = country.capital?.[0] || 'N/A'
    const population = country.population?.toLocaleString() || 'N/A'
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'
    const currency = country.currencies
        ? Object.values(country.currencies)[0]?.name: 'N/A';
    const map = country.maps.googleMaps || 'N/A'
    const favorites = getFavorites()
    const isFavorite = favorites.includes(name)
    const heart = isFavorite ? '💔' : '❤️'

    const cardHTML = 
    `
        <div class="country-card">
            <h2 class="country-name">${name}</h2>
            <button class="favorite-btn" data-country="${name}">${heart}</button>
            <img class="country-flag" src="${flag}" alt="Flag">
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            <p><strong>Location: </strong><a href="${map}" target="_blank">Google Maps</a></p>
        </div>
    `;

    if(isList) {
        details.innerHTML += cardHTML
    } else {
        details.innerHTML = cardHTML
    }
}
