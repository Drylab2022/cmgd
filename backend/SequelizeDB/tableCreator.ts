//表控制器:主要用来导入CSV文件中的数据
require("../config/configDefault")

import {seq} from "./connect"

import {DataTypes} from "sequelize"

export async function DefineTable(tableName: string, fieldsName: string[]) {
    //ft是字段类型的缩写(默认是255)
    //测试发现超长字段所以我们先设置成8192长，发现不够的话再增长
    let ft = DataTypes.STRING(8192);
    //fs是fields的缩写
    let fs = {};
    for (let index: number = 0; index < fieldsName.length; index++) {
        fs = Object.defineProperty(fs,
            fieldsName[index], {
                configurable: true,
                enumerable: true,
                value: ft
            }
        )
    }
    //以上的fs就是我们自动创建的字段对象
    let result: any = seq.define(tableName, fs, {tableName: tableName});
    return result;
}

export async function CreateTable(tableName: string, fieldsName: string[]) {
    let result: any = await DefineTable(tableName, fieldsName);
    await result.sync({force: true});
    return result;
}

async function unitTest() {
    for (let t: number = 1; t < 3; t++) {
        let fs: Array<string> = [];
        for (let c = 1; c < 1598; c++) {
            fs.push("f" + c);
        }
        let tmp = await CreateTable("test" + t, fs);
        //尝试插入数据
        tmp.create({f1: 'xxx', f2: 'yyy', f3: 'zzz'});
    }
}


if (module === require.main) {
    //曾经得到过异常:(node:10544) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: tables can have at most 1600 columns
    console.log("表最多1600列,注意因为还有些自动添加的列");
    unitTest();
}