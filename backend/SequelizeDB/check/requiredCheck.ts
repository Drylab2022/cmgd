import {DefineTable} from "../tableCreator";
import {log} from "../../log/logger";
require("../../config/configDefault")
import {seq} from "../connect"
import {DataTypes, Op, fn, col} from "sequelize"

//1.得到所有研究
async function getStudies() {
    //1.建
    let DT: any = await DefineTable('studies', ['studyName']);
    //await dt.sync({force: true});
    //2.查
    const dts = await DT.findAll();
    return dts;
}

//2.得到必须字段
async function getRequiredFields() {
    //1.建
    let DT: any = await DefineTable('fieldsDef', [
        'col.name', 'uniqueness', 'requiredness', 'multiplevalues', 'allowedvalues'
    ]);

    //await dt.sync({force: true});
    //2.查
    const dts = await DT.findAll({
        where: {requiredness: 'required'}
    });
    return dts;
}

//单元测试程序
async function unitTest() {
    //1.先得到必须字段
    let requireFields: any = await getRequiredFields();
    let fields = [];
    requireFields.forEach(v => {
        fields.push(v["col.name"]);
    });
    //2.得到study列表
    let studies: any = await getStudies();
    let dtNames = [];
    studies.forEach(v => {
        dtNames.push(v.studyName);
    });
    for (let index: number = 0; index < studies.length; index++) {
        //1.建
        const dtName: string = dtNames[index];
        const DT: any = await DefineTable(dtName, fields);
        //2.查
        console.log(dtName);
        for (let fi: number = 0; fi < fields.length; fi++) {
            const fieldName = fields[fi];
            console.log("\t" + fieldName);
            try {
                const dt = await DT.findAll({
                    attributes: [
                        [fn('COUNT', col(fieldName)), 'c']
                    ]
                });
                const cf = dt[0];
                const c = cf.dataValues["c"];
                console.log("\t\t" + c);
            }
            catch (e) {
                console.log("\t\t" + e);
                log.error(dtName+e);
            }
        }
    }
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
