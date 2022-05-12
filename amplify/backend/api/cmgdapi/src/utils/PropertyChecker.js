const axios = require('axios');
const csv=require('csvtojson');

const templateGithubUrl = "https://raw.githubusercontent.com/waldronlab/curatedMetagenomicDataCuration/master/inst/extdata/template.csv";
const columnNameIndex = 0;
const regexIndex = 5;
const propertyToRegex = new Map();

async function initializeTemplate() {
    const template = await axios.get(templateGithubUrl);

    const csvRows = await csv({
        noheader: false,
        output: "csv"
    })
        .fromString(template.data)
        .then((csvRows)=>{
            return csvRows;
        })

    for(const row of csvRows) {
        propertyToRegex.set(row[columnNameIndex], RegExp(row[regexIndex]));
    }
}

function checkHelper(curation) {
    for(const property in curation) {
        const regex = propertyToRegex.get(property);
        if(!regex || !regex.test(curation[property]))
            return false;
    }

    return true;
}

module.exports = {
    async checkSingleProperties(curation) {
        await initializeTemplate();
        return checkHelper(curation);
    }
};


