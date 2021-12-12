import {tableBaseV2} from "./tableBaseV2";
import {tableBaseV1} from "./tableBaseV1";
import {DataTypes} from "sequelize";
import {log} from "../log/logger";
import {check} from "./checkerGenerator/FieldProcess";
import {Op} from "sequelize";

export class tableBaseV3 extends tableBaseV2 {
    //返回最近新加的样本
    public async last() {
        let dt=await this.defineTable();
        const result = await dt.findOne(
            {
                order: [
                    ['createdAt', 'DESC']
                ]
            }
        );
        return result;
    }
    //追加一个新的样本
    public async append(objJson){
        let dt=await this.defineTable();
        let result:boolean=true;
        //1.删除对结果存在干扰的属性
        delete objJson["id"];
        delete objJson["createdAt"];
        delete objJson["updatedAt"];

        //2.插入数据库
        if (!await this.insert(objJson)){
            log.error(JSON.stringify(this.errorObject));
            result=false;
        }
        //3.返回结果
        return result;
    }
    //删除满足条件的样本
    public async deleteSamples(objJson){
        let dt=await this.defineTable();
        let result:boolean=true;
        let where={data:objJson};
        try {
            let r=await dt.destroy({where:where});
            this.errorObject = {success:true,count:r};
        } catch (e) {
            this.errorObject = {success:false,cause:e};
        }
    }
    //检索出满足条件的样本
    public async querySamples(objJson){
        let dt=await this.defineTable();
        let result:boolean=true;
        let where={data:objJson};
        // where=objJson;
        // where={
        //     "data": {
        //         "disease": {
        //             "contains": [
        //                 "CRC"]
        //         }
        //     }
        // };
        try {
            let samples=await dt.findAll({where:where});
            let list=[];
            samples.forEach(function(element){
                list.push(element.data);
            });
            this.errorObject = {success:true,count:list.length,samples:list};
            return true;
        } catch (e) {
            this.errorObject = {success:false,cause:e};
            return false;
        }
    }
}