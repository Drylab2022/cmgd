# 什么是协程

## 从英文翻译角度讲

英文叫做`coroutine`,我个人觉得前缀`co`表示的是并行或者叫做同时执行的意思。

翻译成为：并行程序并无不妥。

## 从函数的返回值角度讲

就是调用结果为Promise的函数。

因为此前已经知道了Promise是任务的容器。

返回值是Promise也就意味着，函数的任务还有待完成。

这个函数除了有调用结果，还有执行结果。

执行结果，必须在任务完成(可能成，也可能败)之后才能定。

# 协程有哪些语法糖

在协程中可以使用await等待其它协程的执行结果。

在ts中叫做`await`(等待)，在js中叫做`yield`(让出)。

实际上等待其它任务完成，你就得让出CPU控制权，让其它任务有机会使用CPU，从而实现完成其它任务的目的。

之所以在js中叫做`yield`是因为`yield`是生成器中引入的。

生成器生成数据之后，就会自动让出控制权给数据处理程序。

我们先不研究`await`(等待)这个关键字是怎么实现的。

我们先看看它的效果。

## 分块实现的代码

### 我们先实现一个sleep函数(用协程表示)

```typescript
//这个函数返回的是一个Promise，所以它算得上一个异步函数
//和async修饰的函数具有相同的特性
function sleep(ms:number){
    //一旦调用一个sleep,马上就会返回一个Promise容器
    //容器里面的任务，不会立即完成，而是会等待一段时间才会完成
    //所以，sleep是异步调用的协程
    return new Promise((r,j)=>{
       setTimeout(r,ms);
    });
}
```

### 接着我们定义一个需要耗时3秒的任务1(用协程表示)

```typescript
//任务1的话，完成需要3秒
async function task1(){
    await sleep(1000);
    console.log("过了1秒，任务1完成1/3");
    await sleep(1000);
    console.log("等了2秒，任务1完成1/3");
    await sleep(1000);
    console.log("等了3秒,，任务1完成全部完成");
}
```

### 然后我们定义一个需要耗时5秒的任务2(也用协程表示)

```typescript
//任务2的话，完成需要5秒
async function task2(){
    await sleep(1000);
    console.log("过了1秒，任务2完成1/5");
    await sleep(1000);
    console.log("等了2秒，任务2完成2/5");
    await sleep(1000);
    console.log("等了3秒，任务2完成3/5");
    await sleep(1000);
    console.log("等了4秒，任务2完成4/5");
    await sleep(1000);
    console.log("等了5秒,，任务2完成全部完成");
}
```

### 最后我们让两个任务同时发起

```typescript
//总任务：让任务1和任务2并行执行
function totalTask(){
    //启动任务1，得到一个promise
    var p1=task1();
    //启动任务2，也得到了一个promise
    var p2=task2();
    //总任务的完成，取决于任务1和任务2都已经完成
    return Promise.all([p1,p2]);
}
```

### 入口代码

```typescript

if (module === require.main) {
    //发起总任务
    totalTask();
}
```

## 完整的代码

```typescript
import set = Reflect.set;

//这个函数返回的是一个Promise，所以它算得上一个异步函数
//和async修饰的函数具有相同的特性
function sleep(ms:number){
    //一旦调用一个sleep,马上就会返回一个Promise容器
    //容器里面的任务，不会立即完成，而是会等待一段时间才会完成
    //所以，sleep是异步调用的协程
    return new Promise((r,j)=>{
       setTimeout(r,ms);
    });
}

//任务1的话，完成需要3秒
async function task1(){
    await sleep(1000);
    console.log("过了1秒，任务1完成1/3");
    await sleep(1000);
    console.log("等了2秒，任务1完成1/3");
    await sleep(1000);
    console.log("等了3秒,，任务1完成全部完成");
}

//任务2的话，完成需要5秒
async function task2(){
    await sleep(1000);
    console.log("过了1秒，任务2完成1/5");
    await sleep(1000);
    console.log("等了2秒，任务2完成2/5");
    await sleep(1000);
    console.log("等了3秒，任务2完成3/5");
    await sleep(1000);
    console.log("等了4秒，任务2完成4/5");
    await sleep(1000);
    console.log("等了5秒,，任务2完成全部完成");
}

//总任务：让任务1和任务2并行执行
function totalTask(){
    //启动任务1，得到一个promise
    var p1=task1();
    //启动任务2，也得到了一个promise
    var p2=task2();
    //总任务的完成，取决于任务1和任务2都已经完成
    return Promise.all([p1,p2]);
}


if (module === require.main) {
    //发起总任务
    totalTask();
}
```

## 问题

执行的结果会怎么样呢？耗时如何呢？总任务是协程么？

### 执行结果

```bash
过了1秒，任务1完成1/3
过了1秒，任务2完成1/5
等了2秒，任务1完成1/3
等了2秒，任务2完成2/5
等了3秒,，任务1完成全部完成
等了3秒，任务2完成3/5
等了4秒，任务2完成4/5
等了5秒,，任务2完成全部完成
```

### 总耗时

5秒

### 两个没有使用async 修饰的协程

这两个是sleep和总任务。

使用async语法糖来产生协程确实不错。尤其适合打算把多个协程顺序执行。

但是，向setTimeout函数这种古老的API形式，我们还得使用Promise来包装成为协程。

# 总要结论

## async语法糖的使用条件

适合把多个协程顺序调用。

## new Promise 的适用条件

适用于把古老的API包装成为协程。

## Promise.all的适用条件

使用于任务的完成依赖于多个协程全都完成。

但是这些个被依赖的协程之间，不用有明显的先后顺序，并行调度即可。

## Promise.race的适用条件

使用于任务的完成依赖于多个协程其中任何一个完成。

注意：虽然被依赖的协程只完成了一个，主依赖的协程就完成了。但是被依赖的其它协程呢？会停止执行么？

这是不会的。一定要注意。

### 请判断一下代码的输出结果

```typescript

//这个函数返回的是一个Promise，所以它算得上一个异步函数
//和async修饰的函数具有相同的特性
function sleep(ms:number){
    //一旦调用一个sleep,马上就会返回一个Promise容器
    //容器里面的任务，不会立即完成，而是会等待一段时间才会完成
    //所以，sleep是异步调用的协程
    return new Promise((r,j)=>{
       setTimeout(r,ms);
    });
}

//任务1的话，完成需要3秒
async function task1(){
    await sleep(3000);
    return "任务1完成";
}

//任务2的话，完成需要5秒
async function task2(){
    await sleep(5000);
    return "任务2完成";
}

//总任务：让任务1和任务2并行执行
function totalTask(){
    //启动任务1，得到一个promise
    var p1=task1();
    //启动任务2，也得到了一个promise
    var p2=task2();
    //总任务的完成，任务1和2任何哪个完成，我们的总任务都算完成
    return Promise.race([p1,p2]);
}

async function test(){
    //查看总任务的执行结果
    console.log(await totalTask());
}

if (module === require.main) {
    //发起总任务
    test()
}
```

### 答案

`"任务1完成"`，因为：任务1只需要3秒。它先完成。





