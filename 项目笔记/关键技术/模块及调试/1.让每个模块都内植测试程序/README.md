# 动机

## 见识python的单元测试代码

```python
//以下程序只有在当前单元做为入口/主模块的时候才会执行
if __name__ == '__main__':
    #单元测试代码写在此处

```

## 希望

在ts/js系列程序中也能够实现以上风格的单元测试代码。

## 开发语言

ts转码js。

# 原理

## 代码写法

```typescript
//以下程序只有在当前单元做为入口/主模块的时候才会执行
if (module===require.main){
    //单元测试代码写在此处
}
```

## 以上代码生效的前提条件

因为需要使用两个对象，分别是内置的对象`module`和`require`。

在ts代码中，默认不带这两个对象。

解决办法是安装node.js类型包。

### node.js类型包安装指令

```bash
npm install @types/node -S
```

注意：`@types/`node就表示node类型包。

同理：`@types/xxx`则表示xxx提供的类型包。

# 实验程序

## 模块1

### 源码

```typescript
export function f():void{
 console.log("模块m1内的函数f1");
}

if (module===require.main){
    console.log("模块m1内的单元测试代码");
}
```

### 单元测试结果

```bash
模块m1内的单元测试代码
```

## 模块2

### 源码

```typescript
export function f():void{
    console.log("模块m2内的函数f2");
}

if (module===require.main){
    console.log("模块m2内的单元测试代码");
}
```

### 单元测试结果

```bash
模块m2内的单元测试代码
```

## 使用以上两个模块的应用程序总入口

### 源码

```typescript
import * as m1 from "./m1"
import * as m2 from "./m2"

//既然是总入口，严格的说，代码就可以不用加以下判断条件了
//我们为了保持代码风格上的一致性，所以仍然保留这种风格
if (module === require.main) {
    m1.f();
    m2.f();
    console.log("整个程序的入口");
}
```

### 执行结果

```bash
模块m1内的函数f1
模块m2内的函数f2
整个程序的入口
```

