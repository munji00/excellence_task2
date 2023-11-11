import multer from 'multer'
import {v4 as uuidv4} from 'uuid';

const rand_id = uuidv4();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${rand_id}.jpg`
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage })