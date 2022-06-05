const axios = require("axios");
const csv = require("csvtojson");

const templateGithubUrl =
  "https://raw.githubusercontent.com/waldronlab/curatedMetagenomicDataCuration/master/inst/extdata/template.csv";

const columnNameIndex = 0;
const uniquenessIndex = 2;
const requirednessIndex = 3;
const multipleValuesIndex = 4;
const allowedValuesIndex = 5;

async function initializeTemplate(
  uniqueProperties,
  requiredProperties,
  multipleValuesProperties,
  propertyToRegex,
  properties
) {
  const template = await axios.get(templateGithubUrl);

  const csvRows = await csv({
    noheader: false,
    output: "csv",
  })
    .fromString(template.data)
    .then((csvRows) => {
      return csvRows;
    });

  for (const row of csvRows) {
    const propertyName = row[columnNameIndex];
    const multipleValue = row[multipleValuesIndex];

    if (row[uniquenessIndex] === "unique") {
      uniqueProperties.add(propertyName);
    }

    if (row[requirednessIndex] === "required") {
      requiredProperties.add(propertyName);
    }

    if (multipleValue === "TRUE") {
      multipleValuesProperties.add(propertyName);
    }

    properties.add(propertyName);

    propertyToRegex.set(
      propertyName,
      RegExp(regexGenerator(row[allowedValuesIndex]))
    );
  }
}

function regexGenerator(regex) {
  const generateRegex = `^${regex.replace("|", "$|^")}$`;

  return generateRegex;
}

/**
 * Doing the regex and additional properties check in the same function
 */
function checkRegexAndAdditionalProperties(
  sample,
  propertyToRegex,
  multipleValuesProperties,
  errorsPool,
  warningsPool,
  properties
) {
  const curation = sample.curation;

  for (const property in curation) {
    if (checkUnknownProperties(property, properties, warningsPool)) {
      continue;
    }

    const values = String(curation[property]).split(";");

    if (values.length > 1 && !multipleValuesProperties.has(property)) {
      errorsPool.push(
        `error: don't allow multiple values, sample: ${sample.sampleId}, property: ${property}`
      );
      continue;
    }

    const regex = propertyToRegex.get(property);

    for (const value of values) {
      if (!regex || !regex.test(value)) {
        errorsPool.push(
          `error: wrong format: sample: ${sample.sampleId}, property: ${property}`
        );
        break;
      }
    }
  }
}

function checkRequiredness(sample, requiredProperties, errorsPool) {
  const curation = sample.curation;
  requiredProperties.forEach((property) => {
    if (!(property in curation)) {
      errorsPool.push(
        `error: ${property} is required in sample: ${sample.sampleId}`
      );
      return false;
    }
  });

  return true;
}

function checkUniqueness(
  sample,
  uniqueProperties,
  uniquePropertiesMap,
  errorsPool
) {
  const curation = sample.curation;

  for (const property in curation) {
    const propertyValue = curation[property];

    if (uniqueProperties.has(property)) {
      if (!uniquePropertiesMap.has(property)) {
        uniquePropertiesMap.set(property, new Set([propertyValue]));
      } else {
        const propertyValueSet = uniquePropertiesMap.get(property);

        if (propertyValueSet.has(propertyValue)) {
          errorsPool.push(
            `error: duplicated property: ${property} = ${propertyValue}, property must be unique`
          );
        } else {
          propertyValueSet.add(propertyValue);
        }
      }
    }
  }
}

function checkUnknownProperties(property, properties, warningsPool) {
  if (!properties.has(property)) {
    warningsPool.push(`warning: unknown property ${property}`);
    return true;
  }

  return false;
}

module.exports = {
  /**
   * Unique checker:
   * space complexity: O(n * m) n -> number of sample, m -> number of unique properties = 1
   * time complexity: O(n * m) n -> number of sample, m -> number of curation properties
   **/

  async check(samples) {
    const propertyToRegex = new Map();
    const uniqueProperties = new Set();
    const requiredProperties = new Set();
    const multipleValuesProperties = new Set();
    const uniquePropertiesMap = new Map();
    const properties = new Set();

    const errorsPool = [];
    const warningsPool = [];

    await initializeTemplate(
      uniqueProperties,
      requiredProperties,
      multipleValuesProperties,
      propertyToRegex,
      properties
    );

    samples.forEach((sample) => {
      checkRegexAndAdditionalProperties(
        sample,
        propertyToRegex,
        multipleValuesProperties,
        errorsPool,
        warningsPool,
        properties
      );
      checkRequiredness(sample, requiredProperties, errorsPool);
      checkUniqueness(
        sample,
        uniqueProperties,
        uniquePropertiesMap,
        errorsPool
      );
    });

    return {
      errorsPool: errorsPool,
      warningsPool: warningsPool,
    };
  },
};
