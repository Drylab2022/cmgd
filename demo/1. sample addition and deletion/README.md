# Why do we test sample addition and sample deletion together?

Because we can keep the database status consistent between sample addition and deletion. It is good for multiple test.

# Sample Addition

### Web link of API documents

[http://54.167.115.100/api-docs/#/](http://54.167.115.100/api-docs/#/)

### Test sample addition API

![image-20210315201655835](image-20210315201655835.png)

## Prepare data

### Click "Try it out"

![image-20210315201841385](image-20210315201841385.png)

### Paste data in json format (use example data)

![image-20210315201957864](image-20210315201957864.png)

## Insert sample

### Send sample data to the server

![image-20210315202046472](image-20210315202046472.png)

### Check response

![image-20210315202427209](image-20210315202427209.png)

# Query the latest added data

![image-20210315202619433](image-20210315202619433.png)

## Next

![image-20210315202656534](image-20210315202656534.png)

## Last

![image-20210315202742755](image-20210315202742755.png)

## Result

It shows what we insert from [step 1](#sample data) sample data.

![image-20210315202942450](image-20210315202942450.png)

# Delete the latest added data

![image-20210315203040000](image-20210315203040000.png)

## Result

![image-20210315203140745](image-20210315203140745.png)

We delete the sample data we just inserted.
