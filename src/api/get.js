// import demoData from './demo';
import * as axios from "axios";

let data = async () => {
    let res = await axios.get("http://13.56.168.180/api/v1/offers?limit=10");
    let data = res.data && res.data.offers;
    return data || [];
};

export default data;
