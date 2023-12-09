import multer from 'multer'
import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';


const rand_id = uuidv4();

const storage = multer.diskStorage({
  destination: function (req:Request, file:{fieldname:string}, cb:Function) {
    cb(null, './uploads')
  },
  filename: function (req:Request, file:{fieldname:string}, cb:Function) {
    const uniqueSuffix = `${rand_id}.jpg`
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage })