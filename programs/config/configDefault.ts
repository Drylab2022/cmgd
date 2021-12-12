require("./config4Docker");
require("./config4HFOffice");
require("./config4HFHome");
require("./config4WanQuanDocker");
require("./config4CMGD");
import { defaultConfig } from "./configBase";
//单元测试
if (module === require.main) {
  //如果希望软件能够在什么环境里面运行，就得把响应的配置文件加载进来
  defaultConfig.show4debug();
}
