//我们先定义一个文本文件处理器
import * as fs from "fs";
require ("../config/configDefault");
import {defaultConfig} from "../config/configBase";
import {log} from "../log/logger"


export class TxtFileProcessor {
    protected filePath: string;

    //构造函数
    constructor(txtFilePath:string) {
        this.filePath = txtFilePath;
    }

    //模板函数
    protected async processFileContent(allTxt: string){
        log.log("文件:"+this.filePath);
        log.log("长度:"+allTxt.length);
        return true;
    }

    //处理
    public async process() {
        let allTxt: string = fs.readFileSync(this.filePath).toString();
        return await this.processFileContent(allTxt);
    }
}

//单元测试代码
if (module===require.main){
    let obj:TxtFileProcessor=new TxtFileProcessor(defaultConfig.getFieldDefineCSV());
    obj.process();
}