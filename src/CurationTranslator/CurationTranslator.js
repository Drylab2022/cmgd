export function translateToColumns(samples) {
    console.log(samples);
    return samples.map(({id, ...remainedPropertiesWithoutId}) => {
        let {curation, ...remainedPropertiesWithoutCuration} = remainedPropertiesWithoutId;
        return {
            ...remainedPropertiesWithoutCuration,
            ...curation
        }
    });
}