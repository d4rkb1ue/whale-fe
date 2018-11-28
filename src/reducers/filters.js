import { ADD_FILTER, REMOVE_FILTER } from '../actions/FilterActions'

import Filter from '../dataStructure/Filter'
const INITIAL_STATE = [ new Filter('company_name', 'Google'), new Filter('company_name', 'Amazon') ]
// const INITIAL_STATE = []

export default function (state = INITIAL_STATE, action) {
    function isDuplicateFilter(filters, filter) {
        for (let i = 0; i < filters.length; i++) {
            const { accessor, value } = filters[i]
            if (accessor === filter.accessor && value === filter.value) {
                return true
            }
        }
    }

    switch (action.type) {
        case ADD_FILTER: {
            if (isDuplicateFilter(state, action.filter)) {
                return state
            }
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
