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
    return uploadData.map(
        ({
            ProjectId,
            avgReadLength,
            createdAt,
            ncbiAccession,
            numberOfReads,
            sampleId,
            sequencingPlatform,
            updatedAt,
            ...curation
        }) => {
            return {
                sampleId,
                curation: { ...curation },
            };
        }
    );
}
