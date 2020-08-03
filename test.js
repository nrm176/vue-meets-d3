Array.from(document.querySelectorAll('div#header_v tr')).map((e) => {
    return Array.from(e.querySelectorAll('td')).map((e) => {
        return e.textContent
    })
}).filter((e, idx) => {
    return e.length === 4
}).filter((e) => {
    return e[1].length === 5
}).map((e) => {
    return {hs2: e[1], desc: e[3].trim()}
})