# 在内存中动态的生成对象

## 比如把两个数组合并成为一个对象

### 可重用源码

```typescript
if (module === require.main) {
    //属性名
    let propertiesName = [];
    for (let index: number = 0; index < 10; index++) {
        propertiesName.push("f" + index)
    }
    //属性值
    let propertiesValue = [];
    for (let index: number = 0; index < 10; index++) {
        propertiesValue.push(index * Math.random())
    }

    //合并结果
    let bigObj = {};
    for (let index: number = 0; index < 10; index++) {
        bigObj = Object.defineProperty(bigObj,
            propertiesName[index], {
                configurable: true,
                enumerable:true,

                value: propertiesValue[index]
            }
        )
    }

    console.log("属性名:");
    console.log(propertiesName);

    console.log("属性值:");
    console.log(propertiesValue);

    console.log("合并结果:");
    console.log(bigObj);

    console.log("JSON序列化:");
    console.log(JSON.stringify(bigObj));

}
```

### 执行结果

```bash
属性名:
[
  'f0', 'f1', 'f2',
  'f3', 'f4', 'f5',
  'f6', 'f7', 'f8',
  'f9'
]
属性值:
[
  0,
  0.5666693957712099,
  0.9053342966099915,
  2.149388313671826,
  2.6964861901414157,
  2.2874804933176818,
  5.473456040086007,
  1.8578695188402325,
  0.9083792843229954,
  0.4387164001435835
]

```

# 用途

比如使用`sequelize`进行动态建表的时候，方法`define`的第一个参数是表的名字，第二个参数表示**所有字段**。

而表示**所有字段**的对象有的时候，必须要动态创建。比如列名是从CSV文件中读入进来的时候。

因为此时每1列都是这个对象的另外一个对象/属性成员。所以，这种对象的创建会比较麻烦。

此时，基于JSON的字符串转换成对象的方法就不好用了。

因为每一列还有其它很多的属性需要指定，而这些属性值又是内置的对象或者啥的。

以上办法就派上用场了。

## 组装复杂对象

### 可重用代码展示

```typescript
export async function CreateTable(tableName: string, fieldsName: string[]) {
    //ft是字段类型的缩写(默认是255)
    //测试发现超长字段所以我们先设置成8192长，发现不够的话再增长
    let ft=DataTypes.STRING(8192);
    //fs是fields的缩写
    let fs={};
    for (let index:number=0;index<fieldsName.length;index++)
    {
        fs = Object.defineProperty(fs,
            fieldsName[index], {
                configurable: true,
                enumerable:true,
                value: ft
            }
        )
    }
    //以上的fs就是我们自动创建的字段对象
    let result:any=seq.define(tableName, fs, {tableName: tableName});
    //根据测试发现，其它名字的表不会收到破坏,及时使用seq.sync({force: true}也是不会破坏
    await result.sync({force: true});
    return result;
}
```


## 组装数据对象

将来从数据库中出来的数据对象，转码成为webservice的json对象发送到客户端的时候，同样也存在这样的问题。

从CSV文件中，读入进来的一行就可以自动补充上列名从而形成JSON形式的数据对象。




##  组装行为对象

还有就是：从CSV文件中导入进来的字段鉴定器，也存在这样的问题。
纯数据的东西，导入进来以后，需要具有对字段值的检验查错能力。



