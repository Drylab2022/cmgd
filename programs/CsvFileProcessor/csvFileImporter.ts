import {CsvFileProcessor} from "./CsvFileProcessor";
import {log} from "../log/logger";
import {CreateTable} from "../SequelizeDB/tableCreator"
import {TxtFileProcessor} from "./TxtFileProcessor";
import {defaultConfig} from "../config/configBase";

export class csvFileImporter extends CsvFileProcessor {
    readonly tableName: string;
    private tableInDB: any;
    private fieldNames: string[];

    constructor(csvFilePath: string, fieldSplitter: string, tableName: string) {
        super(csvFilePath, fieldSplitter);
        this.tableName = tableName;
    }

    //文本行处理函数
    protected async processLine(lineContent: string, lineIndex: number, lineCount: number) {
        let result: boolean = true;
        //对于CSV文件而言，空行是结束标志
        if (lineContent.length < 1) {
            return false;
        }
        //使用字段分隔符，分隔出各个列来
        let columns: string[] = this.splitToArray(lineContent);

        if (lineIndex == 0) {
            this.fieldNames = columns;
            this.tableInDB = await CreateTable(this.tableName, columns);
        } else {
            //1.判断提取出来的列数
            if (columns.length != this.fieldNames.length) {
                log.error(this.tableName + "的第" + lineIndex + "行,字段个数与首行不符");
            }
            //2.逐列处理，生成JSON数据对象
            let jsonDataObj = {};
            for (let columnIndex: number = 0; columnIndex < columns.length; columnIndex++) {
                let value = columns[columnIndex];
                if (value.length > 8192) {
                    log.error(this.tableName + "的第" + lineIndex + "行的第" + columnIndex + "列字段太长");
                }
                jsonDataObj = Object.defineProperty(jsonDataObj,
                    this.fieldNames[columnIndex], {
                        configurable: true,
                        enumerable: true,
                        value: value
                    }
                )
            }
            //3.保存生成的JSON数据对象到数据库
            await this.tableInDB.create(jsonDataObj);
            //返回成功即可
            result = result && true;
        }
        return result;
    }
}

//单元测试代码
if (module === require.main) {
    let obj: TxtFileProcessor = new csvFileImporter(defaultConfig.getFieldDefineCSV(), ",", "fieldsDef");
    obj.process();
}