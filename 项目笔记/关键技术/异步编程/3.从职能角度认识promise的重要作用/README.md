# 从结果上看异步程序代码块

此前，我们已经了解过了异步程序的结果，分成调用结果和执行结果。

# 从调度角度看异步程序代码块

调度是动词，后面的宾语应该是任务。

任何程序代码块，都需要完成一定的任务。

同步程序代码块需要完成任务，异步程序代码快也需要完成任务。

## 异步程序设计的难点

同步程序和异步程序的最大不同不在任务本身，而在后续任务。

### 同步程序如何处理后续任务

因为同步程序会按照顺序逐条语句执行，所以后续任务只需要写在当前任务的后面即可。

### 异步程序在后续任务处理上的难点

异步API最原始的形式是让我们调用者提供回调，通过参数告诉我们执行结果。

然后，我们根据结果进行后续任务的执行。

所以，我们得到一个必然结果：那就是，后续任务只能以回调的形式给出。

难就难在，如果后续任务还有后续任务呢？

这就叫做回调地狱(回调函数中定义回调函数,很多层)。

## promise的职能

promise专门用来解决回调地狱问题。

### promise的理论基础

①任务都用回调来表示；

②当前任务执行完了，一般都会有执行结果(成败)；

③后续任务一般分为：当前任务成功后的后续任务和当前任务失败后的后续任务。

### promise的原理(初级)

设计者 **可以**设计一个任务的容器，专门用来存储任务。

然后，把这种容器存储成为线性表。

最后，逐个访问节点中的回调函数，调用其中的回调函数就可以啦。

这就出现了promise的第一个常见用法then方法。

## promise的then方法

### then方法的参数

then方法的参数使用的是使用回调描述的目标任务。

### then方法的调用结果

此处使用的是调用结果，而非执行结果。

因为then方法是一个异步API。

所以，then方法的返回结果是一个新的容器(promise)。

### 为什么then方法的调用结果会返回一个新的promise呢

因为是为了方便，我们再追加新任务啊。

没有容器，新任务往哪里添加呢？

### then返回的promise和调用then所属的promise是同一个promises吗?

当然不是，而是刚刚新创建的容器(promise)。

如果当前任务执行成功的话，就会执行容器内的任务。

两个容器分别装有不同的任务，绝对是不可以使用一个容器来装这两个不同任务的。

## promise的catch方法

这个方法与then方法类似，只不过增加的后续任务在当前任务失败后才会调用。

所以，从这个角度而言。

如果把then看成是增加promise容器的后续节点的话，那么此处的catch也是增加promise的后续节点。

只不过这两个后续节点的执行条件不同而已，而且promise完成后，只能在两种后续节点中选择一种来执行。

# 同一个promise可否同时具有两个后续节点

## 方法

当然是可以的，只要把需要同时具有两个后续节点的promise保存到一个变量中。

然后调用变量的成员方法，分别调用then和catch增加两个后续节点即可。

## 多次调用同一个promise容器的then方法

而且根据这个办法，可想而知。如果多次调用同一个promise容器的then方法呢？

就会同时增加promise容器的多个then子节点。

所以，我们可以把每个promise看成一个节点。

这个节点，可以有两种子节点。一种叫做then子节点，一种叫做catch子节点。

注意是两种子节点，而不是两个子节点。

## then子节点

什么时候执行呢？当前子节点中的任务执行成功了，就会执行then子节点中的任务。

## catch子节点

什么时候执行呢？当前子节点中的任务执行失败了，就会执行catch子节点中的任务。

# 当前任务只能返回成败吗

对于同步执行的代码成败立刻就能显现，但是如果在完成当前任务的过程中，还有异步代码呢？

也就是目前这一步呢，只是完成了目标任务的一部分而已。

最终的成败还没定呢。怎么办？

这个时候，就只需要返回一个用来确定任务成败的promise就可以了。

# 同步创建Promise容器的一些方法

首先需要明确创建Promise容器的方法都是同步执行的。

也就是说，调用方法后立刻就能得到相应的Promise容器。

## 创建状态确定的Promise容器

### 创建一个状态为成功的容器

```typescript
Promise.resolve(dataObject);
```

以上函数立刻创建一个状态已经确定(确定是成功态)的Promise。

### 创建一个状态为失败态的容器

```typescript
Promise.reject(dataObject)
```

以上函数立刻创建一个状态已经确定(确定Wie失败态)的Promise。

### 用途

某个Promise容器充当的是then节点，也就是在上一步成功之后才执行。

但是，这一步缺失败了，怎么通知呢？

```bash
p1 -> t2 -> c3
```

以上p1：表示一个promise容器。

t2表示p1的一个then节点。

c3表示t2的一个catch节点。

如果在t2中，要把流程转移到c3里面去，如何写代码呢？

```typescript
var t2=p1.then((dataObj)=>{
    //t2的执行结果应该是"失败"(此前p1的执行结果是"成功")
    return Promise.reject("糟糕，出错了，错误原因未知!");
});
```

## 创建状态待定的Promise容器

### 直接用任务来创建

```typescript
var p = new Promise(function (r, j) {
    //r(成功后提供给下一步的数据);
    //j(失败后提供给下一步的原因);
});
```

# 习题

## then节点当中没有明确的成败报告语句节点任务完成后成败状态为何

### 题目

```typescript
var p1=Promise.resolve();
var p2=p1.then((data)=>{
    //执行任务
});

p2.then(()=>{
    console.log("p2的结果是成!")
})

p2.catch(()=>{
    console.log("p2的结果是败!")
})

```

以上代码执行后，会显示p2是成呢？还是败呢？为什么？

### 答案

会显示`p2的结果是成`。

因为：

①p1的结果是成；

②p2是p1的then节点，所以p2内的任务会得以执行；

③p2的执行过程中**只要没有明确的报错**(就像[用途](#用途)那样的方式)，那么p2的执行结果就应该是`成`。

## 如果一个Promise容器中的任务失败了，而且这个Promise没有c节点会如何

### 题目

```typescript
//p1失败了
var p1=Promise.reject();
var p2=p1.then((data)=>{
});
//p2后面有两个节点，分别是t节点
p2.then(()=>{
})
//和c节点
p2.catch(()=>{
})

```

### 答案

会报错。因为p1的最终态是失败。而失败的promise容器如果存在t节点(p2)的话，系统会认为后续任务没有完成而报错。

## 链式表达式分解

### 题目

```typescript
Promise.reject()
    .then(function (v) { })
    .then(function (v) { })
    .then(function (v) { })
    .then(function (v) { })
    .catch(function () { });
```



### 答案

```typescript
var p1 = Promise.reject();
var p2 = p1.then(function (v) { });
var p3 = p2.then(function (v) { });
var p4 = p3.then(function (v) { });
var p5 = p4.then(function (v) { });
var p6 = p5.catch(function () { });
```



如果一个Promise容器，它的任务执行完毕之后，没有明确的成败呢

# Promise的常见写法是

```typescript
new Promise(function (r, j) {
    //调用r或者j来表明第一步的成败
    r();
})
    .then((value)=> {
        console.log("第2步");
        //第二步如果成功，不用显式报告
        //这一步如果失败，则需要显式报告
        //语法为：
        return Promise.reject("在第二步失败了，原因为：xxxx")
    })
    .then((value)=> {
        console.log("第3步");
        //第三步的写法，与上一步的写法相同
    })
    .catch((value)=>{
        console.log(value);
        //最后，做个异常处理即可。
    })
    //其它步骤
    .finally(()=>{
        //这一步是可选的，专门用于终结化
        console.log("终结化");
    })
```

## 请问以下代码的输出是什么

```typescript
var
    counter: number = 0;

async function task() {
    console.log(counter);
    counter++;
    if (counter < 10) {
        return task();
    }
}

task()
```

### 答案解析

以上代码是使用异步代码来模拟循环。

关键在于这个函数是异步函数的递归调用。

只要计数器不到10，就会发起递归调用。

所以，会执行多次直到计数器达到10为止。

## 请问以下代码的输出是什么

```typescript
var
    counter: number = 0;

async function task() {
    counter++;
    if (counter < 10) {
        return task();
    } else {
        return counter;
    }
}

console.log(task())

```

### 答案解析

是Promise，因为异步函数调用时立即返回，且返回值是一个promise。