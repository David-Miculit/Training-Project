import { displayCountry } from './ui.js';

// fetch single country data
export async function fetchCountry(name) {
    const details = document.getElementById('countryDetails');
    name = name.trim();

    if (!name) {
        details.innerHTML = 'Enter a country.';
        return;
    }

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name,capital,population,currencies,maps,languages,flags`
        );
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            details.innerHTML = 'Country not found.';
            return;
        }

        displayCountry(data[0]);
    } catch (error) {
        console.error(error);
        details.innerHTML = 'Error occurred.';
    }
}

// fetch data for all countries
export async function fetchAllCountries() {
    const details = document.getElementById('countryDetails');
    details.innerHTML = '';

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,maps,languages,flags`
        );
        const data = await response.json();

        data.forEach(country => {
            displayCountry(country, true);
        });
    } catch (error) {
        console.error(error);
        details.innerHTML = 'Error occurred.';
    }
}
