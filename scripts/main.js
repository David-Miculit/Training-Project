import { fetchCountry, fetchAllCountries } from './api.js';

export function init() {
    const searchInput = document.getElementById('searchBar');
    const countryListButton = document.getElementById('countryListButton');

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            fetchCountry(e.target.value);
        }
    });

    countryListButton.addEventListener('click', () => {
        fetchAllCountries();
    });
}
init()