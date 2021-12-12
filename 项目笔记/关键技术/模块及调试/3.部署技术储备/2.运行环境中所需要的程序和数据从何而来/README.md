# 因为涉及到版权

所以程序和数据都通过容器的卷映射注入容器内，而不是直接做在容器里面。

这样，别人就算拿到容器也没有办法使用。

## 导入需要的数据

### 原始来源

git仓库:[https://github.com/QuanWan89/curatedMetagenomicDataCuration](https://github.com/QuanWan89/curatedMetagenomicDataCuration)

### 容器内位置

```bash
/data/4import
```

## 运行的程序

### 来源位置

我们的git仓库目录:programs

### 容器内的位置

```bash
/programs
```

