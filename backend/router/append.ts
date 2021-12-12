//第一部分：所有路由都相同的头部
import express=require("express");
const router=express.Router();
import {tableBaseV3} from "../sampleCenter/tableBaseV3";

/**
 * @swagger
 *   /append/new:
 *   post:
 *     tags:
 *       - append
 *     produces:
 *     - application/json
 *     summary: directly append as last sample
 *     requestBody:
 *       description: sample object that needs to be added to the sample center
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *               "BMI": "31.0"
 *               "age": "63"
 *               "tnm": "t1n0m0"
 *               "PMID": "25432777"
 *               "ajcc": "i"
 *               "fobt": "no"
 *               "gender": "male"
 *               "country": "FRA"
 *               "curator":
 *                 - "Paolo_Manghi"
 *               "disease":
 *                 - "CRC"
 *               "sampleID": "CCIS91228662ST-4-0"
 *               "body_site": "stool"
 *               "subjectID": "FR-275"
 *               "age_category": "adult"
 *               "number_bases": "8027807010"
 *               "number_reads": "94076829"
 *               "NCBI_accession":
 *                 - "ERR479389"
 *                 - "ERR479390"
 *                 - "ERR480885"
 *                 - "ERR480886"
 *               "disease_subtype": "carcinoma"
 *               "non_westernized": "no"
 *               "study_condition": "CRC"
 *               "DNA_extraction_kit": "Gnome"
 *               "median_read_length": "92"
 *               "minimum_read_length": "45"
 *               "sequencing_platform": "IlluminaHiSeq"
 *               "antibiotics_current_use": "NA"
 *       required: true
 *     responses:
 *       "200":
 *         description: 200 is the only code。Success or failure please check the member success of response body
 */
router.post('/new', async function (req, res) {
    let obj: tableBaseV3 = new tableBaseV3();
    obj.tableName = "samples";
    obj.schema = "public";
    var result:any=await obj.append(req.body)
    res.writeHead(200, {'Content-Type': 'application/json'});
    const txt=JSON.stringify(obj.errorObject,["success","cause","message","errors","value","original","detail"]);
    res.end(txt);
});

//失败的时候，为了精确的知道出错原因
//返回错误信息应该比较多一些。所以，错误信息，仍然以json的形式返回。

//最后部分：是把路由暴露给其它模块的代码
module.exports=router;