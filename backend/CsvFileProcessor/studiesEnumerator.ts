import * as fs from "fs";
import * as path from "path";
import {Stats} from "fs";
import {defaultConfig} from "../config/configBase";

require("../config/configDefault");
import {log} from "../log/logger"

//因为每个目录都是一个工程,或者叫做一个研究study
export class StudiesEnumerator {
    //这个方法用来处理工程/研究,目前只是简单的把它显示出来了而已
    protected async processProject(dir: string, name: string, index: number) {
        log.info(index);
        log.info(dir);
        log.info(name);
        log.info("--------------------------------------------------------------------------------")
    }

    //每个工程/研究都有一个自身的根目录
    private readonly rootDir: string;

    //以下公开的方法负责完成枚举任务
    public async enumerate() {
        //此处显式使用循环的目的是：让并行处理串行化，便于调试除错
        const paths: string[] = fs.readdirSync(this.rootDir);
        const length: number = paths.length;
        //以下代码行调试用：发行时应该去掉
        //length=Math.min(length,3);
        for (let index = 0; index < length; index++) {
            const name: string = paths[index];
            const currentStudyDirPath: string = path.join(this.rootDir, name);
            log.info("================================================================================");
            log.info("开始处理:序号=" + (index + 1) + ";位置=" + currentStudyDirPath);
            const stat: Stats = fs.statSync(currentStudyDirPath);
            if (stat.isDirectory()) {
                //注意：此处调用自身的成员方法处理工程
                await this.processProject(currentStudyDirPath, name, index);
            }
            log.info("处理完毕:序号=" + (index + 1));
        }
        console.log("总共发现："+length+"个研究工程目录");
    };

    //构造器：需要传递工程的根目录路径
    constructor() {
        this.rootDir = defaultConfig.getStudiesDir();
    }
}

//单元测试
if (module === require.main) {
    const test: StudiesEnumerator = new StudiesEnumerator();
    test.enumerate();
}