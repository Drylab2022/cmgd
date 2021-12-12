import {Options, Sequelize} from 'sequelize';
import {log} from "../log/logger";

export var seq:Sequelize=null;

export function connect(op:Options): boolean {
    try
    {
        seq=new Sequelize(op);
        return true;
    }
    catch (e) {
        log.fatal("数据库连接失败");
        log.fatal(e);
    }
    return false;
}

if (module===require.main){
    let op:Options={
        dialect:"postgres",
        host: "192.168.138.7",
        port:5432,
        database:"postgres",
        username:"postgres",
        password:"docker"
    };
    connect(op);
}