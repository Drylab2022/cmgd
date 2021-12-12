//2.得到必须字段
import {DefineTable} from "../../SequelizeDB/tableCreator";
import {col, fn} from "sequelize";
import {log} from "../../log/logger";
import * as fs from "fs";


//得到列信息
async function getColumnsInfo() {
    //1.建
    let DT: any = await DefineTable('fieldsDef', [
        'col.name', 'uniqueness', 'requiredness', 'multiplevalues', 'allowedvalues'
    ]);

    //await dt.sync({force: true});
    //2.查
    const dts = await DT.findAll();
    return dts;
}

//单元测试程序
async function unitTest() {
    let fileName: string = __dirname + "/FieldProcess.ts";
    let lines: string = "";
    lines += "//注意：这个文件的内容不要手动修改\n";
    lines += "//注意：因为这个文件是使用checkerGeneratorV1根据数据库的内容自动生成的脚本\n";
    lines += "\n";
    lines += "import {FieldCheckerV3MultiValue} from \"./FieldCheckerV3MultiValue\";\n";
    lines += "\n";
    lines += "let fields=[];";
    lines += "\n";

    let columns = await getColumnsInfo();
    for (let index: number = 0; index < columns.length; index++) {
        lines += "fields.push(new FieldCheckerV3MultiValue(";
        const column = columns[index];
        lines += "\"" + column.getDataValue("col.name") + "\"";
        lines += "," + (column.getDataValue("requiredness") == "required");
        const v: string = column.getDataValue("allowedvalues");
        const v2: string = v.replace("\\", "\\\\");
        //const v2: string = v;
        lines += ",\"" + v2 + "\"";
        lines += "," + (column.getDataValue("multiplevalues") == "True");
        lines += "));\n";
    }

    lines += "export function check(json:object):void{\n";
    lines += "  for (let index:number=0;index<fields.length;index++)\n";
    lines += "  {\n";
    lines += "    const field=fields[index];\n";
    lines += "    field.check(json);\n";
    lines += "  }\n";
    lines += "}\n";


    fs.writeFileSync(fileName, lines);

}

if (module === require.main) {
    unitTest()
}
