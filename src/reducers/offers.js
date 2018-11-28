import { LOADING_OFFERS, RECEIVE_OFFERS } from '../actions/ApiActions'

const INITIAL_STATE = {
    offers: [],
    loading: {
        isLoading: false,
        taskCount: 0,
    },
}

export default function (state = INITIAL_STATE, action) {
    const { type } = action
    switch (type) {
        case LOADING_OFFERS: {
            return {
                ...state,
                loading: {
                    isLoading: true,
                    taskCount: action.taskCount
                }
            }
        }
        case RECEIVE_OFFERS: {
            return {
                ...state,
                offers: action.offers,
                loading: {
                    isLoading: false,
                    taskCount: 0
                }
            }
        }
        default:
            return state
    }
}
