import { combineReducers } from 'redux'
import offers from './offers'
import filters from './filters'

export default combineReducers({
    offers,
    filters,
})
