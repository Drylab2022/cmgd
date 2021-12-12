//这是一个多行文本文件处理程序
import {TxtFileProcessor} from "./TxtFileProcessor";
import {defaultConfig} from "../config/configBase";
import {log} from "../log/logger"

export class TxtLinesProcessor extends TxtFileProcessor {
    //模板函数
    protected async processFileContent(allTxt: string) {
        const lines: string[] = allTxt.split("\n");
        let result: boolean = true;
        for (let lineIndex: number = 0; lineIndex < lines.length; lineIndex++) {
            result = result && await this.processLine(lines[lineIndex], lineIndex, lines.length);
        }
        return result;
    }

    //文本行处理函数
    protected async processLine(lineContent: string, lineIndex: number, lineCount: number) {
        log.log("第" + lineIndex + "行:");
        log.log(lineContent);
        return true;
    }
}

//单元测试代码
if (module === require.main) {
    let obj: TxtFileProcessor = new TxtLinesProcessor(defaultConfig.getFieldDefineCSV());
    obj.process();
}