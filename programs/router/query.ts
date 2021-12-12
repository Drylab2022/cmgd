//第一部分：所有路由都相同的头部
import express=require("express");
const router=express.Router();
import {tableBaseV3} from "../sampleCenter/tableBaseV3";

/**
 * @swagger
 * /query/last:
 *   get:
 *     tags:
 *       - query
 *     summary: directly get last sample without input
 *     produces:
 *     - application/json
 *     description: get last inserted sample
 *     responses:
 *       "200":
 *         description: success ，last inserted sample。
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
        res.writeHead(200, {'Content-Type': 'application/json'});
        objJson=JSON.stringify(objJson.data);
        res.end(objJson);
    }
});

/**
 * @swagger
 * /query/where:
 *   post:
 *     tags:
 *       - query
 *     summary: get samples that meet the conditions
 *     requestBody:
 *       description: where conditions
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               "age":
 *                 "gt": 0
 *     produces:
 *     - application/json
 *     description: samples that meet the conditions
 *     responses:
 *       "200":
 *         description: 200 is the only code。Success or failure please check member of response body
 */
router.post('/where', async function (req, res) {
    let obj: tableBaseV3 = new tableBaseV3();
    obj.tableName = "samples";
    obj.schema = "public";
    var suc:boolean=await obj.querySamples(req.body)
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (suc) {
        const txt=JSON.stringify(obj.errorObject);
        res.end(txt);
    }
    else
    {
        const txt=JSON.stringify(obj.errorObject,["success","cause","message","errors","value","count","sql"]);
        res.end(txt);
    }
});

//最后部分：是把路由暴露给其它模块的代码
module.exports=router;