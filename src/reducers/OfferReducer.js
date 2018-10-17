import {
    GET_OFFERS
} from '../actions/types';

const INITIAL_STATE = { 
    offerList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_OFFERS: {
            return {
                ...state,
                offerList: action.payload,
            };
        }
        default:
            return state;
    }
}
