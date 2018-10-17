import { combineReducers } from 'redux';
import OfferReducer from './OfferReducer';

export default combineReducers({
    offer: OfferReducer
});
