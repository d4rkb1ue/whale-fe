import axios from 'axios';
import { OFFER_API } from '../constants/config'

export const getDemoData = async () => {
    let res = await axios.get(OFFER_API + '?limit=10')
    let data = res.data && res.data.offers
    return data || []
};
