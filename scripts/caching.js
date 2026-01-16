const storageKey = 'searchHistory'

export function getHistory() {
    const stored = localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : []
}

export function saveHistory(countryName) {
    if (!countryName) {
        return
    }

    let history = getHistory();
    const normalized = countryName.trim()

    history = history.filter(
        item => item.toLowerCase() !== normalized.toLowerCase()
    )
    history.unshift(normalized)
    history = history.slice(0, 10)
    localStorage.setItem(storageKey, JSON.stringify(history))
}

export function clearHistory() {
    localStorage.removeItem(storageKey)
}
