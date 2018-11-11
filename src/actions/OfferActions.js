import * as ApiActions from '../constants/ApiActions';

import { getDemoData } from '../api/get';

export const getRecentOffers = () => async dispatch => {
    const offers = await getDemoData();
    dispatch({
        type: ApiActions.GET_OFFERS,
        offers
    })
}
