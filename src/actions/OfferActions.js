import * as ApiActions from '../constants/ApiActions';
import { getData, makeQuery, EMPTY_QUERY } from '../api/get';

export const loadingOffers = (placeholderNum) => ({
    type: ApiActions.LOADING_OFFERS,
    placeholderNum
})

export const receiveOffers = offers => ({
    type: ApiActions.RECEIVE_OFFERS,
    offers
})

const requestOffers = (query = '', placeholderNum = 10) => async (dispatch) => {
    dispatch(loadingOffers(placeholderNum))
    const offers = await getData(query)
    dispatch({
        type: ApiActions.RECEIVE_OFFERS,
        offers
    })
}

const DEMO_OFFER_COUNT = 10
export const getDemoOffers = () => dispatch => {
    return dispatch(requestOffers(makeQuery({
        ...EMPTY_QUERY,
        limit: DEMO_OFFER_COUNT,
    }), DEMO_OFFER_COUNT))
}

export const getFilteredByDegreeOffers = (filteredBy) => dispatch => {
    return dispatch(requestOffers(makeQuery({
        ...EMPTY_QUERY,
        limit: DEMO_OFFER_COUNT,
        degree: filteredBy,
    }), DEMO_OFFER_COUNT))
};
