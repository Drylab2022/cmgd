import {CreateTable, DefineTable} from "../SequelizeDB/tableCreator";
import {log} from "../log/logger";

require("../config/configDefault")
import {seq} from "../SequelizeDB/connect"
import {DataTypes, Op, fn, col} from "sequelize"

//这个表是用来存放所有样本的表,所以创建过程比较复杂
//正因为如此，这个数据表基础才分成多个版本逐渐完善
//这是一个模板实现了表的创建,到底创建后有哪些列：由派生类复杂完善
export class tableBaseV1 {
    public tableName: string;
    public schema: string;

    constructor() {
        this.tableName = "";
        this.schema = "";
    }

    private check(): boolean {
        if (this.tableName.length < 1) {
            log.error("必须设置样本表的表名");
            return false;
        }
        if (this.schema.length < 1) {
            log.error("必须设置存放样本表的schema");
            return false;
        }
        return true;
    }

    //返回字段列表
    protected async getFields() {
        return {}
    }

    //定义表
    protected async defineTable() {
        let fs: any = await this.getFields();
        //以上的fs就是我们自动创建的字段对象
        let result: any = seq.define(this.tableName, fs,
            {
                tableName: this.tableName
                , schema: this.schema
            });
        this.dt=result;
        return result;
    }

    //创建表
    protected dt: any;

    public async createTable() {
        if (!this.dt) {
            if (await this.check()) {
                //1.先把表定义出来
                this.dt = await this.defineTable();
                //2.然后同步更新
                await this.dt.sync({force: true});
            }
        }
        return this.dt;
    }
}


async function unitTest() {
    let obj: tableBaseV1 = new tableBaseV1();
    obj.tableName = "samples";
    obj.schema = "public";
    await obj.createTable();
    return true;
}


if (module === require.main) {
    unitTest();
}