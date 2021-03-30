import path from 'path';
import multer from 'multer';
import APIError from '../../util/APIError';
import { v4 as uuidv4 } from 'uuid';
import {
  MAX_UPLOAD_FILE_SIZE_MB,
  MAX_UPLOAD_FILE_SIZE_BYTE,
} from '../../constants';

export const IMAGE_POST_DESTINATION = path.resolve(__dirname, '../../../uploads/image-post');

const storageImagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGE_POST_DESTINATION);
  },
  filename: async function (req, file, cb) {
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName) || '';
    const finalName = `${uuidv4()}${fileExtension}`;
    cb(null, finalName);
  }
});
const limits = { fileSize: MAX_UPLOAD_FILE_SIZE_BYTE };
const uploadImagePost = multer({
  storage: storageImagePost,
  limits: limits,
  fileFilter: function (req, file, cb) {
    const originalName = file.originalname.toLowerCase();
    if (!originalName.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new APIError(422, [{
        msg: `Post image file is invalid, only image files are allowed, max size: ${MAX_UPLOAD_FILE_SIZE_MB}MB!`,
        param: 'postImageInvalid',
        location: 'body',
      }]));
    }
    return cb(null, true);
  },
});
export const postImageUploader = uploadImagePost.array('image-post', 10);
