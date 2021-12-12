//何飞的办公室的配置，用于开发调试
import {ConfigBase}  from "./configBase";
import {log} from "../log/logger";

export class ConfigOfHFOffice extends ConfigBase {
    public getStudiesDir(): string {
        return "G:\\git代码仓库大全\\data4import\\inst\\curated";
    }
    //template.csv
    public getFieldDefineCSV(): string {
        return "G:\\git代码仓库大全\\data4import\\inst\\extdata\\template.csv";
    }
}

//初始化
new ConfigOfHFOffice().checkEnv();


//单元测试
if (module === require.main) {
    const c: ConfigBase = new ConfigOfHFOffice()
    c.show4debug();
    if (c.checkEnv()) {
        log.log("这个配置文件符合当前环境");
    } else {
        log.error("这个配置文件不符合当前环境");
    }
}