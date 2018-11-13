import * as Action from '../constants/ApiActions'

const INITIAL_STATE = { 
    offers: [],
    loading: {
        isLoading: false,
        placeholderNum: 0,
    },
}

export default (state = INITIAL_STATE, action) => {
    const { type } = action
    switch (type) {
        case Action.LOADING_OFFERS: {
            return {
                ...state,
                loading: {
                    isLoading: true,
                    placeholderNum: action.placeholderNum
                }
            }
        }
        case Action.RECEIVE_OFFERS: {
            return {
                ...state,
                offers: action.offers,
                loading: {
                    isLoading: false,
                    placeholderNum: 0
                }
            }
        }
        default:
            return state
    }
}
