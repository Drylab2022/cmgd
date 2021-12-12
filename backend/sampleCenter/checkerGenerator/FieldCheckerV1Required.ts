//字段检查器,第一版：检查列的必要性
export class FieldCheckerV1Required {
    //列名
    protected colName: string;
    //列的必要性
    private requiredness: boolean;

    //构造函数
    constructor(colName: string, requiredness: boolean) {
        this.colName = colName;
        this.requiredness = requiredness;
    }

    //针对必要性进行检查:注意，检测是只读的不进行任何修改
    //成功通过函数返回
    //失败通过异常返回原因
    public check(json: object): void {
        //如果这一列不是必须的，那么直接跳过检查，按通过检查算
        if (!this.requiredness) {
            return;
        }
        //否则,还得检查
        if (!json.hasOwnProperty(this.colName)) {
            throw new Error("required info is missing:" + this.colName);
        }
        //挑不出毛病了，就算通过检查
        return;
    }
}