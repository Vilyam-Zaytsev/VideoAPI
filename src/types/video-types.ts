enum Resolutions {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}

type ResolutionsString = keyof typeof Resolutions;

type OutputVideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Resolutions[] | null,
};

type InputVideoType = {
    title: string,
    author: string,
    availableResolutions: Resolutions[]
};

export {
    Resolutions,
    ResolutionsString,
    OutputVideoType,
    InputVideoType
};