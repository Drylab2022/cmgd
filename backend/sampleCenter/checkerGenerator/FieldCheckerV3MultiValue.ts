import {FieldCheckerV2RE} from "./FieldCheckerV2RE";
import {log} from "../../log/logger";

export class FieldCheckerV3MultiValue extends FieldCheckerV2RE {
    //多值处理过程中必须的三个重要控制变量,使用静态变量实施全局控制
    public static needSplitDuringCheck: boolean = true;
    public static needSortDuringCheck: boolean = true;
    public static needDuplicateRemovalDuringCheck: boolean = true;
    //列名
    private multiValue: boolean;

    //构造函数
    constructor(colName: string, requiredness: boolean, RE: string, multiValue: boolean) {
        super(colName, requiredness, RE);
        this.multiValue = multiValue;
    };

    //对多值实施拆分
    private split(value: any): any {
        if (Array.isArray(value))
        {
            //若本身就是数组，就不用拆分了
            return value;
        }
        //否则，还需要使用分号进行拆分
        const result: string[] = value.split(";");
        if (result.length > 1) {
            log.info("拆分后的多值:");
            log.info(result)
        }
        return result;
    }

    //去重
    private duplicateRemoval(value: any): any {
        if (value.length < 2) {
            return value;
        }
        let oldValue: string = value[0];
        let result = [oldValue];
        for (let index: number = 1; index < value.length; index++) {
            const newValue = value[index];
            if (newValue != oldValue) {
                result.push(newValue);
                oldValue = newValue;
            }
        }
        return result;
    }

    //对合法性进行检查
    //成功通过函数返回，失败通过异常返回原因
    public check(json: object): void {
        //1.先检查必要性,失败的话会通过异常这条途径返回原因
        super.check(json);
        //2.如果有值，则需要对值进行检测
        if (!json.hasOwnProperty(this.colName)) {
            //如果这一列不是不要的，并且这一列还根本不存在,那么就直接以通过检测为结果进行返回
            return;
        }
        //3.否则，就得对这一列的值进行检测
        //3.1.提取出值来
        let value = json[this.colName];
        //3.2.判空
        if (!value) {
            throw new Error(this.colName + ":" + null + "这种情况如何应对,甲方未做要求!");
        }
        if (!this.multiValue) {
            //若为单值，则直接对值进行匹配,执行了就一定会通过，否则通过异常这个渠道反馈失败原因
            this.match(value);
        } else {
            //若为多值
            // 1：先尝试进行拆分
            if (FieldCheckerV3MultiValue.needSplitDuringCheck) {
                value = this.split(value);
            }
            //2:如果有必要，还要进行排序
            if (FieldCheckerV3MultiValue.needSortDuringCheck) {
                value = value.sort();
            }
            //3:如果有必要,还要进行最后一个预处理：去重
            if (FieldCheckerV3MultiValue.needDuplicateRemovalDuringCheck) {
                value = this.duplicateRemoval(value);
            }
            //若为多值，则需要逐个元素进行匹配
            for (let index: number = 0; index < value.length; index++) {
                const element = value[index];
                //执行了就一定会通过，否则通过异常这个渠道反馈失败原因
                this.match(element);
            }
            //如果对输入进行了修改型的预处理，最终把处理的结果还要保存到传入的对象中
            if (FieldCheckerV3MultiValue.needSplitDuringCheck //
                || FieldCheckerV3MultiValue.needSortDuringCheck //
                || FieldCheckerV3MultiValue.needDuplicateRemovalDuringCheck
            ) {
                json[this.colName] = value;
            }
        }
        return;
    }
}