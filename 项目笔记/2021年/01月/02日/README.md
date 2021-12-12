# 开始着手字段值的校验

## 首先11个必选字段

### 提取方法

```sql
SELECT *
	FROM public."fieldsDef"
	where requiredness='required'
```

### 提取结果

```bash
"sampleID"
"subjectID"
"body_site"
"country"
"sequencing_platform"
"PMID"
"number_reads"
"number_bases"
"minimum_read_length"
"median_read_length"
"curator"
```

## 看看是不是每个study数据中都含有这11个字段

结果发现：AsnicarF_2020根本不含有必要的列`PMID`，这事儿就不能跳过去了。

目前的处理意见是：先做其它工作，对必要列的验证先放一放。