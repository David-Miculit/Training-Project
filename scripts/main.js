import { fetchCountry, fetchAllCountries } from './api.js';
import { getHistory, clearHistory } from './caching.js'
import { displayCountry } from './ui.js'

export function init() {
    const searchInput = document.getElementById('searchBar');
    const countryListButton = document.getElementById('countryListButton');
    const historyButton = document.getElementById('historyButton')
    const clearCacheButton = document.getElementById('clearCacheButton')
    const countriesList = document.getElementById('countriesList')
    const details = document.getElementById('countryDetails')

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            fetchCountry(e.target.value);
        }
    });

    countryListButton.addEventListener('click', () => {
        countriesList.innerHTML = ''
        fetchAllCountries();
    });

    historyButton.addEventListener('click', async () => {
        const history = getHistory()
        details.innerHTML = ''

        if (history.length === 0) {
            details.innerHTML = 'No search history.'
            return;
        }

        for (const countryName of history) {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name,capital,population,currencies,maps,languages,flags`
                );
                const data = await response.json()

                if (Array.isArray(data) && data.length > 0) {
                    displayCountry(data[0], true)
                }
            } catch (err) {
                console.error(`Failed to fetch ${countryName}`, err)
            }
        }
    })

    clearCacheButton.addEventListener('click', () => {
        clearHistory()
        countriesList.innerHTML = '<li>Cachhe cleared.</li>'
    })
}
init()