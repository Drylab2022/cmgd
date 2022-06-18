const router = require("express").Router();
const productionController = require("../controllers/").production;

/**
 * @openapi
 * /api/production/add:
 *   post:
 *     tags:
 *       - Production
 *     summary: Add data into production tables (ProjectProd & SampleProd)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Primary key of the project in Project table
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Add operation is finished
 *       400:
 *         description: Invalid ID provided
 *       404:
 *         description: id not found in Project table
 */
router.post("/add", productionController.addProduction);

/**
 * @openapi
 * /api/production/search:
 *   post:
 *     tags:
 *       - Production
 *     summary: Search samples
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: string
 *                 description: search conditions, optional
 *                 example: {"and": [{"age": {"gt": "0"}},{"age": {"lt": "100"}}]}
 *               timestamp:
 *                 type: string
 *                 description: search samples before this timestamp, optional, return latest samples in default without this parameter
 *                 example: {"lt": "2022-09-23"}
 *               page:
 *                 type: int
 *                 description: page number, index from 0
 *                 example: 0
 *               count:
 *                 type: int
 *                 description: total data number of current parameters
 *                 example: 10
 *               cascading_filter:
 *                 type: string
 *                 description: cascading conditions, optional
 *                 example: ["gender", "disease"]
 *             required:
 *               - page, count
 *     responses:
 *       200:
 *         description: Return filtered samples
 *       400:
 *         description: Invalid operations in request body
 */

router.post("/search", productionController.search);

/**
 * @openapi
 * /api/production/fields:
 *   get:
 *     tags:
 *       - Production
 *     summary: Return an array of properties from curation json
 *     responses:
 *       200:
 *         description: Returns all properties
 *       400:
 *         description: Error happened in backend
 */
router.get("/fields", productionController.getAllFields);

/**
 * @openapi
 * /api/production/fields/{field}:
 *   get:
 *     tags:
 *       - Production
 *     summary: Return an array of json objects
 *     parameters:
 *       - name: field
 *         in: path
 *         required: true
 *         description: The field name to count and retrieve
 *         type: string
 *         example: gender
 *     responses:
 *       200:
 *         description: Returns field related values with their count in an array
 *       400:
 *         description: Error happened in backend
 */
router.get("/fields/:field", productionController.countValue);

module.exports = router;
