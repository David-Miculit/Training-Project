export function saveHistory(searched) {
    localStorage.setItem('history', JSON.stringify(searched));
}

export function getHistory() {
    return JSON.parse(localStorage.getItem('history')) || [];
}
