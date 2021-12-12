//工程元数据信息定位测试
import {StudiesEnumerator} from "./studiesEnumerator";
import {log} from "../log/logger";
import * as path from "path";
import * as fs from "fs";

export class importerV1 extends StudiesEnumerator {
    //这个方法用来导入研究/工程对应的tsv文件
    protected async importTSV(tsvFilePath: string, tableName: string) {
        console.log("导入TSV文件：有待完成");
    }

    //这个方法用来预检研究/工程对应的tsv文件是否存在
    protected async processProject(dir: string, name: string, index: number) {
        log.info(index);
        log.info(dir);
        log.info(name);
        log.info("--------------------------------------------------------------------------------")

        const metaDataFilePath = path.join(dir, name + "_metadata.tsv");
        try {
            const stat: fs.Stats = fs.statSync(metaDataFilePath);
            //不是文件则报错
            if (!stat.isFile()) {
                log.error("元数据文件缺失:" + metaDataFilePath);
                return;
            }
            //为了稳妥，还是慢慢同步导入
            await this.importTSV(metaDataFilePath, name);
            ////
        } catch (error) {
            log.error("====================================================================================================");
            log.error("处理元数据文件异常");
            log.error(metaDataFilePath);
            log.error(error);
            return;
        }
    }
}

//单元测试
if (module === require.main) {
    const test: StudiesEnumerator = new importerV1();
    test.enumerate();
}