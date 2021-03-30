Set up server:

1. Install docker:

For desktop
For Ubuntu server


2. Install docker-compose


3. Start docker:

Config:

Config docker:
Copy file docker-compose.template.yml to docker-compose.yml and update to your config
Config mongo:
Extract file mongo/secrets.zip.
Config mongo authentication.
Config env:
Copy file sample.env to .env and update to your config


Start docker:
docker-compose up -d

Enter docker:
docker exec -it tfw-backend bash

Run backend development:
npm start



4. Run source:
Run main service and worker service


Dev mode:
yarn dev
yarn dev:worker
or
npm start
npm run dev:worker


Production mode:
yarn prod
yarn worker
or
npm run prod
npm run worker



5. Docs page:
API docs

6. Requirement:

Every model must have a swagger definitions

import mongoose from 'mongoose';

/**
* @swagger
* definitions:
*  User:
*    type: object
*    properties:
*      id:
*        type: string
*      username:
*        type: string
*/
const UserSchema = new mongoose.Schema({
 username: { type: String, required: true, unique: true },
});

export default mongoose.model('User', UserSchema);

Every route must have a swagger document definitions

/**
* @swagger
* /users:
*   get:
*     summary: Get users
*     tags:
*       - User
*     responses:
*       200:
*         description: Get users
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               $ref: '#/definitions/User'
*           example: {
*             "success": true,
*             "payload": {
*               "id": "5c812eef0a60504e4c0cf84b",
*               "username": "John Smith"
*             }
*           }
*       404:
*         description: When the User not found
*       500:
*         description: When got server exception
*/
router.route('/')
 .get(UserController.getUser);


Every service function need return an APIError with statusCode and message:
We have an custom Error - APIError: it ship the statusCode inside to easy handle with Express.
You need to import it from server/util/APIError.js
Example:


  import APIError from 'server/util/APIError.js';
  // ...
  const error = new APIError(404, 'User not found');

Each controller function need return next(error) on catch,
it will forward the Error from service to Express Error handle

export async function getUser(req, res, next) {
 try {
   // Do something
 } catch (error) {
   logger.error('getUser error:');
   logger.error(error);
   
   /** FOCUS HERE **/
   return next(error);
 }
}

Success response structure:

 const successDataResponse = {
   success: true,
   payload: {}, // Any data here
 }

Fail response structure:

 const failDataResponse = {
   success: false,
   message: 'Internal server error', // Please don't response detail error to client
 }

Must use logger for important log:

 import logger from 'server/util/logger.js';
 // ...
 logger.debug('Debug');
 logger.info('Info');
 logger.error(Error('An error'));
 logger.error(new APIError(500, 'An error with statusCode'));

On catch block must use logger:

 try {
   // Do something
 } catch (error) {
   logger.error('error');
   logger.error(error);
 }

7. Multi language define:

- For express validation (status code 422):

In the validator file, if have the params, let define the message is an array contains 2 items:

 body('password').isLength({ min: USER_MIN_PASSWORD_LENGTH }).withMessage([
   'Password must be at least %s chars long',
   [USER_MIN_PASSWORD_LENGTH]
 ])
The first item is the message template, the second item is the value pass to the params in the template

- Define language in locales:
Open the locales file and define your text

Code rules:

Turn on eslint
Try to fix all syntax errors warning by eslint
Fix all errors on browser console
Try to fix all warnings on browser console


Git rules:

Create new branch for feature/bug:

If the task is new feature, branch name is: feature/task-name, create branch from branch develop
If the task is bug, branch name is: bug/task-name, create branch from branch master


Create new merge request:

If the branch is new feature, create merge request to branch develop
If the branch is bug, create merge request to branch master


If have others cases, contact project maintainer