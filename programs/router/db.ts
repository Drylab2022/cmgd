//第一部分：所有路由都相同的头部
import express=require("express");
const router=express.Router();
import {tableBaseV3} from "../sampleCenter/tableBaseV3";
import {seq} from "../SequelizeDB/connect"
import {Sequelize} from "sequelize";
import {log} from "../log/logger";
import {defaultConfig} from "../config/configBase"
import {tableBaseV1} from "../sampleCenter/tableBaseV1";

/**
 * @swagger
 * /db/connect4test:
 *   get:
 *     tags:
 *       - init
 *     summary: connect to database server for test the current config info
 *     parameters:
 *       - name: authcode
 *         description: password
 *         in: query
 *         required: true
 *         type: string
 *     produces:
 *     - application/json
 *     description: success information or error reason
 *     responses:
 *       "200":
 *         description: text for human reading
 */
router.get('/connect4test', async function (req, res) {
    let authcode=req.query.authcode;
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (authcode!="test1234"){
        res.end(JSON.stringify({status:"authcode error"}));
        return;
    }
    if (defaultConfig==null){
        res.end(JSON.stringify({status:"No suitable running environment was found"}));
        return;
    }
    try
    {
        await seq.authenticate();
        res.end(JSON.stringify({status:"connect successfully!"}));
        return;
    }
    catch (e) {
        const txt=JSON.stringify(e,["success","cause","message","errors","value","count"]);
        res.end(txt);
    }
    return;
});

/**
 * @swagger
 * /db/recreatetables:
 *   get:
 *     tags:
 *       - init
 *     summary: recreate all tables in the database. Note all previous information will be lost
 *     parameters:
 *       - name: authcode
 *         description: password
 *         in: query
 *         required: true
 *         type: string
 *     produces:
 *     - application/json
 *     description: success information or error reason
 *     responses:
 *       "200":
 *         description: text for human reading
 */
router.get('/recreatetables', async function (req, res) {
    let authcode=req.query.authcode;
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (authcode!="test1234"){
        res.end(JSON.stringify({status:"authcode error"}));
        return;
    }
    if (defaultConfig==null){
        res.end(JSON.stringify({status:"No suitable running environment was found"}));
        return;
    }
    try
    {
        let obj: tableBaseV1 = new tableBaseV3();
        obj.tableName = "samples";
        obj.schema = "public";
        await obj.createTable();
        res.end(JSON.stringify({status:"recreate tables successfully!"}));
        return;
    }
    catch (e) {
        const txt=JSON.stringify(e,["success","cause","message","errors","value","count"]);
        res.end(txt);
    }
    return;
});

//最后部分：是把路由暴露给其它模块的代码
module.exports=router;