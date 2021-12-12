# 开始阅读此前的代码

我主要关心的目前还不是目标系统是如何实现的，而是关心的目标系统的功能到底是什么？

明白了功能才能考虑实现问题。

# 使用的代码仓库为

```bash
https://github.com/QuanWan89/cmgd_wrapup
```

## 账号

这是一个开放仓库，git clone的时候根本不需要任何账号。

## 命令及进度

```bash
time git clone https://github.com/QuanWan89/cmgd_wrapup.git .
Cloning into '.'...
remote: Enumerating objects: 4331, done.
remote: Counting objects: 100% (4331/4331), done.
remote: Compressing objects: 100% (3233/3233), done.
remote: Total 4331 (delta 934), reused 4331 (delta 934), pack-reused 0
Receiving objects: 100% (4331/4331), 4.56 MiB | 10.00 KiB/s, done.
Resolving deltas: 100% (934/934), done.
Updating files: 100% (4179/4179), done.

real    7m49.118s
user    0m0.000s
sys     0m0.015s
```

从国外的github克隆过来，竟然花了将近8分钟。

网络条件并不是太顺。

# 先从node-api开始阅读代码

## 执行index.js

### 错误提示如下

```bash
D:\node\node.exe E:\t\t9\cmgd_wrapup\node-api\index.js
internal/modules/cjs/loader.js:818
  throw err;
  ^

Error: Cannot find module 'express'
Require stack:
- E:\t\t9\cmgd_wrapup\node-api\index.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:815:15)
    at Function.Module._load (internal/modules/cjs/loader.js:667:27)
    at Module.require (internal/modules/cjs/loader.js:887:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (E:\t\t9\cmgd_wrapup\node-api\index.js:1:17)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ 'E:\\t\\t9\\cmgd_wrapup\\node-api\\index.js' ]
}

Process finished with exit code 1

```

### 错误的原因

需要的库根本就没有安装。

### 解决办法

```bash
D:\node\node.exe D:\node\node_modules\npm\bin\npm-cli.js install --scripts-prepend-node-path=auto
```

以上代码的解释：

根据文件`package.json`中的内容，自动安装其中描述的，需要用到的包。

### 以上命令的输出

```bash
> deasync@0.1.20 install E:\t\t9\cmgd_wrapup\node-api\node_modules\deasync
> node ./build.js

`win32-x64-node-12` exists; testing
Binary is fine; exiting

> nodemon@2.0.4 postinstall E:\t\t9\cmgd_wrapup\node-api\node_modules\nodemon
> node bin/postinstall || exit 0

npm WARN node-api@1.0.0 No description
npm WARN node-api@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 251 packages from 175 contributors in 41.014s

9 packages are looking for funding
  run `npm fund` for details


Process finished with exit code 0

```

貌似顺利。

## 再次执行index.js

成功启动。

### 使用浏览器访问80端口(http://127.0.0.1/)

得到结果为：

```bash
{"message":"not found","errors":[{"path":"/","message":"not found"}]}
```

### 分析

以上结果应该属于预期，我们访问的路径部分应该不是`/`才对。

### 分析index.js中的use部分

```javascript
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/test", require("./routes/api/test"));
app.use("/api/taxonomy", require("./routes/api/taxonomy"));
app.use("/api/sample", require("./routes/api/sample"));
```

接下来分别使用以上4个路径进行测试

## 测试1(http://127.0.0.1/test)

### 得到结果

```bash
{"message":"connect ECONNREFUSED 127.0.0.1:5432"}
```

### 结果分析

5432这个貌似数据库服务器的端口号，我们还没有安装呢。

若因此被拒，也在情理之中。

## 测试1(http://127.0.0.1/api-docs)



### 结果

![image-20201223233554169](image-20201223233554169.png)

### 结果分析

这是一个由swagger提供的UI啊。

既然swagger是web service framework，那么这个ui肯定就是提供给web service的使用者的。

让使用者可以方便的调试我们通过web service这种形式暴露的东东。

暴露出去的东东很可能是方法，暂时不细究。

## 测试(/api/taxonomy和/api/sample)

这个暂时不用测试了。

数据库服务器都没有安装一定不会好使。

明天考虑安装个数据库服务器试试。

# 数据库服务器的安装

## 任意创建一个目录，并进入

假设目录名为:test

## 创建编排文件(docker-compose.yml)

```yaml
version: '3.1'
services:
    # 第一个服务是数据库服务
    quan-postgresql:
      container_name: quan-postgresql
      # 采用的docker image为postgres最新版
      image: postgres:latest
      restart: always
      environment:
      # 以下环境变量表示的是数据库的访问密码
        POSTGRES_PASSWORD: 'docker'           
      ports:
      # 内部端口不变映射到docker容器外部，这是数据库的服务端口
        - 5432:5432
      volumes:
      # 文件卷映射:当前目录下的databasefile目录，映射到容器内部的/var/lib/postgresql/data
        - ./databasefile:/var/lib/postgresql/data
    # 第2个服务是数据库管理界面
    quan-db-manager:
      container_name: quan-db-manager
      image: dpage/pgadmin4:latest
      restart: always
      environment:     
        # 以下环境变量表示数据库管理者的用户名
        PGADMIN_DEFAULT_EMAIL: 'reechand@cust.edu.cn'
        # 以下环境变量表示数据库管理程序的密码
        # 因为一个管理程序可以管理多台数据服务器(所以管理程序的账号独立于数据库服务器的账号)
        PGADMIN_DEFAULT_PASSWORD: 'test1234'
        # 以下三个环境变量是照葫芦画瓢粘贴过来的(啥意思我也不懂
        PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION: 'True'
        PGADMIN_CONFIG_LOGIN_BANNER: '"Authorised users only!"'
        PGADMIN_CONFIG_CONSOLE_LOG_LEVEL: '10'
      ports:
      # 这是使用浏览器访问的端口:我们把80端口转过来
      # 因为数据库服务在5432上面，所以管理端口就设计成5433(二者相邻)
        - 5433:80
```

## 启动服务

启动命令有两个，尝试版本和开发版本。

### 尝试版本的启动

```bash
docker-compose up
```

会有很多输出信息，专门用于除错。如果没问题的话，就用开发版本的启动。

### 开发版本的启动

```bash
docker-compose up -D
```

输出信息很少。-D是daemon的缩写。

## 使用我们安装的服务

### 浏览器访问

```bash
http://192.168.142.7:5433/
```

我的docker运行于192.168.142.7。你的有可能是127.0.0.1。自己根据情况定。

### 登录数据库管理程序

使用以上账号

`reechand@cust.edu.cn`和`test1234`登录数据库管理程序。

### 让管理程序能够管上我们的数据库服务器

通过add server把数据库服务器的登录信息添加进去。

![1608791605563](1608791605563.png)

### 效果如下

因为我们的数据库服务器起名为dbs，所以效果如下

![1608791699234](1608791699234.png)

