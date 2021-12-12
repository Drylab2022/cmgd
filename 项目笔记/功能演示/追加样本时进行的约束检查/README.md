# 唯一性约束检查

## 实验方式

我们故意构造冲突的样本，测试看报错机制是否健全。

# 首先回到初始状态

删除库中的所有样本，这样是为了实验的流畅性。

方法是：反复执行`/delete/last`，直到删无可删。

# 首先添加一个最初的样本

方法是：执行一次`/append/new`，样本数据就是用example自带的即可。

# 再次添加相同的样本

## 再次添加上次那个样本

方法同[这一步](#首先添加一个最初的样本)。

## 得到的结果

```json
{
  "success": false,
  "cause": {
    "message": "Validation error",
    "errors": [
      {
        "message": "sampleID must be unique",
        "value": "CCIS91228662ST-4-0"
      }
    ]
  }
}
```

## 结论

系统报告的原因是正确的，有助于我们分析添加失败过程中样本id重复的原因，从而解决添加失败问题。

# 让样本ID有差异

## 这一次我们添加的样本如下

```json
{
  "BMI": "31.0",
  "age": "63",
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": [
    "Paolo_Manghi"
  ],
  "disease": [
    "CRC"
  ],
  "sampleID": "CCIS91228662ST-4-0test",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": [
    "ERR479389",
    "ERR479390",
    "ERR480885",
    "ERR480886"
  ],
  "disease_subtype": "carcinoma",
  "non_westernized": "no",
  "study_condition": "CRC",
  "DNA_extraction_kit": "Gnome",
  "median_read_length": "92",
  "minimum_read_length": "45",
  "sequencing_platform": "IlluminaHiSeq",
  "antibiotics_current_use": "NA"
}
```

和默认的example相比，唯一的修改是sampleID后面追加了一个test，从而避免了sampleID重复问题。

## 结果

```json
{
  "success": false,
  "cause": {
    "message": "duplicate key value violates unique constraint \"samples_NCBI_accession_key\"",
    "errors": {},
    "original": {
      "message": "duplicate key value violates unique constraint \"samples_NCBI_accession_key\"",
      "detail": "Key (\"NCBI_accession\")=(ERR479389...\nERR479390...\nERR480885...\nERR480886) already exists."
    }
  }
}
```

## 结论

从以上detail中可以看出`NCBI_accession`出现了重复。

# 多值NCBI_accession的顺序问题测试

接下来，我们只调整现有的NCBI_accession的四个值之间的顺序，其它并不变化。

看看，能够添加成功。

## 有待插入的样本

```json
{
  "BMI": "31.0",
  "age": "63",
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": [
    "Paolo_Manghi"
  ],
  "disease": [
    "CRC"
  ],
  "sampleID": "CCIS91228662ST-4-0test",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": [
    "ERR479389",
    "ERR480885",
    "ERR479390",
    "ERR480886"
  ],
  "disease_subtype": "carcinoma",
  "non_westernized": "no",
  "study_condition": "CRC",
  "DNA_extraction_kit": "Gnome",
  "median_read_length": "92",
  "minimum_read_length": "45",
  "sequencing_platform": "IlluminaHiSeq",
  "antibiotics_current_use": "NA"
}
```



## 结果

错误信息依旧。

## 结论

说明在比较多值字段的重复性上，系统能够自动地排除多个值之间的顺序相关性。采用顺序无关的比较方式来去重。

# 多值NCBI_accession去掉一个值的测试

## 有待插入的样本

```json
{
  "BMI": "31.0",
  "age": "63",
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": [
    "Paolo_Manghi"
  ],
  "disease": [
    "CRC"
  ],
  "sampleID": "CCIS91228662ST-4-0test",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": [
    "ERR479389",
    "ERR480885",
    "ERR480886"
  ],
  "disease_subtype": "carcinoma",
  "non_westernized": "no",
  "study_condition": "CRC",
  "DNA_extraction_kit": "Gnome",
  "median_read_length": "92",
  "minimum_read_length": "45",
  "sequencing_platform": "IlluminaHiSeq",
  "antibiotics_current_use": "NA"
}
```

## 结果

```json
{
  "success": true,
  "cause": "all is well"
}
```

## 结论

每个多值字段的值是作为一个集合这样的整体来比较去重的。

4个值，一旦删除掉了1个。那么这个字段值和原来就不同了。

所以，就通过了唯一性验证。

# 基于正则表达式的验证

## 有待添加的样本

```json
{
  "BMI": "31.0",
  "age": 12.5,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": [
    "Paolo_Manghi"
  ],
  "disease": [
    "CRC"
  ],
  "sampleID": "CCIS91228662ST-4-0test",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": [
    "ERR479389",
    "ERR480885",
    "ERR480886"
  ],
  "disease_subtype": "carcinoma",
  "non_westernized": "no",
  "study_condition": "CRC",
  "DNA_extraction_kit": "Gnome",
  "median_read_length": "92",
  "minimum_read_length": "45",
  "sequencing_platform": "IlluminaHiSeq",
  "antibiotics_current_use": "NA"
}
```

## 样本的特点

年龄为:12.5

## 结果

```json
{
  "success": false,
  "cause": {
    "message": "age:12.5 not match regular expression: [0-9]+"
  }
}
```

## 结论

正规式规则要求年龄必须是整数，也就是数字串构成。

不能带有小数点。

这也是为何官方提供给我的样本很多都无法添加到样本库中的原因之一。



