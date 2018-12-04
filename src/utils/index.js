import { SHOW_YEAR_BEFORE, SHOW_YEAR_LATER, OFFER_HEADER_CHOICES } from '../constants/config'
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

// Company name is unique
function offerCountByWithCompanyName (offers, para, sortFunc) {
    let counter = {} // Map<company_name, Map<salary, count>>
    offers.forEach(o => {
        let c = o['company_name']
        let p = o[para]
        if(!p) { return }
        counter[c] = counter[c] || {}
        counter[c][p] = counter[c][p] || 0
        counter[c][p]++
    })
    let arr = []
    for (const company in counter) {
        arr.push({
            company_name: company,
            salary2Count: {}
        })
        for (const salary in counter[company]) {
            // put all the salaries in range buckets
            let bucketToPut = 190000;
            if (salary < 70000) {
                bucketToPut = 70000
            } else if (salary < 80000) {
                bucketToPut = 80000
            } else if (salary < 90000) {
                bucketToPut = 90000
            } else if (salary < 100000) {
                bucketToPut = 100000
            } else if (salary < 110000) {
                bucketToPut = 110000
            } else if (salary < 120000) {
                bucketToPut = 120000
            } else if (salary < 130000) {
                bucketToPut = 130000
            } else if (salary < 140000) {
                bucketToPut = 140000
            } else if (salary < 150000) {
                bucketToPut = 150000
            } else if (salary < 160000) {
                bucketToPut = 160000
            } else if (salary < 170000) {
                bucketToPut = 170000
            } else if (salary < 180000) {
                bucketToPut = 180000
            } else {
                bucketToPut = 190000
            }
            arr[arr.length - 1].salary2Count[bucketToPut] = arr[arr.length - 1].salary2Count[bucketToPut] || 0
            arr[arr.length - 1].salary2Count[bucketToPut] += counter[company][salary]
        }
    }

    if (sortFunc) {
        arr.sort(sortFunc)
    }

    return {
        companyNames: arr.map(obj => obj['company_name']),
        companySalary2Count: arr
    }
}


const THIS_YEAR = (new Date()).getFullYear()
const START_YEAR = THIS_YEAR - SHOW_YEAR_BEFORE
const END_YEAR = THIS_YEAR + SHOW_YEAR_LATER

export function getAvg(offers) {
    const ret = offers.reduce((sum, cur) => (cur['base_salary'] || 0) + sum, 0) / offers.length;
    return ret || 0
}

export function getMid(offers) {
    if (!offers || !offers.length) { return 0 }
    let clone = offers.slice()
    clone.sort((a, b) => a['base_salary'] - b['base_salary'])
    return clone[Math.floor(clone.length / 2)]['base_salary']
}

export function getOfferCountByLocation(offers) {
    return offerCountBy(offers, 'area', (a, b) => b.count - a.count)
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
    const choice = OFFER_HEADER_CHOICES['season']
        if (!choice) { return }
    const month2season = (value) => {
        if (!value) { return }
        let res = choice.find(s => s.value === value)
        return res && res.text
    }
    const SEASON_ORDINAL = {
        "1-3": 3,
        "4-6": 0,
        "7-9": 1,
        "10-12": 2
    }
    let res = offerCountBy(offers, 'season', (a, b) => SEASON_ORDINAL[a.season] - SEASON_ORDINAL[b.season])
    for (let i = 0; i < res.labels.length; i++) {
        res.labels[i] = month2season(res.labels[i]);
    }
    return res;
}

export function getOfferCountByExperience(offers) {
    return offerCountBy(offers, 'experience_level', (a, b) => b.count - a.count)
}

export function getOfferCountBySalary(offers) {
    return offerCountByWithCompanyName(offers, 'base_salary', (a, b) => b.company_name - a.company_name) // alphabetical order on company name 
}

export function getCompanies(offers) {
    let map = {}
    offers.forEach(o => {
        map[o['company_name']] = 1
    })
    let ret = []
    for (let i in map) {
        ret.push(i)
    }
    return ret
}
