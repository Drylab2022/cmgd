# swagger是什么

是一个web service框架/规范。

## 特点

用于web service的生成，描述，调用和可视化。

## 限制

只支持RESTful 风格的 Web Service，并不支持XML风格的Web Service。

## 地位

连java都开始支持swagger规范了。

# 在nodejs运行环境下完善swagger的工作条件

## 需要安装的包

### web应用开发框架express

```bash
npm install express -S
```

比如：express内置了**express.static**，可以用来直接发布本地磁盘目录为web虚拟目录。

