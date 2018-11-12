import axios from 'axios';
import { OFFER_API } from '../constants/config'

const GENERAL_PARA = {
    offset: true,
    limit: true,
    list_id: true,
}

export const EMPTY_QUERY = {
    offset: NaN,
    limit: NaN,
    list_id: '',
    annual_refresh: NaN,
    level: NaN,
    year: NaN,
    base_salary: NaN,
    relocation_fee: NaN,
    sign_bonus: NaN,
    post_title: '',
    satisfaction: '',
    area: '',
    degree: '',
    equity: '',
    equity_schedule: '',
    experience: '',
    experience_level: '',
    greencard: '',
    group: '',
    job_function: '',
    job_type: '',
    title: '',
    interest_point: '',
    other_offer: '',
    position_type: '',
    post_time: null,
    spider_time: null,
    promotion_package: '',
    season: '',
    url: '',
    yearly_bonus: '',
    apply_source: '',
}

export const makeQuery = (obj) => {
    if (!obj) { return '' }
    let query = '?'
    for (let key in obj) {
        if (!(key in EMPTY_QUERY)) {
            console.error('invalid arg', key)
        }
        if (Number.isNaN(obj[key]) || !obj[key]) {
            continue
        }
        if (key in GENERAL_PARA) {
            query += (key + '=' + obj[key])
        } else {
            query += ('by_' + key + '=' + obj[key])
        }
        query += '&'
    }
    if (query === '?') {
        return ''
    }

    if (query[query.length - 1] === '&') {
        query = query.substring(0, query.length - 1)
    }
    
    return query
}

/**
 * usage:
 * makeQuery({
 *     ...EMPTY_QUERY,
 *     limit: 10,
 * })
 */

export const getData = async (query) => {
    let res = await axios.get(OFFER_API + query)
    let data = res.data && res.data.offers
    return data || []
}
