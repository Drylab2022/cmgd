# promise的用途

在typescript中，产生promise的最简单的办法，就是使用关键字`async`。

所以，需要掌握。async关键字的用途就是产生promise。

## 生成promise的演示代码

```typescript
//这是同步函数
function t1():string{
    return "xx";
}

//这是异步函数
async function t2(){
    return "xx";
}

console.log(t1());
console.log(t2());
```

### 调用结果

```bash
xx
Promise { 'xx' }
```

## 结论

调用函数t1得到的调用结果是执行后的返回值xx。

调用函数t2得到的调用结果一个Promise。

## 异步函数的特殊概念:调用结果 vs 执行结果

调用异步执行的函数时，有两个结果需要仔细区分。

第一个结果是调用结果：也就是调用函数之后，函数会立刻返回。所谓的调用结果，指的就是立刻返回的这个结果。

第二个结果是执行结果：虽然调用立刻返回了，但是最终需要完成的任务，还需要等一会儿才能完成。完成任务以后，所携带的这个信息才是我们最终关心的。比如成败等。这个信息就叫做执行结果。



