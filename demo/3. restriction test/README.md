# unique value restriction test

## Method

We intentionally insert samples with conflict to test the validation.

# Initiate empty database

Delete all samples

keep executing `/delete/last` until nothing to delete.

# Add first sample

Execuate `/append/new` with example sample data.

# Add same example data

Execuate `/append/new` with example sample data again.

## Result

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

## Conclusion

The error is correct that we try to insert duplicated sampleID.

# Change sample ID to avoid duplicated ID from example.

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
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-0test",
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

## Result

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

## Conclusion

We can observe `NCBI_accession` is duplicated.

# Multi-value NCBI_accession order test

Next, we only adjust the order of four NCBI_accessions

## test data

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
  "curator": ["Paolo_Manghi"],
  "disease": ["CRC"],
  "sampleID": "CCIS91228662ST-4-0test",
  "body_site": "stool",
  "subjectID": "FR-275",
  "age_category": "adult",
  "number_bases": "8027807010",
  "number_reads": "94076829",
  "NCBI_accession": ["ERR479389", "ERR480885", "ERR479390", "ERR480886"],
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

## Result

The duplicate error is still the same.

## Conclusion

The system can detect uniqueness regardless of the order of the NCBI_accessions.

# Take out one NCBI_accession from previous data

## test data

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

## Result

```json
{
  "success": true,
  "cause": "all is well"
}
```

## Conclusion

Multi-value attribute is a integration of values for testing of uniqueness.

Once we delete one NCBI_accession, the string is different and we pass the uniqueness test.

# Validation based on regular expression

## test data

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

## data feature

age = 12.5

## Result

```json
{
  "success": false,
  "cause": {
    "message": "age:12.5 not match regular expression: [0-9]+"
  }
}
```

## Conclusion

It has to be integer rather than float number for age attribute.
