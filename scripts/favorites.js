export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || []
}

export function saveFavorite(countryName) {
    const favorites = getFavorites()
    if (!favorites.includes(countryName)) {
        favorites.push(countryName)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

export function removeFavorite(countryName) {
    let favorites = getFavorites()
    favorites = favorites.filter(name => name !== countryName)
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

export function clearFavorites() {
    localStorage.removeItem('favorites')
}
