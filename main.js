// fetch country data
async function fetchCountry(name) {
    const details = document.getElementById('countryDetails');
    name = name.trim()
    
    if(!name) {
        details.innerHTML = `Enter a country.`
        return
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name,capital,population,currencies,maps,languages,flags`)
        if(!response) {
            console.log('API Request failed')
        }
        const data = await response.json()
        if(!Array.isArray(data) || data.length===0) {
            details.innerHTML = `Country not found.`
            return
        }
        const countryData = data[0]
        console.log(countryData)

        displayCountry(countryData) 
    } catch (error) {
        console.log(error)
        details.innerHTML = `Error ocurred.`
    }
}

async function fetchAllCountries() {
    const details = document.getElementById('countryDetails')

    try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,maps,languages,flags`)
        const data = await response.json()
        console.log(data)

        data.forEach(country => {
            displayCountry(country, isList=true)
        })
    } catch (error) {
        console.log(error)
    }
}

// display country data
function displayCountry(country, isList=false) {
    const details = document.getElementById('countryDetails');

    const name = country.name?.common || 'N/A'
    const flag = country.flags.png || 'N/A'
    const capital = country.capital?.[0] || 'N/A'
    const population = country.population?.toLocaleString() || 'N/A'
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'
    if(!Object.values(country.currencies)[0]) {
        currency = 'N/A'
    } else {
        currency = country.currencies ? Object.values(country.currencies)[0].name : 'N/A'
    }
    const map = country.maps.googleMaps || 'N/A'

    const cardHTML = 
    `
        <div class="country-card">
            <h2 class="country-name">${name}</h2>
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

// display a list of all country names
function displayCountries() {
    for (let i = 0; i < countries.length; i++) {
        let li = document.createElement('li');
        li.innerText = countries[i].name;
        results.appendChild(li)
    }
}

const results = document.getElementById('countriesList');
const searchInput = document.getElementById('searchBar')
const countryListButton = document.getElementById('countryListButton')

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchCountry(e.target.value)
    }
});

countryListButton.addEventListener('click', function() {
    fetchAllCountries()
})