import * as UserService from './user.service';

export async function login(req, res, next) {
  try {
    const {
      body,
    } = req;
    const user = await UserService.login(body.email, body.password);
    return res.json({
      success: true,
      payload: user,
    });
  } catch (error) {
    return next(error);
  }
}

export async function uploadUserAvatar(req, res, next) {
  try {
    const auth = req.auth;
    const file = req.file;
    const avatarURL = await UserService.uploadUserAvatar(auth, file);
    return res.json({
      success: true,
      payload: avatarURL,
    });
  } catch (error) {
    return next(error);
  }
}

export async function register( req, res, next ) {
  try {
    const {
      username,
      email,
      password,
      fullName
    } = req.body;
    const { method, auth} = req;
    const avatar = req.file;
    const newUser = await UserService.register(username, email, password, fullName, avatar);
    return res.json({
      success: true,
      payload: newUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAll( req, res, next ) {
  const { page, limit } = req.query;
  const pageOptions = {
    page: parseInt(page, 10) || 0,
    limit: parseInt(limit, 10) || 5,
  };
  try {
    const user = await UserService.getAll(pageOptions);
    return res.json({
      success: true,
      payload: user
    });
  } catch (error) {
    return next(error);
  }
}

export async function getUserById( req, res, next ) {
  const userId = req.params.id;
  try {
    const userInfor = await UserService.getUserById(userId);
    return res.json({
      success: true,
      payload: userInfor
    })
  } catch (error) {
    return next(error);
  }
}

export async function searchUser(req, res, next) {
  try {
    const { key } = req.body;
    const user = await UserService.searchUser(key);
    return res.json({
      success: true,
      payload: user
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser( req, res, next ) {
  try {
    const userId = req.params.id;
    const user = UserService.deleteUser( userId );
    return res.json({
      success: true,
      payload: 'delete user completed !'
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateUserInfo( req, res, next ) {
  try {
    const userId = req.params.id;
    const { body } = req;
    const user = await UserService.updateUserInfor( userId, body );
    return res.json({
      success: true,
      payload: user
    })
  } catch (error) {
    return next(error);
  }
}

export async function updateUserAvatar( req, res, next ) {
  try {
    const userId = req.params.id;
    const avatar = req.file;
    const userAvatar = await UserService.updateUserAvatar(userId, avatar);
    return res.json({
      success: true,
      payload: userAvatar
    });
  } catch (error) {
    return next(error);
  }
}

export async function countUser(req, res, next) {
  try {
    const number = await UserService.countUser();
    return res.json({
      success: true,
      payload: number
    });
  } catch (error) {
    return next(error);
  }
}