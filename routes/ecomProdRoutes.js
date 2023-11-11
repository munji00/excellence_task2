import express from 'express';
import { fetchMobileProducts } from '../controllers/productControllers.js';

const prodRoute = express.Router();

prodRoute.get('/flipkart/mobile' , fetchMobileProducts);

export default prodRoute