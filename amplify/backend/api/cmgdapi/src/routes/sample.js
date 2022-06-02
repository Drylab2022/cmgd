const router = require("express").Router();
const sampleController = require("../controllers/").sample;

/**
 * @openapi
 * /api/samples/{sampleId}:
 *   get:
 *     tags:
 *       - samples
 *     summary: Get information about a sample
 *     security:
 *      - Oauth2:
 *        - Reviewer
 *     parameters:
 *       - name: sampleId
 *         in: path
 *         required: true
 *         description: The id of the sample to retrieve
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Returns a sample
 *       400:
 *         description: Invalid ID provided
 *       404:
 *         description: Sample not found
 */
router.get("/:id", sampleController.getByPk);
router.post("/", sampleController.upSert);

module.exports = router;
