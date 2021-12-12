# 什么是生成器

## 先看代码

```typescript
//这是一个数值发生器(也叫做数值生成器
//参数为生成的数据个数
function* numberGenerator(counter:number){
    //
    while(counter--){
        //生成的数在0到1000以内
        yield Math.random() * 1000;
    }
}

if (module === require.main) {
    //得到3元素生成器
    const g = numberGenerator(3);
    //得到生成的结果
    var objGenerated=g.next();
    //objGenerated.done表示完事了，没有了。也就是生成器生成不出来了。
    //如果，生成出来了，那么就循环处理即可。
    while (!objGenerated.done) {
        //当前的处理也及其简单：演示性的显示而已
        console.log(objGenerated.value);
        //尝试读取下一个继续处理
        objGenerated=g.next();
    }
}
```

## 以上代码的解释

function*后面带有分号的这就是一个生成器创建函数。

我们把关注的要点放在生成器的使用上，我们会发现，用法和迭代器类似。用法十分容易。

# 生成器的优势在哪里

优势在于需要元素的时候，才会执行生成代码。

## 演示代码

```typescript
//这是一个数值发生器(也叫做数值生成器
//参数为生成的数据个数
function* numberGenerator(counter:number){
    //
    while(counter--){
        //生成的数在0到1000以内
        yield Math.random() * 1000;
        //提示用户
        console.log("刚刚生成了1个");
    }
}

if (module === require.main) {
    //得到3元素生成器
    const g:Generator = numberGenerator(3);
    //我们从生成器中提取三个元素
    for (var i:number=0;i<3;i++){
        //得到生成的结果
        var objGenerated=g.next();
        //显示生成的结果
        console.log(objGenerated.value);
    }
}
```

## 运行结果

```bash
486.0523420954732
刚刚生成了1个
889.0543720945569
刚刚生成了1个
840.6522612791554
```

## 关键在于

第9行代码只执行了两次。生成了3个元素，提示代码为什么只执行了两次？

## 结论只有一个

元素生成完毕以后，生成器就停止了后续代码的执行，让出了控制权。

把控制权交给了生成器的使用者。

只有在使用者下次从生成器获取元素的时候，生成器才会从上次暂停的位置继续执行。

这就是为什么要使用生成器来传递数据，因为效率更高。

比如，我从数据库查询出来了200条记录。我把结果就可用生成器这种形式反馈给调用者。

调用者如果需要查看结果呢，查询具体数据的代码才会执行。否则，就优化掉了。





