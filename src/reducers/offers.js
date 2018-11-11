import {
    GET_OFFERS
} from '../constants/ApiActions'

const INITIAL_STATE = { 
    offers: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_OFFERS: {
            return {
                ...state,
                offers: action.offers,
            }
        }
        default:
            return state
    }
}
