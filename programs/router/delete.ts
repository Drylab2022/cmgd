//第一部分：所有路由都相同的头部
import express=require("express");
const router=express.Router();
import {tableBaseV3} from "../sampleCenter/tableBaseV3";

/**
 * @swagger
 * /delete/where:
 *   post:
 *     tags:
 *       - delete
 *     summary: Delete samples that meet the conditions
 *     requestBody:
 *       description: where conditions
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               "sampleID": "CCIS91228662ST-4-0test2"
 *         application/json/conditions_and:
 *           schema:
 *             type: object
 *             example:
 *               "sampleID": "CCIS91228662ST-4-0"
 *       required: true
 *     responses:
 *       "200":
 *         description: 200 is the only code。Success or failure please check member of response body
 */
router.post('/where', async function (req, res) {
    let obj: tableBaseV3 = new tableBaseV3();
    obj.tableName = "samples";
    obj.schema = "public";
    var result:any=await obj.deleteSamples(req.body)
    res.writeHead(200, {'Content-Type': 'application/json'});
    const txt=JSON.stringify(obj.errorObject,["success","cause","message","errors","value","count"]);
    res.end(txt);
});


/**
 * @swagger
 * /delete/last:
 *   get:
 *     tags:
 *       - delete
 *     summary: directly delete last sample without input
 *     produces:
 *     - application/json
 *     description: get last inserted sample
 *     responses:
 *       "200":
 *         description: 200 delete successfully
 *       "404":
 *         description: not found last sample, number of samples is zero。
 */
router.get('/last', async function (req, res) {
    let obj: tableBaseV3 = new tableBaseV3();
    obj.tableName = "samples";
    obj.schema = "public";
    var objJson:any=await obj.last();

    if (objJson==null)
    {
        res.status(404)
        res.send("not found!")
    }
    else{
        await obj.deleteSamples({"sampleID":objJson["sampleID"]})
        res.status(200)
        res.send("delete successfully!")
    }
});

//最后部分：是把路由暴露给其它模块的代码

module.exports=router;