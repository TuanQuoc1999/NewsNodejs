import { Router } from 'express';
import { isAuthorized } from '../../api/auth.middleware';
import * as pageController from './page.controller';

const router = new Router();

/**
 * @swagger
 * /pages/create:
 *   post:
 *     summary: Add new page
 *     tags:
 *       - Pages
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *         example: {
 *           "name": "Home",
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
 *                "_id": "5f4e30a5242b7c18b446bb68",
 *                "name": "Home",
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
		pageController.createPage,
	);

/**
* @swagger
* /pages/{id}:
*   put:
*     summary: Update page from admin
*     tags:
*       - Pages
*     parameters:
*       - in: "path"
*         name: "id"
*         description: ID of the page 
*         required: true
*       - in: body
*         name: body
*         description: update page info by admin
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
*         description: Your page detail info
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
		pageController.updatePage,
	)

/**
* @swagger
* /pages/getall:
*   get:
*     summary: Get page
*     tags:
*       - Pages
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
*         description: Your page info
*         schema:
*           type: object
*           example: {
*             "success": true,
*             "payload": [{
*            "_id": "5faa118f2a477406d88fa569",
*            "name": "Home",
*            "createdAt": "2020-11-10T04:05:35.489Z",
*            "updatedAt": "2020-11-10T04:05:35.489Z",
*            "__v": 0
*        },
*        {
*            "_id": "5faa100f57c9f42584442a7d",
*            "name": "about",
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
		isAuthorized(),
		pageController.getAll,
	)

/**
 * @swagger
 * /pages/{id}:
 *   get:
 *     summary: Get page detail from list page of database
 *     tags:
 *       - Pages
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the page that needs to be get in detail"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your page detail info
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
		pageController.getById,
	)

/**
* @swagger
* /pages/{id}:
*   delete:
*     tags:
*       - Pages
*     summary: Delete page by ID
*     description: This can only be done by the logged in page.
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of the page that needs to be get in delete"
*         required: true
*     responses:
*       200:
*         description: Delete page account complete
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: The page delete
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
		pageController.deletePage,
	)

/**
 * @swagger
 * /pages/count/page:
 *   get:
 *     summary: count all page
 *     tags:
 *       - Pages
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: number of page
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
	router.route('/count/page') 
  .get(
    // isAuthorized(),
    pageController.countPage,
  )
export default router;