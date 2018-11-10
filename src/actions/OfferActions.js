import {
    GET_OFFERS,
    GET_FILTERED_OFFERS
} from './types';
import { data, filteredData } from '../api/get';

export const getOffers = () => async dispatch => {
    const response = await data();
    await dispatch({ type: GET_OFFERS, payload: response });
};

export const getFilteredOffers = (filteredBy) => async dispatch => {
    const response = await filteredData(filteredBy);
    await dispatch({ type: GET_FILTERED_OFFERS, payload: response });
};
