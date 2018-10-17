import {
    GET_OFFERS
} from './type';
import OfferAPI from '../api/get';

export const getOffers = () => async dispatch => {
    const response = await OfferAPI.getPostList();
    await dispatch({ type: GET_OFFERS, payload: response });
};
