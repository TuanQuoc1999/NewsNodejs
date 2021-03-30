import logger from '../../util/logger';
import APIError from '../../util/APIError';
import User from './user.model';
import * as _ from 'lodash';

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise.<*>} The user model after login success or an error
 */
export async function login(email, password) {
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return Promise.reject(new APIError(403, [
        {
          msg: 'The email address that you\'ve entered doesn\'t match any account.',
          param: 'emailNotRegistered',
        },
      ]));
    }
    if (!user.comparePassword(password)) {
      return Promise.reject(new APIError(403, [
        {
          msg: 'Email or password is not correct',
          param: 'emailPassword',
        },
      ]));
    }

    const token = user.signJWT();
    user = user.toJSON();
    user.token = token;
    return user;
  } catch (error) {
    logger.error('User login error:', error);
    throw new APIError(500, 'Internal server error');
  }
}

/**
 * Update user profile information
 * @param user User model instance
 * @param avatar the avatar file information
 * @param avatar.filename
 * @returns {Promise.<*>} Return avatar url or an APIError
 */
export async function uploadUserAvatar(user, avatar) {
  if (!user || !user._id) {
    return Promise.reject(new APIError(404, 'User not found'));
  }
  try {
    user.avatar = `uploads/user-avatar/${avatar.filename}`;
    try {
      await user.save();
    } catch (error) {
      logger.error('User uploadUserAvatar save user error:', error);
      return Promise.reject(new APIError(500, 'Internal server error'));
    }
    return user.avatar;
  } catch (error) {
    logger.error('User uploadUserAvatar error:', error);
    throw new APIError(500, 'Internal server error');
  }
}

/**
 * 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @param {sring} fullName 
 * @param {string} avatar 
 */
export async function register(username, email, password, fullName, avatar) {
  try {
    const hasUser = await User.findOne({
      $or: [
        {
          email: email
        },
        {
          username: username
        }
      ]
    });
    if( !_.isEmpty(avatar) ) {
      avatar = `uploads/user-avatar/${avatar.filename}`
    } else {
      avatar = null;
    }
    if (hasUser) return Promise.reject(new APIError(400, 'User exists'));
    const newUser = new User({
      username,
      email,
      fullName,
      password,
      avatar
    });
    await newUser.save();
    return Promise.resolve(newUser);
  } catch (error) {
    logger.error('User register error:', error);
    throw new APIError(500, 'Internal server error');
  }
}

/**
 * 
 * @param options pagination
 */
export async function getAll(options) {
  const { limit, page } = options;
  try {
    const user = await User.find()
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .select({ password: 0 })
      .exec();
    return user;
  } catch (error) {
    logger.error(error);
    throw new APIError(500, 'Internal server error');
  }
}

/**
 * 
 * @param {string} userId 
 */
export async function getUserById( userId ) {
  try {
    const user = await User.findById(userId);
    if( !user ) {
      return Promise.reject(404, 'user not found');
    }
    return Promise.resolve(user);
  } catch (error) {
    logger('Find user by id error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

/**
 * 
 * @param {string} key 
 */
export async function searchUser(key) {
  try {
    const user = await User.find().or([
      { email: { $regex: key } },
      { fullName: { $regex: key } }]);
    if ( !user ) {
      return Promise.reject(new APIError(404, 'User not found'));
    }
    return Promise.resolve(user);
  } catch (error) {
    logger.error('User search key error: ', error);
    throw new APIError(500, 'Internal server error');
  }
}

/**
 * 
 * @param {string} userId 
 */
export async function deleteUser( userId ) {
  try {
    const user = await User.findById( userId );
    if( !user ) {
      return Promise.reject(new APIError(404, 'User not found'));
    }
    user.remove();
    return Promise.resolve(user);
  } catch (error) {
    logger.error('Delete user error', error);
    throw new APIError(500, 'Interal Server Error');
  }
}

/**
 * 
 * @param {string} userId 
 * @param body info user need be updated
 */
export async function updateUserInfor( userId, body ) {
  try {
    const user = await User.findOne({ _id: userId });
    if( !user ) {
      return Promise.reject( new APIError(404, 'User not found'));
    }
    Object.keys(body).forEach((key) => {
      user[key] = body[key];
    });
    await user.save();
    return Promise.resolve(user);
  } catch (error) {
    logger.error('update user Info Error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

/**
 * 
 * @param {string} userId 
 * @param {string} avatar 
 */
export async function updateUserAvatar(userId, avatar) {
  const user = await User.findById(userId);
  if (!user) {
    return Promise.reject(new APIError(404, 'user not found'));
  }
  try {
    user.avatar = `uploads/user-avatar/${avatar.filename}`;
    try {
      await user.save();
    } catch (error) {
      logger.error('update for avatar user error !:', error);
      throw Promise.reject(new APIError(500, 'Internal Server error'));
    }
    return user.avatar;
  } catch (error) {
    logger('update for avatar user error !:', error);
    throw new APIError(500, 'Internal server error!');
  }
}

//dem subscribe
export async function countUser() {
  try {
    const count = await User.countDocuments();
    console.log('count', count)
    return count;
  } catch (error) {
    logger.error('Count User Error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}