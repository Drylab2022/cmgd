//全局配置基础
import * as fs from "fs";
import {Dialect, Op, Options, Sequelize} from 'sequelize';
import {connect} from "../SequelizeDB/connect";
import {log} from "../log/logger"

export class ConfigBase {
    public getStudiesDir(): string {
        log.error("每次研究一个工程的数据的目录必须设置");
        throw new Error();
    }

    //template.csv
    public getFieldDefineCSV(): string {
        log.error("字段定义文件:template.csv必须设置");
        throw new Error("");
    }

    //为了调试而显示信息
    public show4debug() {
        console.log("当前配置信息："+this.constructor.name);
        console.log("\t1.研究工程目录=" + this.getStudiesDir());
        console.log("\t2.数据库连接信息");
        console.log(this.getSequelizeOptions());
    };

    //1.这个负责提供连接数据库所必须的主机名
    protected getPostgresHostName(): string {
        return process.env.DB_HOST || "192.168.142.7";
    }

    //2.这个负责提供连接数据库必须的端口号
    protected getPostgresPort(): number {
        return 5432;
    }

    //3.这个负责提供连接数据库必须的用户名
    protected getPostgresUserName(): string {
        return process.env.DB_USER || "postgres";
    }

    //4.这个负责提供连接数据库必须的密码
    protected getPostgresPassword(): string {
        return process.env.DB_PWD || "docker";
    }

    //5.这个负责提供链接数据库所必须的库名(因为一台数据库服务器上存在多个数据库)
    protected getPostgresDatabaseName(): string {
        return process.env.DB_NAME || "tsv";
    }

    //6.数据库类型
    protected getDialect(): Dialect {
        return "postgres";
    }

    //得到数据库连接参数
    private getSequelizeOptions():Options{
        let result:Options = {
            dialect: this.getDialect(),
            host: this.getPostgresHostName(),
            port: this.getPostgresPort(),
            database: this.getPostgresDatabaseName(),
            username: this.getPostgresUserName(),
            password: this.getPostgresPassword(),
            logging: function(sql) {
                log.info(sql);
            },
            operatorsAliases:{
                "gt": Op.gt,
                "lt": Op.lt,
                "gte":Op.gte,
                "lte":Op.lte,
                "ne":Op.ne,
                "and":Op.and,
                "or":Op.or,
                "in":Op.in,
                "contains":Op.contains,
                "contained":Op.contained,
                "like":Op.like
            }

        };
        return result;
    }

    //检测运行环境是否满足当前配置
    public checkEnv(): boolean {
        var result: boolean = true;
        //1.先判断存放研究数据的目录是否存在
        if (result) {
            try
            {
                let stat = fs.statSync(this.getStudiesDir());
                result = stat.isDirectory();
            }
            catch {
                result=false;
            }
        }
        //2.判断字段定义文件是否存在
        if (result) {
            try
            {
                let stat = fs.statSync(this.getFieldDefineCSV());
                result = stat.isFile();
            }
            catch {
                result=false;
            }
        }
        //3.判断连接信息是否正确
        if (result) {
            result=connect(this.getSequelizeOptions());
        };
        //4.最后保存
        if(result){
            defaultConfig=this;
        }
        return result;
    };
}

//默认的配置
export var defaultConfig: ConfigBase = null;
