import { Router } from 'express';
import * as UserController from './user.controller';
import * as UserValidator from './user.validator';
import * as UserMulter from './user.multer';
import { isAuthorized } from '../../api/auth.middleware';

const router = new Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register to your account. You need to input username, email, fullName and password.
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: fullName
 *         type: string
 *         required: true
 *         description: The name of Employee
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: The email of Employee
 *       - in: formData
 *         name: username
 *         type: string
 *         required: true
 *         description: The username of Employee
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: The password of Employee
 *       - in: formData
 *         name: user-avatar
 *         type: file
 *         description: The avatar user upload type jpg|jpeg|png|gif
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *               status: 3,
 *               _id: 5f4dc671b4f8b12e98f3e700,
 *               username: exapmle,
 *               email: example@mail.com,
 *               fullName: example,
 *               token: "JWT token"
 *             }
 *           }
 *       403:
 *         description: When data cannot be process. If got "Email is not verified" add verificationCode to body - verificationCode get from email
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "msg": "The email address that you've entered doesn't match any account.",
 *                 "param": "emailNotRegistered",
 *               },
 *               {
 *                 "msg": "Email or password is not correct",
 *                 "param": "emailPassword",
 *               },
 *               {
 *                 "msg": "Verify code expired",
 *                 param: 'verificationCodeExpired',
 *               },
 *               {
 *                 "msg": "Verification code is not correct",
 *                 param: 'verificationCode',
 *               },
 *               {
 *                 "msg": "We already send verification code to your email: example@email.com please check your email inbox",
 *                 param: 'verificationCodeExisted',
 *               },
 *               {
 *                 "msg": "Email is not verified. We had sent the verification to your email: example@email.com",
 *                 param: 'emailNotVerified',
 *               },
 *               {
 *                 "msg": "Account is not available",
 *                 param: 'accountInactive',
 *               },
 *               {
 *                 "msg": "Your account was deactivated by administrator",
 *                 param: 'accountDeactivated',
 *               }
 *             ]
 *           }
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "mail mail",
 *                 "msg": "must be an email",
 *                 "param": "email",
 *                 "location": "body"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 *
 */
router.route('/register')
  .post(
    isAuthorized(),
    UserMulter.userAvatarUploader,
    UserController.register,
  );

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login to your account. If your email is not verify, push verificationCode from your email to request body
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           verificationCode:
 *             type: string
 *         example: {
 *           "email": "admin@mail.com",
 *           "password": "admin1234",
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *               _id: "5bea5655d05143d8a576a5a9",
 *               firstName: "Join",
 *               lastName: "Smith",
 *               email: "example@email.com",
 *               companyName: "MY COMPANY .INC",
 *               phone: "+20323243434",
 *               address1: "1, Wall Stress",
 *               address2: "2, Wall Stress",
 *               zipCode: "70000",
 *               country: {
 *                 _id: "5e256e390c1c910185a74993",
 *                 name: "Vietnam",
 *                 ISO2: "VN",
 *                 ISO3: "VNM"
 *               },
 *               state: {
 *                 _id: "5bea5655d05143d8a576a5a9",
 *                 name: "My State"
 *               },
 *               city: "My city",
 *               role: 1,
 *               language: "en",
 *               token: "JWT token"
 *             }
 *           }
 *       403:
 *         description: When data cannot be process. If got "Email is not verified" add verificationCode to body - verificationCode get from email
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "msg": "The email address that you've entered doesn't match any account.",
 *                 "param": "emailNotRegistered",
 *               },
 *               {
 *                 "msg": "Email or password is not correct",
 *                 "param": "emailPassword",
 *               },
 *               {
 *                 "msg": "Verify code expired",
 *                 param: 'verificationCodeExpired',
 *               },
 *               {
 *                 "msg": "Verification code is not correct",
 *                 param: 'verificationCode',
 *               },
 *               {
 *                 "msg": "We already send verification code to your email: example@email.com please check your email inbox",
 *                 param: 'verificationCodeExisted',
 *               },
 *               {
 *                 "msg": "Email is not verified. We had sent the verification to your email: example@email.com",
 *                 param: 'emailNotVerified',
 *               },
 *               {
 *                 "msg": "Account is not available",
 *                 param: 'accountInactive',
 *               },
 *               {
 *                 "msg": "Your account was deactivated by administrator",
 *                 param: 'accountDeactivated',
 *               }
 *             ]
 *           }
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "mail mail",
 *                 "msg": "must be an email",
 *                 "param": "email",
 *                 "location": "body"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/login')
  .post(
    UserValidator.userLoginValidator,
    UserController.login,
  );

/**
 * @swagger
 * /users/avatar:
 *   put:
 *     summary: Update user avatar
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: user-avatar
 *         type: file
 *         description: The avatar user upload type jpg|jpeg|png|gif
 *     responses:
 *       200:
 *         description: The user avatar uploaded
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The user avatar url
 *           example: {
 *             'success': true,
 *             'payload': 'uploads/user-avatar/5bea5655d05143d8a576a5d9.png',
 *           }
 *       403:
 *         description: When upload user avatar have invalid input value
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 msg: 'User avatar file is invalid, only image files are allowed!',
 *                 param: 'userAvatarInvalid',
 *                 location: 'body',
 *               },
 *               {
 *                 msg: 'User avatar file was not found',
 *                 param: 'userAvatarNotFound',
 *                 location: 'body',
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 */
router.route('/avatar')
.put(
  isAuthorized(),
  UserMulter.userAvatarUploader,
  UserValidator.uploadUserAvatar,
  UserController.uploadUserAvatar,
);

/**
 * @swagger
 * /users/getall:
 *   get:
 *     summary: Get all user info
 *     tags:
 *       - User
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Specifies the maximum number of users the query will return."
 *         required: true
 *       - name: "page"
 *         in: "query"
 *         description: "Specifies the number of users page."
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *               role: null,
 *               status: 3,
 *               _id: 5f4dc671b4f8b12e98f3e700,
 *               username: exapmle,
 *               email: example@mail.com,
 *               fullName: example,
 *               token: "JWT token"
 *             }
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/getall') 
  .get(
    isAuthorized(),
    UserController.getAll,
  )

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user detail from list user of database
 *     tags:
 *       - User
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the user that needs to be get in detail"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your user detail info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": string
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       404:
 *         description: ID user not found
 *         schema:
 *           type: string
 *           example: "ID user not found"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/:id') 
  .get(
    isAuthorized(),
    UserController.getUserById,
  )

/**
 * @swagger
 * /users/search:
 *   post:
 *     summary: Get user search from list user of database
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           role:
 *             key: string
 *         example: {
 *           "key": "admin"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your user search detail info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": string
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       404:
 *         description: User not found
 *         schema:
 *           type: string
 *           example: "User not found"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/search')
  .post(
    isAuthorized(),
    UserController.searchUser,
  );
/**
* @swagger
* /users/{id}:
*   delete:
*     tags:
*       - User
*     summary: Delete user by ID
*     description: This can only be done by the logged in user.
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of the user that needs to be get in delete"
*         required: true
*     responses:
*       200:
*         description: Delete user account complete
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: The user delete
*           example: {
*             'success': true,
*             'payload': 'Delete success',
*           }
*       401:
*         description: When your token is invalid. You'll get Unauthorized msg
*         schema:
*           type: array
*           items:
*             type: object
*             properties:
*               $ref: '#/definitions/ValidatorErrorItem'
*           example: "Unauthorized"
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
router.route('/:id')
  .delete(
    isAuthorized(),
    UserController.deleteUser,
  )

/**
* @swagger
* /users/{id}:
*   put:
*     summary: Update user from admin
*     tags:
*       - User
*     parameters:
*       - in: "path"
*         name: "id"
*         description: ID of the username employee
*         required: true
*       - in: body
*         name: body
*         description: update user infor by admin
*         required: true
*         properties:
*           user:
*             type: object
*         example: {
*           "status": "3",
*           "username": "example",
*           "email": "test@mail.com",
*           "fullName": "Nguyen van A"
*         }
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Your user detail info
*         schema:
*           type: object
*           example: {
*             "success": true,
*             "payload": string
*           }
*       401:
*         description: When your token is invalid. You'll get Unauthorized msg
*         schema:
*           type: array
*           items:
*             type: object
*             properties:
*               $ref: '#/definitions/ValidatorErrorItem'
*           example: "Unauthorized"
*       404:
*         description: ID user not found
*         schema:
*           type: string
*           example: "ID user not found"
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
router.route('/:id')
  .put(
    isAuthorized(),
    UserController.updateUserInfo,
  )

/**
 * @swagger
 * /users/avatar/{id}:
 *   put:
 *     summary: Update a avatar user by admin
 *     tags:
 *       - User
*     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the user that needs to be update"
 *         required: true
 *       - in: formData
 *         name: user-avatar
 *         type: file
 *         description: The avatar user upload type jpg|jpeg|png|gif
  *     responses:
 *       200:
 *         description: The user avatar uploaded
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The user avatar url
 *           example: {
 *             'success': true,
 *             'payload': 'uploads/user-avatar/5bea5655d05143d8a576a5d9.png',
 *           }
 *       403:
 *         description: When upload user avatar have invalid input value
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 msg: 'User avatar file is invalid, only image files are allowed!',
 *                 param: 'userAvatarInvalid',
 *                 location: 'body',
 *               },
 *               {
 *                 msg: 'User avatar file was not found',
 *                 param: 'userAvatarNotFound',
 *                 location: 'body',
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 */
router.route('/avatar/:id')
  .put(
    isAuthorized(),
    UserMulter.userAvatarUploader,
    UserValidator.uploadUserAvatar,
    UserController.updateUserAvatar,
  )

/**
 * @swagger
 * /users/count/user:
 *   get:
 *     summary: count all user
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: number of user
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *               "success": true,
 *               "payload": 3,
 *             }
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/count/user')
  .get(
    isAuthorized(),
    UserController.countUser,
  )
export default router;
