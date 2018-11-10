// import demoData from './demo';
import * as axios from "axios";

const url = "http://13.56.168.180/api/v1/offers?limit=10";

let data = async () => {
    let res = await axios.get(url);
    let data = res.data && res.data.offers;
    return data || [];
};

let filteredData = async (filteredBy) => {
    let res = await axios.get(`${url}&${filteredBy}`);
    let data = res.data && res.data.offers;
    return data || [];
};

export { data, filteredData };
