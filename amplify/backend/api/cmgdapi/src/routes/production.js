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
 *               and:
 *                 type: string
 *                 description: operation statement
 *                 example: [{"test": {"gt": 0}},{"test": {"lt": 3}}]
 *             required:
 *               - operations
 *     responses:
 *       200:
 *         description: Return filtered samples
 *       400:
 *         description: Invalid operations in request body
 */
router.post("/search", productionController.search);

module.exports = router;