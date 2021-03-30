import path from 'path';
import multer from 'multer';
import APIError from '../../util/APIError';
import {
  MAX_UPLOAD_FILE_SIZE_MB,
  MAX_UPLOAD_FILE_SIZE_BYTE,
} from '../../constants';

export const USER_AVATAR_DESTINATION = path.resolve(__dirname, '../../../uploads/user-avatar');

const storageUserAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, USER_AVATAR_DESTINATION);
  },
  filename: async function (req, file, cb) {
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName) || '';
    const finalName = `${req.auth._id}${fileExtension}`;
    cb(null, finalName);
  }
});
const limits = { fileSize: MAX_UPLOAD_FILE_SIZE_BYTE };
const uploadUserAvatar = multer({
  storage: storageUserAvatar,
  limits: limits,
  fileFilter: function (req, file, cb) {
    const originalName = file.originalname.toLowerCase();
    if (!originalName.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new APIError(422, [{
        msg: `User avatar file is invalid, only image files are allowed, max size: ${MAX_UPLOAD_FILE_SIZE_MB}MB!`,
        param: 'userAvatarInvalid',
        location: 'body',
      }]));
    }
    return cb(null, true);
  },
});
export const userAvatarUploader = uploadUserAvatar.single('user-avatar');
