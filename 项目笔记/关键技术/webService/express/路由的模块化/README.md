# 复习

在[前文](/关键技术/webService/express/了解路由思想/README.md)我们已经掌握了路由的思想，其实所谓的路由就是虚拟路径和处理程序组合在一起，形成序偶(pair)。

这个序偶叫什么呢？英文原文叫做router，翻译过来是路由器(为了和硬件上的路由器区别，我们就称其为路由序偶吧)。

# 提出问题

[前文](/关键技术/webService/express/了解路由思想/README.md)中的路由序偶，提供和使用都在同一个文件中，维护起来很不方便。

所以，此处我们把二者分离开，路由的提供者一个文件，路由的使用者另外一个文件。

# 路由序偶提供者

## 文件名

```bash
hello.ts
```

## 文件内容

```typescript
//第一部分：所有路由都相同的头部
import express=require("express");
const router=express.Router();

//中间部分：才是路由自己的个性化部分
router.get('/', function (req, res) {
    res.send('hello');
})

//最后部分：是把路由暴露给其它模块的代码
module.exports=router;
```

# 路由序偶使用者

```typescript
import http=require("http");
import express=require("express");
const app=express();

//1.引入模块化之后的路由序偶
const router=require("./router/hello")

//2.使用路由序偶(可以用来代替http请求处理程序)
app.use('/', router);

if (module===require.main){
    http.createServer(app).listen(3000);
}
```

