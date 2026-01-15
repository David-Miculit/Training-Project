async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/independent')

        const data = await response.json()

        countries = data.map(country => ({
            name: country.name.common,
            capital: country.capital[0],
            population: country.population,
            currency: country.currencies,
            map: country.maps.googleMaps,
            language: country.languages,
            flag: country.flags.png
        }))
    } catch (error) {
        console.log('Error fetching countries')
    }

    // displayCountries()
}

function displayCountries() {
    const results = document.getElementById('countriesList');

    for (let i = 0; i < countries.length; i++) {
        let li = document.createElement('li');
        li.innerText = countries[i].name;
        results.appendChild(li)
    }
}

function searchCountry() {
    const input = document.getElementById('searchBar').value.trim().toLowerCase();
    const details = document.getElementById('countryDetails');
    const match = countries.find(a =>
        a.name.toLowerCase().includes(input)
    );

    if (match) {
        details.innerHTML = `
            <div class="country-card">
                <h2 class="country-name">${match.name}</h2>
                <img class="country-flag" src="${match.flag}" alt="Flag">
                <p><strong>Capital:</strong> ${match.capital}</p>
                <p><strong>Population:</strong> ${match.population.toLocaleString()}</p>
                <p><strong>Currency:</strong> ${Object.values(match.currency)[0].name}</p>
                <p><strong>Languages:</strong> ${Object.values(match.language).join(', ')}</p>
                <p><strong>Location: </strong><a href="${match.map}" target="_blank">Google Maps</a></p>
            </div>
        `;
    } else {
        details.innerHTML = `<p class="error">Country not found.</p>`;
    }
}

let countries = []

fetchCountries()

const searchInput = document.getElementById('searchBar')
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        searchCountry()
    }
});


