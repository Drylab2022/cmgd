# When do we use /where

You can use where clause on both query and delete

# "equal age" test: Insert two samples with age = 10 and delete them once

## Add sample 1

```json
{
  "BMI": "31.0",
  "age": 10,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-0",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR479390", "ERR480885", "ERR480886"],
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

## Add sample 2

```json
{
  "BMI": "31.0",
  "age": 10,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-0test",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR480886"],
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

## /delete/where

```json
{
  "age": 10
}
```

## Result

```json
{
  "success": true,
  "count": 2
}
```

## Conclusion

It works for deletion using /where condition.

# "unequal age" test

We re-add more samples for test, since previous data are all deleted.

## Add sample data

### Sample 1（feature: age = 10）

```json
{
  "BMI": "31.0",
  "age": 10,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-0",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR479390", "ERR480885", "ERR480886"],
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

### Sample 2（feature: age = 20）

```json
{
  "BMI": "31.0",
  "age": 20,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-0test",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR480885", "ERR480886"],
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

## Delete

### condition (age > 15)

```json
{
  "age": {
    "gt": 15
  }
}
```

### Explanation

No matter we use 10 or `"gt": 15`, they are both for testing `age`.

So far we support:

```
"gt": greater than
"lt": less than
"gte": greater than or equal
"lte": less than or equal
"ne": not equal
```

# Or condition

## Delete existed samples and insert three new samples with ages equal to 10, 15 and 20.

### Sample with age = 15

```json
{
  "BMI": "31.0",
  "age": 15,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-0",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR479390", "ERR480885", "ERR480886"],
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

### Sample with age = 10

```json
{
  "BMI": "31.0",
  "age": 10,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-010",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR479390", "ERR480886"],
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

### Sample with age = 20

```json
{
  "BMI": "31.0",
  "age": 20,
  "tnm": "t1n0m0",
  "PMID": "25432777",
  "ajcc": "i",
  "fobt": "no",
  "gender": "male",
  "country": "FRA",
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-020",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR480886"],
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

## Delete

### condition

```json
{
  "or": [
    {
      "age": {
        "gt": 16
      }
    },
    {
      "age": {
        "lt": 14
      }
    }
  ]
}
```

### Result

```json
{
  "success": true,
  "count": 2
}
```

### Conclusion

We deleted samples which has age greater than 16 or less than 14.

Sample with age = 15 is the only data left.

### Attenion

Value of "or" operater is an array and each element in the array is one condition.

"or" operater can be replaced with "and" operater. But "and" operater is the default.

# where condition on multi-value attribute

## condition

```json
{
  "NCBI_accession": {
    "like": "%SRR2194592%"
  }
}
```

multi-value attribute is treated as one string, so we only support where condition using "like".
