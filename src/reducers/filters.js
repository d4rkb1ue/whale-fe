import { ADD_FILTER, REMOVE_FILTER } from '../actions/FilterActions'
import Filter from '../dataStructure/Filter'
// TODO
const INITIAL_STATE = [ new Filter('company_name', 'Google') ]

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
