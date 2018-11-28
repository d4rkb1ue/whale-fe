import { ADD_FILTER, REMOVE_FILTER } from '../actions/FilterActions'

// const INITIAL_STATE = [ new Filter('company_name', 'Google') ]
const INITIAL_STATE = []

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_FILTER: {
            return [
                ...state,
                action.filter
            ]
        }
        case REMOVE_FILTER: {
            return state.filter(f => f.id !== action.id)
        }
        default:
            return state
    }
}
