import {tableBaseV1} from "./tableBaseV1";
import {CreateTable, DefineTable} from "../SequelizeDB/tableCreator";
import {log} from "../log/logger";
import {check} from "./checkerGenerator/FieldProcess";

require("../config/configDefault")
import {seq} from "../SequelizeDB/connect"
import {DataTypes, Op, fn, col} from "sequelize"

export class tableBaseV2 extends tableBaseV1 {
    //返回字段列表:这个方法很重要，决定了创建出来的表到底有哪些列
    protected async getFields() {
        return {
            data: {
                //这是最重要的一列,数据类型为JSON
                type: DataTypes.JSON
                //这一列不允许为空
                , allowNull: false
            }
            //第1个用于去重的列
            , sampleID:
                {
                    //这是最重要的一列,数据类型为JSONB
                    type: DataTypes.STRING(8192)
                    //这一列不允许为空
                    , allowNull: false
                    //去重
                    , unique: true
                }
            //第2个用于去重的列:因为只有两列需要去重，所以我们作死在这里
            , NCBI_accession:
                {
                    //这是最重要的一列,数据类型为JSONB
                    type: DataTypes.STRING(8192)
                    //这个不填则没事，但是主要填写了就不能重复
                    , allowNull: true
                    //去重
                    , unique: true
                }
        }
    }

    //插入一行
    public async insert(json: any) {
        this.errorObject={success:true,cause:"all is well"};
        let result: boolean = this.check_input(json);
        if (result) {
            try {
                await this.dt.create({
                    data: json
                    , sampleID: json.sampleID
                    , NCBI_accession:json.NCBI_accession.join("...\n")
                });
            } catch (e) {
                result = false;
                this.errorObject = {success:false,cause:e};
            }
        }
        return result;
    }

    //检验:我们同步完成
    protected check_input(json: object): boolean {
        let result = true;
        if (!json) {
            this.errorObject = {success:false,cause:"input is null!"};
            return false;
        }
        if (result) {
            try {
                //此处调用自动生成的程序，对输入的数据进行一个校验
                //只有通过校验的才会真正的插入到数据库里面去
                check(json);
            } catch (e) {
                result = false;
                this.errorObject = {success:false,cause:e};
            }
        }
        return result;
    }

    errorObject: object={success:true,cause:"all is well"};
}

//1.得到所有研究
async function getStudies() {
    //1.建
    let DT: any = await DefineTable('studies', ['studyName']);
    //await dt.sync({force: true});
    //2.查
    const dts = await DT.findAll();
    return dts;
}

async function unitTest() {
    //1.把需要的表创建出来
    let obj: tableBaseV2 = new tableBaseV2();
    obj.tableName = "samples";
    obj.schema = "public";
    let dt: any = await obj.createTable();
    //2.得到study列表
    let studies: any = await getStudies();
    let dtNames = [];
    studies.forEach(v => {
        dtNames.push(v.studyName);
    });
    //3.使用循环语句逐个处理各个study
    for (let index: number = 0; index < studies.length; index++) {
        //3.1.查询出单个的study中的样本
        const dtName: string = dtNames[index];
        const [results, metadata] = await seq.query("select * from public.\"" + dtName + "\"");
        let samples = [];
        results.forEach(
            v => {
                const strJson: string = JSON.stringify(v);
                samples.push(strJson);
            }
        );
        //3.2.逐个验证后输入数据库
        for (let index: number = 0; index < samples.length; index++) {
            const objJson = JSON.parse(samples[index]);
            //3.2.1.删除对结果存在干扰的属性
            delete objJson["id"];
            delete objJson["createdAt"];
            delete objJson["updatedAt"];
            //3.2.2.插入数据库
            if (!await obj.insert(objJson)){
                log.error(JSON.stringify(obj.errorObject));
            }
        }
    }
}


if (module === require.main) {
    unitTest();
}