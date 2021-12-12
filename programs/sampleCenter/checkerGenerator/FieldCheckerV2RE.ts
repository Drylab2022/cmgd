//字段检查器,第2版：根据正则表达式对值进行检验
import {FieldCheckerV1Required} from "./FieldCheckerV1Required";

export class FieldCheckerV2RE extends FieldCheckerV1Required {
    //正则表达式(字符串形式)
    private objRE: RegExp;
    private strRE:string;

    //构造函数
    constructor(colName: string, requiredness: boolean, RE: string) {
        super(colName, requiredness);
        this.objRE = new RegExp(RE, "g");;
        this.strRE=RE;
    };

    //使用正则表达式去匹配输入的内容
    //成功通过函数返回,失败通过异常返回原因
    protected match(input: string): void {
        //正则表达式不匹配的内容太多了，暂时先跳过去。
        //return;
        //因为这是有状态的，所以必须每次都临时创建一个新的
        let objRE:RegExp = new RegExp(this.objRE, "g");
        const mr: RegExpExecArray = objRE.exec(input);
        let result: boolean = (mr != null);
        if (result) {
            result = (mr.input == mr[0]);
        }
        if (!result) {
            throw new Error(this.colName + ":" + input + " not match regular expression: " + this.strRE);
        }
    }
}

if (module === require.main) {

}
