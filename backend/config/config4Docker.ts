import {ConfigBase}  from "./configBase";
import {log} from "../log/logger";

//docker内运行的配置，用于发布产品
export class ConfigOfDocker extends ConfigBase {
    public getStudiesDir(): string {
        return "/data/4import/inst/curated";
    }
    //template.csv
    public getFieldDefineCSV(): string {
        return "/data/4import/inst/extdata/template.csv";
    }
}

//初始化
new ConfigOfDocker().checkEnv();

//单元测试
if (module === require.main) {
    const c: ConfigBase = new ConfigOfDocker()
    c.show4debug();
    if (c.checkEnv()) {
        log.log("这个配置文件符合当前环境");
    } else {
        log.error("这个配置文件不符合当前环境");
    }
}