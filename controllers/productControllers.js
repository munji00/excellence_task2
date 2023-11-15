import axios from 'axios';
import env from 'dotenv'
import { resHandler } from '../handlers/resHandler.js';
import {get_flipkart_mobile_data, get_snapdeal_tshirt } from '../services/webScrapingServices.js';

env.config()


export const fetchMobileProducts = async(req, res, next) => {
    try {
        const data = await axios.get(process.env.FLIPKART_MOBILE_URL);
        const orgData = get_flipkart_mobile_data(data.data)
        resHandler(res, 200, orgData)
    } catch (error) {
        next(error);
    }
}



export const fetch_t_shirt = async(req, res, next) => {
    try {
        const data = await axios.get(process.env.SNAPDEAL_TSHIRT_URL)
        const tshirt_data = get_snapdeal_tshirt(data.data)
        resHandler(res, 200, tshirt_data);
    } catch (error) {
        next(error)
    }
}

