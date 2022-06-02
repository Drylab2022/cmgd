const router = require("express").Router();
const cognitoController = require("../controllers/").cognito;

/**
 * @openapi
 * /api/token:
 *   post:
 *     tags:
 *       - Oauth2
 *     summary: Get id token from cognito user pool, then put this id into Authorize value to access role based APIs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *                 example: hongjiancui
 *               password:
 *                 type: string
 *                 description: password
 *                 example: Drylab2022!
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Return id token
 *       400:
 *         description: Incorrect username or password
 */
router.post("/", cognitoController.getToken);

module.exports = router;