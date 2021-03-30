import { body } from 'express-validator';
import validatorErrorHandler from '../../api/validatorErrorHandler';
import { USER_MIN_PASSWORD_LENGTH } from '../../constants';
import APIError from '../../util/APIError';

export const userLoginValidator = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: USER_MIN_PASSWORD_LENGTH }).withMessage([
    'Password must be at least %s chars long',
    [USER_MIN_PASSWORD_LENGTH]
  ]),
  validatorErrorHandler,
];

export const uploadUserAvatar = [
  function (req, res, next) {
    if (!req.file) {
      return next(new APIError(422, [{
        msg: 'User avatar file was not found',
        param: 'userAvatarNotFound',
        location: 'body',
      }]));
    }
    return next();
  },
  validatorErrorHandler,
];
