# 地位:外置模块

因为是外置的第三方模块，所以就需要手动安装。

## 安装指令

```bash
npm install express -S
npm install @types/express -S
```

## 辅助http模块实现http服务器

express程序的实现，应该在[上文](/关键技术/webService/http/README.md)的基础上修改而得到。

[上文](/关键技术/webService/http/README.md)的第一步和第三步都不用做任何修改，只需要在第二步稍作简化即可。

### 变化之前

第二步使用的是如下形式的处理函数来创建http服务器。

```typescript
function (req, res){......}
```

### 变化之后

使用了一个特殊的对象叫做app来创建http服务器。代码如下：

```typescript
const httpServer=http.createServer(app);
```

接下来，我们就专门研究这个app是怎么来的。

# app是怎么来的

## 要产生一个app需要两步

### 第一步:引入express模块

```typescript
import express=require("express");
```

### 第二步:调用express模块的默认函数

```typescript
const app=express();
```

通过以上两步，一个简单得不能再简单的app就算创建成功了。

但是，这个app只是基础，所有的app都是这么两步创建出来的。

它还没有具体的应用程序独特的部分，比如对客户端请求的响应啥的。

各个不同的app处理是不同的。

这就需要在使用这个app创建http应用之前，进行一些个性化的设置。

## app的个性化设置

### 路由思想(虚拟路径和处理函数)

其中最为常见的就是路由思想(虚拟路径和处理函数)。

也就是把一个处理函数和一个虚拟路径挂接起来，当浏览者访问特定的虚拟路径时就使用相应的处理函数来响应。

代码写法1：

```typescript
app.get('/', function (req, res) {
   res.send('hello');
})
```

代码写法2：

```typescript
app.use('/', function (req, res) {
   res.send('hello');
})
```

以上两种写法，除了方法名称是get和use的区别之外，好像没有任何区别。

但是，这一个例子比上一个例子可维护性要好多了。