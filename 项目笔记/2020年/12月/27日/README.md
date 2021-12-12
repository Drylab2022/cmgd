# 开始着手CSV文件读取

## 工程枚举器(files/studies.ts)

```typescript
import * as fs from "fs";
import * as path from "path";
import {Stats} from "fs";
import {ProjectMetaProcess} from "./ProjectMetaProcess";

//因为每个目录都是一个工程,或者叫做一个研究study
class StudiesEnumerator {
    //这个方法用来处理工程/研究,目前只是简单的把它显示出来了而已
    protected processProject(dir: string, name: string,index:number): void {
        console.log(index);
        console.log(dir);
        console.log(name);
        console.log("--------------------------------------------------------------------------------")
    }

    private roorDir: string;

    public enumerate(): void {
        fs.readdirSync(this.roorDir).forEach(
            (name:string,index:number) => {
                var currentStudyDirPath: string = path.join(this.roorDir, name);
                var stat: Stats = fs.statSync(currentStudyDirPath);
                if (stat.isDirectory()) {
                    this.processProject(currentStudyDirPath, name,index);
                }
            }
        );
    }

    constructor(dir: string) {
        this.roorDir = dir;
    }
}

class StudiesProcess extends StudiesEnumerator{
    //调用专门的元数据处理器来完成处理
    protected processProject(dir: string, name: string,index:number): void {
        var processor:ProjectMetaProcess=new ProjectMetaProcess(dir,name);
        processor.process();
    }
}

var obj: StudiesEnumerator = new StudiesProcess("E:\\万全\\甲方提供\\3.数据和模式\\inst\\curated");

obj.enumerate();
```

## 工程元数据处理器(files/ProjectMetaProcess.ts)

```typescript
import * as fs from "fs";
import * as path from "path";
//工程元数据处理器
export class ProjectMetaProcess{
    private projectRootDir:string;
    private name:string;
    constructor(projectRootDir,name) {
        this.projectRootDir=projectRootDir;
        this.name=name;
    }
    //根据成员变量的状态，对工程进行处理
    public process():void{
        var metaDataFilePath = path.join(this.projectRootDir, this.name+"_metadata.tsv");
        try {
            var stat:fs.Stats = fs.statSync(metaDataFilePath);
            //不是文件则报错
            if (!stat.isFile())
            {
                console.log("====================================================================================================");
                console.log("元数据文件缺失");
                console.log(metaDataFilePath);
                return;
            }
            //处理这个tsv文件
            this.processTSVFile(metaDataFilePath);
        } catch (error) {
            console.log("====================================================================================================");
            console.log("处理元数据文件异常");
            console.log(metaDataFilePath);
            console.log(error);
            return;
        }
    }
    //处理元数据文件
    protected processTSVFile(filePath:string):void{
        var allTxt:string = fs.readFileSync(filePath).toString();
        var lines:string[]=allTxt.split("\n");
        var header:string=lines[0];
        this.processHeader(header);
        for (var lineIndex:number =1;lineIndex<lines.length;lineIndex++){
            this.processDataLine(lineIndex,lines[lineIndex]);
        }
    }
    //处理文件头
    colCount:number;
    protected processHeader(header:string):void{
        //1.去掉两端空白
        header=header.trim();
        var fields:string[]=header.split("\t");
        this.colCount=fields.length;
        console.log("列数:"+fields.length);
        console.log(fields);
    };
    //处理数据行
    protected processDataLine(lineIndex:number,dataLine:string):void{
        //1.去掉两端空白
        //dataLine=dataLine.trim();
        //数据不能去掉两端空白,因为分隔符tab有可能会被去掉
        //2.若是空行就不处理了
        if (dataLine.length<1)
        {
            return;
        }
        //3.判断列数是否一致
        var fields:string[]=dataLine.split("\t");
        if (fields.length!=this.colCount) {
            console.log("数据列数和文件头不一致");
        };
        //4.保存各列数据
        //这个有待继续完成，应该调用昨天的seqdb模块了
    }
}
```

