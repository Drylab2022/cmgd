export function translateToColumns(samples) {
  return samples.map(({ id, ...remainedPropertiesWithoutId }) => {
    let { curation, ...remainedPropertiesWithoutCuration } =
      remainedPropertiesWithoutId;
    return {
      ...remainedPropertiesWithoutCuration,
      ...curation,
    };
  });
}

export function translateToCurationObject(uploadData) {
  return uploadData.map(({ ProjectId, sampleId, ...curation }) => {
    return {
      sampleId,
      curation: { ...curation },
    };
  });
}
