import { ConfigBase } from "./configBase";
import { log } from "../log/logger";

//docker内运行的配置，用于发布产品
export class ConfigOfDocker extends ConfigBase {
  //1.这个负责提供连接数据库所必须的主机名
  protected getPostgresHostName(): string {
    return (
      process.env.DB_HOST ||
      "cmgd-cluster.cluster-cjxzpipgg2mq.us-east-1.rds.amazonaws.com"
    );
  }

  //2.这个负责提供连接数据库必须的端口号
  protected getPostgresPort(): number {
    return 5432;
  }

  //3.这个负责提供连接数据库必须的用户名
  protected getPostgresUserName(): string {
    return process.env.DB_USER || "levi";
  }

  //4.这个负责提供连接数据库必须的密码
  protected getPostgresPassword(): string {
    return process.env.DB_PWD || "Cmgdcuny!";
  }

  //5.这个负责提供链接数据库所必须的库名(因为一台数据库服务器上存在多个数据库)
  protected getPostgresDatabaseName(): string {
    return process.env.DB_NAME || "cmgd";
  }

  public getStudiesDir(): string {
    return "/usr/cmgd";
  }
  //template.csv
  public getFieldDefineCSV(): string {
    return "/usr/cmgd/readme";
  }
}

//初始化
new ConfigOfDocker().checkEnv();

//单元测试
if (module === require.main) {
  const c: ConfigBase = new ConfigOfDocker();
  c.show4debug();
  if (c.checkEnv()) {
    log.log("这个配置文件符合当前环境");
  } else {
    log.error("这个配置文件不符合当前环境");
  }
}
