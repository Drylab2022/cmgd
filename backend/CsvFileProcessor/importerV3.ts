import {importerV2} from "./importerV2";
import {csvFileImporter} from "./csvFileImporter";
import {StudiesEnumerator} from "./studiesEnumerator";
import {log} from "../log/logger";

//导入器
export class importerV3 extends importerV2 {
    //这个方法用来导入研究/工程对应的tsv文件
    protected async importTSV(tsvFilePath: string, tableName: string) {
        let p=new csvFileImporter(tsvFilePath,"\t",tableName);
        await p.process();
    }
}

//单元测试
if (module === require.main) {
    const test: StudiesEnumerator = new importerV3();
    test.enumerate();
    log.info("导入完毕")
}