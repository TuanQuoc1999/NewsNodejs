import { Router } from 'express';
import { isAuthorized } from '../../api/auth.middleware';
import * as contactController from './contact.controller';

const router = new Router();

/**
 * @swagger
 * /contacts/create:
 *   post:
 *     summary: Add new contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *         example: {
 *           "email": "client@gmail.com",
 *           "phone": "123456789",
 *           "fullName": "client",
 *           "note": "my product is damaged",
 *           "status": 1
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
 *                "email": "client@gmail.com",
 *                "phone": "123456789",
 *                "fullName": "client",
 *                "note": "my product is damaged",
 *                "Status": 1,
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
    contactController.createContact,
  )

/**
* @swagger
* /contacts/{id}:
*   put:
*     summary: Update contact from admin
*     tags:
*       - Contacts
*     parameters:
*       - in: "path"
*         name: "id"
*         description: ID of the contact 
*         required: true
*       - in: body
*         name: body
*         description: update contact info by admin
*         required: true
*         properties:
*           page:
*             type: object
*         example: {
*           "status": 2
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
*         description: ID contact not found
*         schema:
*           type: string
*           example: "ID contact not found"
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
router.route('/:id')
  .put(
    isAuthorized(),
    contactController.updateContact,
  )

/**
* @swagger
* /contacts/{id}:
*   delete:
*     tags:
*       - Contacts
*     summary: Delete contact by ID
*     description: This can only be done by the logged in page.
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of the contact that needs to be get in delete"
*         required: true
*     responses:
*       200:
*         description: Delete contact account complete
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: The contact delete
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
    contactController.deleteContact,
  )

/**
* @swagger
* /contacts/getall:
*   get:
*     summary: Get contact
*     tags:
*       - Contacts
*     parameters:
*       - name: "limit"
*         in: "query"
*         description: "Specifies the maximum number of contacts the query will return."
*         required: true
*       - name: "page"
*         in: "query"
*         description: "Specifies the number of contacts ."
*         required: true
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
router.route('/getall')
  .get(
    isAuthorized(),
    contactController.getAll
  )

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contacts detail from list page of database
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the contacts that needs to be get in detail"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your contact detail info
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
 *         description: ID contact not found
 *         schema:
 *           type: string
 *           example: "ID contact not found"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
router.route('/:id')
  .get(
    isAuthorized(),
    contactController.getById,
  )

/**
 * @swagger
 * /contacts/count/contact:
 *   get:
 *     summary: count all contact
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: number of contact
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
router.route('/count/contact')
  .get(
    isAuthorized(),
    contactController.countContact,
  )
export default router;