import data from './demo';

class OfferAPI {
    static async getPostList() {
        try {
            // const response = await fetchApi(
            //     `whale.drkbl.com/getOffers`,
            //     'GET'
            // );
            return await data; // return the dummy data for now
        } catch (error) {
            throw error;
        }
    }
}

export default OfferAPI;
