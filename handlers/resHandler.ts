import {Response, Request} from 'express'
import { resInter } from '../interfaces.td';
 export const resHandler = (res:Response, statusCode:number, data:resInter) =>  res.status(statusCode).send(data);
