import http = require("http");
import express = require("express");
import path = require("path");
import doc = require("swagger-jsdoc");
import ui = require("swagger-ui-express");
import bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//1.引入模块化之后的路由序偶
const query = require("./router/query");
const append = require("./router/append");
const delete_ = require("./router/delete");
const init_ = require("./router/db");

//2.使用路由序偶(可以用来代替http请求处理程序)
app.use("/query", query);
app.use("/append", append);
app.use("/delete", delete_);
app.use("/db", init_);
//3.swagger的全局选项/工程选项
const swaggerOptions = {
  definition: {
    //OpenAPI的版本：我们使用最新的3.0版本
    openapi: "3.0.1",
    //其它显示给使用者的全局信息
    info: {
      //这套api的名字：万全
      title: "CuratedMetagenomicData",
      //这套api的版本1.0.0
      version: "1.0.0",
      description: "CuratedMetagenomicData API",
    },
  },
  //这个就很重要了，它决定了从哪里提取api的规范信息
  apis: [path.join(__dirname, "router/*.js")],
};

//4.使用文档(输入系统)生成内存中的数据对象规范
const spec = doc(swaggerOptions);
//5.根据规范生成网页界面
app.use("/api-docs", ui.serve, ui.setup(spec));

if (module === require.main) {
  http.createServer(app).listen(80);
}
