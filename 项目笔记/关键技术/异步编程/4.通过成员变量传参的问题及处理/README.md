# 目标任务

需要对以10个数字作为输入的任务进行处理，每个任务接收一个数字。

这10个数字分别是0到9。

## 代码如下

```typescript
class Process{
    currentValue:number;
    //这是一个异步函数，负责处理当前值
    //之所以异步，是因为一时半会完成不了任务
    protected async processCurrentValue(){
        setTimeout(()=>{
            //目前的处理就是输出
            console.log(this.currentValue);
        },1000);
    };
    //公开方法完成任务
    public doTask(){
        for (var i:number=0;i<10;i++){
            //通过成员变量
            this.currentValue=i;
            //向异步方法传递参数
            this.processCurrentValue();
        }
    }
}

new Process().doTask();
```

## 请问以上代码是输出结果是什么

```bash
9
9
9
9
9
9
9
9
9
9
```

为什么输出不是0到9，而是10个9？

因为异步方法，发起调用之后并没有立即得到执行。

而是，所有任务都发起完毕之后，才开始执行。

## 如何修改

### 在es5的代码中比较危险一点

```typescript
class Process{
    currentValue:number;
    //这是一个异步函数，负责处理当前值
    //之所以异步，是因为一时半会完成不了任务
    protected async processCurrentValue(){
        //在es5中，可以先把成员变量局部化
        var currentValue:number=this.currentValue;
        //然后在通过闭包传递给被调函数
        setTimeout(()=>{
            console.log(currentValue);
        },1000);
    };
    //公开方法完成任务
    public doTask(){
        for (var i:number=0;i<10;i++){
            //通过成员变量
            this.currentValue=i;
            //向异步方法传递参数
            var p=this.processCurrentValue();
            console.log(p);        }
    }
}

new Process().doTask();
```

### 在es6中支持待参异步函数

```typescript
class Process{
    //这是一个异步函数，负责处理当前值
    //之所以异步，是因为一时半会完成不了任务
    protected async processCurrentValue(v:number){
        //然后在通过闭包传递给被调函数
        setTimeout(()=>{
            console.log(v);
        },1000);
    };
    //公开方法完成任务
    public doTask(){
        for (var i:number=0;i<10;i++){
            //向异步方法传递参数:还是参数表才是稳妥的方法
            var p=this.processCurrentValue(i);
            console.log(p);        }
    }
}

new Process().doTask();
```

