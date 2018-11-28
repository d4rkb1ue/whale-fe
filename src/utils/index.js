import { SHOW_YEAR_BEFORE, SHOW_YEAR_LATER } from '../constants/config'
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

const THIS_YEAR = (new Date()).getFullYear()
const START_YEAR = THIS_YEAR - SHOW_YEAR_BEFORE
const END_YEAR = THIS_YEAR + SHOW_YEAR_LATER

export function getAvg(offers) {
    const ret = offers.reduce((sum, cur) => (cur['base_salary'] || 0) + sum, 0) / offers.length;
    return ret || 0
}

export function randomURI() {
    return Math.random().toString(36).substr(2);
}

export function getOfferCountByYear(offers) {
    let res = offerCountBy(offers, 'year', (a, b) => a.year - b.year)
    // show only recent years
    let recent = {}
    for (let i = START_YEAR; i <= END_YEAR; i++) {
        recent[i] = true
    }
    res = {
        labels: res.labels.filter(l => recent[l]),
        counts: res.counts.filter((_, idx) => recent[res.labels[idx]])
    }
    return res
}

export function getOfferCountByCompany(offers) {
    return offerCountBy(offers, 'company_name', (a, b) => b.count - a.count)
}

export function getOfferCountByDegree(offers) {
    return offerCountBy(offers, 'degree', (a, b) => b.count - a.count)
}

export function getOfferCountBySeason(offers) {
    return offerCountBy(offers, 'season', (a, b) => b.count - a.count)
}
