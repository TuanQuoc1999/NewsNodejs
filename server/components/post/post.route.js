import { Router } from 'express';
import { isAuthorized } from '../../api/auth.middleware';
import * as PostController from './post.controller';
import * as PostMulter from './post.multer';
import * as PostValidator from './post.validator';

const router = new Router();

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Add new post
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *         example: {
 *           "idPageComponent": "5faa97bcf5d00521c8548c9d",
 *           "name": "post",
 *           "title": "post",
 *           "content": "this is my post"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your contact info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": {
 *                "_id": "5fabad98c15b6f26b47a2c90",
 *                "idPageComponent": "5faa97bcf5d00521c8548c9d",
 *                "name": "post",
 *                "title": "post",
 *                "content": "this is my post",
 *                "createdAt": "2020-09-01T11:29:41.663Z",
 *                "updatedAt": "2020-09-01T11:29:41.663Z",
 *             }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/create')
  .post(
    isAuthorized(),
    PostMulter.postImageUploader,
    PostController.createPost,
  );

/**
* @swagger
* /posts/{id}:
*   put:
*     summary: Update post from admin
*     tags:
*       - Posts
*     parameters:
*       - in: "path"
*         name: "id"
*         description: ID of the post 
*         required: true
*       - in: body
*         name: body
*         description: update post info by admin
*         required: true
*         properties:
*           page:
*             type: object
*         example: {
*           "name": "about"
*         }
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Your post detail info
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
*         description: ID post not found
*         schema:
*           type: string
*           example: "ID post not found"
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
router.route('/:id')
  .put(
    // isAuthorized(),
    PostController.updatePost,
  )

/**
* @swagger
* /posts/{id}:
*   delete:
*     tags:
*       - Posts
*     summary: Delete post by ID
*     description: This can only be done by the logged in page.
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of the post that needs to be get in delete"
*         required: true
*     responses:
*       200:
*         description: Delete post account complete
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: The post delete
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
    // isAuthorized(),
    PostController.deletePost,
  )

/**
* @swagger
* /posts/getall:
*   get:
*     summary: Get pageComponent
*     tags:
*       - Posts
*     parameters:
*       - name: "limit"
*         in: "query"
*         description: "Specifies the maximum number of post the query will return."
*         required: true
*       - name: "page"
*         in: "query"
*         description: "Specifies the number of post ."
*         required: true
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Your post info
*         schema:
*           type: object
*           example: {
*             "success": true,
*             "payload": [{
*            "_id": "5faa97bcf5d00521c8548c9d",
*            "idPageComponent": "5faa504ef32d2b0998a57e23",
*            "name": "post",
*            "title": "post",
*            "content": "this is my post",
*            "createdAt": "2020-11-10T04:05:35.489Z",
*            "updatedAt": "2020-11-10T04:05:35.489Z",
*            "__v": 0
*        },
*        {
*            "_id": "5faa100f57c9f42584442a7d",
*            "idPageComponent": "5facea4e3d9a471e30d61278",
*            "name": "post 1",
*            "title": "post 1",
*            "content": "this is my about post 1",
*            "createdAt": "2020-11-10T03:59:11.246Z",
*            "updatedAt": "2020-11-10T04:32:49.054Z",
*            "__v": 0
*        }]
*          }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
router.route('/getall')
  .get(
    // isAuthorized(),
    PostController.getAll,
  )

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post detail from list page of database
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the post that needs to be get in detail"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your post detail info
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
 *         description: ID post not found
 *         schema:
 *           type: string
 *           example: "ID post not found"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/:id')
  .get(
    // isAuthorized(),
    PostController.getByID,
  )

router.route('/uploadimage/:id')
  .put(
    isAuthorized(),
    PostValidator.uploadPostImage,
    PostMulter.postImageUploader,
    PostController.uploadImage,
  )

/**
 * @swagger
 * /posts/count/post:
 *   get:
 *     summary: count all post
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: number of post
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
router.route('/count/post')  
  .get(
    isAuthorized(),
    PostController.countPost,
  )
export default router;