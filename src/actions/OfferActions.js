import {
    GET_OFFERS
} from './types';
import data from '../api/get';

export const getOffers = () => async dispatch => {
    const response = await data();
    await dispatch({ type: GET_OFFERS, payload: response });
};
