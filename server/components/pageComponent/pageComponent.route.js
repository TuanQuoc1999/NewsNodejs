import { Router } from 'express';
import { isAuthorized } from '../../api/auth.middleware';
import * as pageComponentController from './pageComponent.controller';

const router = new Router();

/**
 * @swagger
 * /pagecomponents/create:
 *   post:
 *     summary: Add new page
 *     tags:
 *       - PageComponents
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *         example: {
 *           "idPage": "5faa504ef32d2b0998a57e23",
 *           "name": "About us",
 *           "title": "About",
 *           "description": "this is my about us"
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
 *                "_id": "5faa5ad6dde15621f8f26c08",
 *                "idPage": "5faa504ef32d2b0998a57e23",
 *                "name": "About us",
 *                "title": "About",
 *                "description": "this is my about us",
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
    pageComponentController.createPageComponent,
  )

/**
* @swagger
* /pagecomponents:
*   get:
*     summary: Get pageComponent
*     tags:
*       - PageComponents
*     parameters:
*       - name: "limit"
*         in: "query"
*         description: "Specifies the maximum number of pageComponents the query will return."
*         required: true
*       - name: "page"
*         in: "query"
*         description: "Specifies the number of pageComponents ."
*         required: true
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Your pageComponent info
*         schema:
*           type: object
*           example: {
*             "success": true,
*             "payload": [{
*            "_id": "5faa97bcf5d00521c8548c9d",
*            "idPage": "5faa504ef32d2b0998a57e23",
*            "name": "Home",
*            "title": "About",
*            "description": "this is my about us",
*            "createdAt": "2020-11-10T04:05:35.489Z",
*            "updatedAt": "2020-11-10T04:05:35.489Z",
*            "__v": 0
*        },
*        {
*            "_id": "5faa100f57c9f42584442a7d",
*            "name": "About1",
*            "title": "About1",
*            "description": "this is my about us 1",
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
router.route('/')
  .get(
    isAuthorized(),
    pageComponentController.getAll,
  )

/**
 * @swagger
 * /pagecomponents/{id}:
 *   get:
 *     summary: Get pagecomponents detail from list page of database
 *     tags:
 *       - PageComponents
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the pageComponent that needs to be get in detail"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your pageComponent detail info
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
 *         description: ID pageComponent not found
 *         schema:
 *           type: string
 *           example: "ID Component not found"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/:id')
  .get(
    isAuthorized(),
    pageComponentController.getById,
  )

/**
* @swagger
* /pagecomponents/{id}:
*   put:
*     summary: Update pageComponent from admin
*     tags:
*       - PageComponents
*     parameters:
*       - in: "path"
*         name: "id"
*         description: ID of the pageComponent 
*         required: true
*       - in: body
*         name: body
*         description: update pageComponent info by admin
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
*         description: ID PageComponent not found
*         schema:
*           type: string
*           example: "ID PageComponent not found"
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
router.route('/:id')
  .put(
    isAuthorized(),
    pageComponentController.updatePageComponent,
  )

/**
* @swagger
* /pagecomponents/{id}:
*   delete:
*     tags:
*       - PageComponents
*     summary: Delete pageComponent by ID
*     description: This can only be done by the logged in page.
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of the pageComponent that needs to be get in delete"
*         required: true
*     responses:
*       200:
*         description: Delete pageComponent account complete
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: The pageComponent delete
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
    pageComponentController.deletePageComponent,
  )

/**
 * @swagger
 * /pagecomponents/count/pagecomponent:
 *   get:
 *     summary: count all pagecomponent
 *     tags:
 *       - PageComponents
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: number of pagecomponent
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
router.route('/count/pagecomponent') 
  .get(
    // isAuthorized(),
    pageComponentController.countPageComponent,
  )
export default router;