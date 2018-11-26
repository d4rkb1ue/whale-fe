import { getData, makeQuery, EMPTY_QUERY } from '../api/get';

export const RECEIVE_OFFERS = 'recieve_offers'
export const LOADING_OFFERS = 'loading_offers'

export const loadingOffers = (taskCount) => ({
    type: LOADING_OFFERS,
    taskCount
})

export const receiveOffers = offers => ({
    type: RECEIVE_OFFERS,
    offers
})

const requestOffers = (query = '', taskCount = 10) => async (dispatch) => {
    dispatch(loadingOffers(taskCount))
    const offers = await getData(query)
    dispatch({
        type: RECEIVE_OFFERS,
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
