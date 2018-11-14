import * as ApiActions from '../constants/ApiActions';
import { getData, makeQuery, EMPTY_QUERY } from '../api/get';

export const loadingOffers = (taskCount) => ({
    type: ApiActions.LOADING_OFFERS,
    taskCount
})

export const receiveOffers = offers => ({
    type: ApiActions.RECEIVE_OFFERS,
    offers
})

const requestOffers = (query = '', taskCount = 10) => async (dispatch) => {
    dispatch(loadingOffers(taskCount))
    const offers = await getData(query)
    dispatch({
        type: ApiActions.RECEIVE_OFFERS,
        offers
    })
}

const DEMO_OFFER_COUNT = 3000
export const getDemoOffers = () => dispatch => {
    return dispatch(requestOffers(makeQuery({
        ...EMPTY_QUERY,
        limit: DEMO_OFFER_COUNT,
    }), DEMO_OFFER_COUNT))
}
