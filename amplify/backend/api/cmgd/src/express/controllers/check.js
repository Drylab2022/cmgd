const PropertyChecker = require("../utils/PropertyChecker");

module.exports = {
    async check(req, res) {
        const checkResult = await PropertyChecker.check(req.body);
        const statusCode = checkResult.length === 0 ? 200 : 400;

        res.status(statusCode).send(checkResult);
    }
};
