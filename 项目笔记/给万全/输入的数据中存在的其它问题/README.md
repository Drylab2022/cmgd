# 目前发现的有三个问题

## 第一个比较简单

### 错误提示

```bash
age:41.0不匹配[0-9]+
median_read_length:150.0不匹配[0-9]+
infant_age:217.0不匹配[0-9]+
infant_age:304.0不匹配[0-9]+
infant_age:337.0不匹配[0-9]+
```

意思就是年龄(age)的值是41.0和要求的数字串不匹配啊。给出的值多出来一个小数点。

## 第二个问题也比较简单

### 错误提示

```bash
disease_subtype:undetermined_colitis不匹配healthy|CD|UC|adenoma|smalladenoma|largeadenoma|advancedadenoma|adenocarcinoma|carcinoma|AS|cholera|T1D_nonconverter|T1D_seroconverter|NAFLD|Ulc
erative_colitis|Indeterminate_colitis
```

disease_subtype的值怎么就神出鬼没的冒出来个undetermined_colitis呢？

## 第三个问题比较复杂

### 先提出问题

```bash
 NCBI_accession:NA不匹配[ES]R[SR][0-9]+
```

说明:NCBI_accession这个字段也可能出现值NA，此前所有出现过NA的我见过的都仅仅是单值而已。
NCBI_accession是我首次发现的，多值字段出现了NA。

### 复杂在哪里呢？

因为对于多值这一块，一直没有和甲方确认。

多值到底是集合(集合的话，顺序无关：也就是，元素顺序改变还是原来的集合)，还是序列(序列的话，顺序相关：也就是，元素之间的顺序改变了，就成了一个新的序列)呢?
我目前是按照惯例当做集合处理的。

集合又分成普通集与多重集

比如：多重集特指元素可以重复的集合，比如{1,1,2,3}这种。其中允许出现两个1，普通集合是绝对不允许出现重复元素的。

所以，对于多值我在校验的时候都做了排序和去重。

难在哪里呢？一旦集合允许出现NA，就需要搞清楚。NA表示的是一个特定的集合？还是集合中的一个特定的元素。

对于单值，`yes|no|NA`。NA就表示一个候选的值而已。对于多值，情况要复杂不少。










