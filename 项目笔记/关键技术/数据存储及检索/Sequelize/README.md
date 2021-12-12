# Sequelize的起源

Sequelize是一个自底向上的ORM编程库，其主要就是对常用数据库的包装，目前已知的支持有：

- mysql

- mariadb

- postgres

- mssql

其中支持得最好的是：postgres。因为：

[有一些数据postgres特有的数据类型，Sequelize的支持也非常好](https://www.sequelize.com.cn/other-topics/other-data-types#enum)。



# 增删改查

## 增

比较典型的办法是调用模型的`create`方法。

### 比如

```typescript
const 模型实例 = await 模型.create({
  列名1/字段名1: 字段值
  ,列名1/字段名1: 字段值
});
```

## 查

比较典型的办法是调用模型的`findAll`方法。

总所周知，如果我们不指定列名的话，那么会返回所有列。

如果我们不增加约束条件的话，会返回所有行。

所以，此处存在一个行过滤器和列过滤器的问题。

### 列过滤器(attributes)

attributes是一个数组。

```typescript
Model.findAll({
  attributes: [列1,列2,列3]
});
```

### 行过滤器(where)

where不是数组，而是一个json对象。

where默认的连接词是and

接下往下看即可。

# where

## 默认连接词是and的例子

### 例如

```typescript
Post.findAll({
  where: {
    authorId: 12
    status: 'active'
  }
});
```

以上代码的语义是(注意：隐含的and)

```sql
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

## 如果连接词是or

那么就必须显式地写出来。

比如，下面的写法虽然比较冗长，但是可读性很好。

```typescript
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.or]: [
      { authorId: 12 },
      { authorId: 13 }
    ]
  }
});
```



# 多值如何验证、存储和查询的问题

目前而言，多值只有两种存储方案。

一种是数组，一种是JSON成员。如果是数组的话，存在查询问题。查询的where子句，还不会写。

如果数组支持集合运算的话？会好很多。

## 我们的需求有两个：入库之前要验证，入库之后能查询

验证可以参看[https://www.sequelize.com.cn/core-concepts/validations-and-constraints](https://www.sequelize.com.cn/core-concepts/validations-and-constraints)。



入库后的查询，还需要考虑考虑。