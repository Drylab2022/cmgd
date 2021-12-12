require("../../config/configDefault")

import {seq} from "../connect"

import {DataTypes,Op} from "sequelize"

async function unitTest() {
    //1.建
    let DT = seq.define('testTable', {
        info: DataTypes.JSONB,
        condition: DataTypes.STRING
    });
    //await dt.sync({force: true});
    //2.增
    let dt = DT.create({
        info: {
            "id": 33,
            "name": "张三",
            "age": 13
        },
        condition: "test"
    });
    //3.查
    let dt2 = await DT.findOne({
            where: {
                "info.age": {
                    [Op.gt]: 15
                }
            }
        }
    )
    console.log(dt2);
}

if (module === require.main) {
    unitTest()
        .then(() => {
            console.log("单元测试成功!")
        })
        .catch(() => {
            console.log("单元测试失败!")
        })
        .finally(() => {
            console.log("单元测试完成!")
        })
}

