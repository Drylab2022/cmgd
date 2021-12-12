# 地位：内置模块

http模块是nodejs的内置模块，所以不需要专门进行安装。

# 用法关键

## 第一步:引入http模块

```typescript
import http = require("http");
```

## 第二步:创建http服务器

```typescript
const httpServer=http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(util.inspect(url.parse(req.url, true)));
    });
```

## 第三步：监听

```typescript
httpServer.listen(3000);
```

