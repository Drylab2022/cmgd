const PropertyChecker = require("../utils/PropertyChecker");

module.exports = {
    async check(req, res) {
        const checkResult = await PropertyChecker.checkSingleProperties(req.body.curation);

        if(checkResult) {
            res.status(200).send("Validation succeed");
        } else {
            res.status(400).send("Validation fail");
        }
    }
};
