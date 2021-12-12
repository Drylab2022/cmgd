# 提出问题

## 按照template.csv的描述提取必要列

### 我们得到11个列是必要的

```bash"sampleID"
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

### 使用必要列

既然上面的列是必要的，也就是必不可少的。那么应该说每个样本都应该含有这些列。

所以，逐个验证输入样本。

结果有点让人失望：这些必要列，好像并不完整。

发现缺失现象十分明显，目前已经发现的缺失如下：

```bash
AsnicarF_2020: column "PMID"
DeFilippisF_2019: column "curator"
GhensiP_2019: column "sequencing_platform"
GhensiP_2019: column "PMID"
KaurK_2020: column "curator"
KeohaneDM_2020: column "sequencing_platform"
LassalleF_2017: column "median_read_length"
SchirmerM_2016: column "sampleID"
TettAJ_2016: column "curator"
ThomasAM_2018b: column "PMID"
ThomasAM_2019_c: column "sequencing_platform"
ThomasAM_2019_c: column "PMID"
YachidaS_2019: column "sequencing_platform"
YachidaS_2019: column "PMID"
YachidaS_2019: column "curator"
ZhuF_2020: column "PMID"
```

# 以上问题影响的范围

## 规范的重要性(定位错误，查找错误原因的重要依据)

因为整个数据库是我们在维护，我们需要让入库的数据都满足规范。

只有入库的数据满足规范了，我们才能够根据规范进行检索。

如果检索的时候出现问题了，常见原因无非以下几种：

①我们开发的程序不符合规范(我们的程序是根据规范编写的，这个可能性一般比较小)；

②数据库里面的数据不符合规范(如果我们的程序对入库的所有数据都进行了校验，这个原因是可以排除的)。

③检索语句不符合规范(通常如果说别人违背了规范，应该遵循谁主张谁举证的原则：我们需要清楚的说明它错在何处)。

## 我们编写程序最怕什么

最怕的就是规范频繁修改，所以此处到底是数据错，还是规范错。一定要搞明白。

