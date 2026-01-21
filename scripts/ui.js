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
    <div class="country-card group relative rounded-xl border border-slate-200 px-4 py-3 shadow-sm m-2 hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
        <button class="favorite-btn absolute top-3 right-3 w-8 h-8 text-red-500 hover:bg-red-100 rounded-full duration-200 border border-transparent group-hover:border-red-200" data-country="${name}" aria-label="Add to favorites">
            ${heart}
        </button>

        <h2 class="country-name text-center text-lg font-semibold text-slate-900 mb-2">
            ${name}
        </h2>

        <img class="country-flag border border-slate-200 mx-auto my-2 h-24 rounded-md" src="${flag}" alt="Flag">
        </img>

        <div class="country-details overflow-hidden duration-300 ease-in-out max-h-0 opacity-0 group-hover:max-h-full group-hover:opacity-100">
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            <p><strong>Location:</strong> <a href="${map}" target="_blank" class="text-blue-700 hover:underline">Google Maps</a></p>
        </div>
    </div>
    `;

    if(isList) {
        details.innerHTML += cardHTML
    } else {
        details.innerHTML = cardHTML
    }
}
