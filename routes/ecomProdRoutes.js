import express from 'express';
import { fetchMobileProducts, fetch_t_shirt } from '../controllers/productControllers.js';

const prodRoute = express.Router();

prodRoute.get('/flipkart/mobile' , fetchMobileProducts);
prodRoute.get('/snapdeal/t-shirt', fetch_t_shirt);

export default prodRoute