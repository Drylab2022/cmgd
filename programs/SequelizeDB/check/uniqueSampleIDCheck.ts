import {DefineTable} from "../tableCreator";
import {log} from "../../log/logger";

require("../../config/configDefault")
import {seq} from "../connect"
import {DataTypes, Op, fn, col, where} from "sequelize"
import {isNumber} from "util";

//0:得到一个专门用来插入唯一性字符串的临时表
async function getUniqueTempTable() {
    //以上的fs就是我们自动创建的字段对象
    let result: any = seq.define(
        "tempUniqueTable"
        , {
            value: {
                //类型是字符串
                type: DataTypes.STRING(8192)
                , allowNull: false//不许为空
                , unique: true//唯一性
            },
            source:DataTypes.STRING(8192)
        }
        , {tableName: "tempUniqueTable"}
    );
    //临时表需要重建
    await result.sync({force: true});
    return result;
}

//1.得到所有研究
async function getAllStudies() {
    //1.建
    let DT: any = await DefineTable('studies', ['studyName']);
    //await dt.sync({force: true});
    //2.查
    const dts = await DT.findAll({
            where: {
                v: true
            }
        }
    );
    return dts;
}

//单元测试程序
async function unitTest() {
    //1.得到study列表
    let studies: any = await getAllStudies();
    //2.得到一个去重使用的临时表
    let tempTable: any = await getUniqueTempTable();
    let dtNames = [];
    studies.forEach(v => {
        dtNames.push(v.studyName);
    });
    let counter: number = 0;
    for (let index: number = 0; index < studies.length; index++) {
        //1.建
        const dtName: string = dtNames[index];
        const DT: any = await DefineTable(dtName, ['sampleID']);
        //2.查
        console.log(dtName);
        const dt = await DT.findAll({attributes: ['sampleID']});
        for (let rowIndex: number = 0; rowIndex < dt.length; rowIndex++) {
            const row = dt[rowIndex];
            const sid = row['sampleID'];
            counter++;
            try {
                await tempTable.create({value:sid,source:dtName});
            } catch (e) {
                log.error("================================================================================");
                log.error(dtName+"导致样本ID重复:"+sid);
                log.error(e);
            }
        }
    }
    console.log("样本容量:" + counter);
}

if (module === require.main) {
    unitTest()
    // .then(() => {
    //     console.log("单元测试成功!")
    // })
    // .catch(() => {
    //     console.log("单元测试失败!")
    // })
    // .finally(() => {
    //     console.log("单元测试完成!")
    // })
}
