# 动机

大多数系统的关键数据流无非是整理好的数据进入数据库，使用者需要的时候通过web service接口在从数据库出来。

所以，数据出入PostgreSQL数据库成为一个关键问题。

虽然sequelize可以简化数据库的使用，但是无奈其自动化程度太高，往往屏蔽不少细节。增加了差错的难度。
直接操作PostgreSQL数据库是故障诊断，查找错误的重要手段。

因此，开始研究数据如何出入PostgreSQL数据库。

# 访问PostgreSQL数据库采用的 包

大多数地方推荐是pg,甲方提供的程序中可见

```json
"pg": "^8.4.1",
```

所以，我们也只研究如何使用`pg`来连接数据库。

## 数据库访问包pg的安装

```bash
npm install  pg -S
```

# 连接数据库

## 直接连接方式(一般情况下不要用,因为我还没学会如何断开连接)

### 可重用代码
```javascript
//1.引入需要的库
var pg = require('pg');
//2.连接字符串(连接数据库必须的关键敏感信息都在其中)
//tcp://用户名：密码@服务器地址/数据库名
var conString = "tcp://postgres:docker@192.168.142.7/postgres";
//3.创建链接用的客户端
var client =  new pg.Client(conString);
//4.准备连接后的处理函数
function afterConnect(error, results){
    if (error) {
        console.log('数据库连接失败:'+error.message);
        client.end();
        return;
    }
    console.log('数据库连接成功,开展后续业务\n');
}
//5.最后实施连接
client.connect(afterConnect);
```

### 执行结果

```bash
D:\node\node.exe E:\万全\仅自己可见\test\test.js
数据库链接成功,开展后续业务
```

## 使用连接池(推荐这种方式)

### 可重用代码如下(DatabaseConnector.ts)

```typescript
//数据库连接器基类
export class DatabaseConnectorBase {
    //1.这个负责提供连接数据库所必须的主机名
    protected getHostName(): string {
        return "localhost"
    }

    //2.这个负责提供连接数据库必须的端口号
    protected getPort(): number {
        return 5432
    }

    //3.这个负责提供连接数据库必须的用户名
    protected getUserName(): string {
        return 'postgres'
    }

    //4.这个负责提供连接数据库必须的密码
    protected getPassword(): string {
        return '123456'
    }

    //5.这个负责提供链接数据库所必须的库名(因为一台数据库服务器上存在多个数据库)
    protected getDatabaseName(): string {
        return 'postgres'
    }

    //以上五个信息是主要信息(目前允许使用者定制,其它信息暂且固化在以下函数中)
    public getConfig(): Object {
        return {
            //以下五个信息是主要信息(目前允许使用者定制)
            host: this.getHostName(),
            port: this.getPort(),
            user: this.getUserName(),
            password: this.getPassword(),
            database: this.getDatabaseName(),
            //其它信息暂且固化在以下函数中,需要定制的时候再行商定
            max: 20, // 连接池存储的最大的连接数量
            idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
        }
    }

    //以下信息是调试用的，用来显示连接器所使用的信息
    public showConfig(): void {
        console.log(this.getConfig());
    }
}

//何飞个人的数据库连接信息(通过这种方式，我们的数据库连接信息就可以重用了)
export class DbConnectorOfHefei extends DatabaseConnectorBase {
    //1.我架设的数据库服务器不在本机，而在192.168.142.7上面,所以覆盖基类中的定义
    protected getHostName(): string {
        return "192.168.142.7"
    }

    //2.我们的密码不是默认的123456,而是docker
    protected getPassword(): string {
        return 'docker'
    }
}
```



# 使用连接池操作数据库

## 可重用代码如下(./t.ts)

```typescript
import {Pool} from 'pg';
//以下的dbc是DatabaseConnector的缩写
import * as dbc from './DatabaseConnector';

//连接器
//var connector=new dbc.DatabaseConnectorBase();
var connector = new dbc.DbConnectorOfHefei();
//connector.showConfig();

// 创建一个连接池
var pool = new Pool(connector.getConfig());

//连接后处理程序
function afterconnect(client) {
    //连接成功之后，我们会得到一个客户端
    client
        //调用客户端的方法query即可完成针对数据库的操作(下面的这行演示了插入)
        .query("INSERT INTO public.test(value)VALUES ($1);", ["test"])
        // 如果还需要继续操作，那么只需要then即可,在then里面上次执行的结果可用,客户端client仍然可用
        .then(res => {
            console.log("插入成功");
            console.log(res);
            //此时返回的是一个普通的值，不是一个promise,所以返回值会传递到下一个then里面
            return res;
        })
        .then(res => {
            // 上次返回的普通值传递到此处，但是我们并没有使用它
            return client.query("Select * FROM public.test WHERE id = $1", [1]);
        })
        .then(res => {
            // 输出结果，看是否插入成功
            console.log(res.rows[0])
        })
        .then(res => {
            // update 数据，将age改为21
            return client.query("UPDATE public.test SET value=$1 WHERE id=$1", [1])
        })
        .then(res => {
            // 再查询一次xiaoming
            return client.query("Select * FROM public.test WHERE id = $1", [1]);
        })
        .then(res => {
            // 再输出结果，看是否改为了21
            console.log(res.rows[0])
        })
        .then(res => {
            // 删除数据
            client.query("DELETE FROM public.test WHERE id=$1", [1])
        })
        .then(res => {
            // 最后再查询一次xiaoming
            res = client.query("Select * FROM public.test WHERE id = $1", [1]);
            // 释放连接
            client.release()
            return res
        })
        .then(res => {
            // 再输出结果，没数据 undefined
            console.log(res.rows[0])
        },res=>{
            // 如果操作失败的话，也需要释放连接
            client.release()
        });
}

// 在表test尝试增删改查四种操作
pool.connect().then(afterconnect)
```

