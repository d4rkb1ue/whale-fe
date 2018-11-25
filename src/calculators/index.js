function offerCountBy (offers, para, sortFunc) {
    let counter = {}
    offers.forEach(o => {
        let p = o[para]
        if(!p) { return }
        counter[p] = counter[p] || 0
        counter[p]++
    })
    let arr = []
    for (const c in counter) {
        arr.push({
            [para]: c,
            count: counter[c]
        })
    }
    if (sortFunc) {
        arr.sort(sortFunc)
    }
    return {
        labels: arr.map(obj => obj[para]),
        counts: arr.map(obj => obj.count)
    }
}
export function getOfferCountByYear(offers) {
    return offerCountBy(offers, 'year', (a, b) => a.year - b.year)
}

export function getOfferCountByCompany(offers) {
    return offerCountBy(offers, 'company_name', (a, b) => b.count - a.count)
}