import {DBType} from "../src/types/db-type";

const video1: any = {
    id: 0,
    title: 'string',
    author: 'string',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: '2024-12-07T18:59:56.299Z',
    publicationDate: '2024-12-07T18:59:56.299Z',
    availableResolutions: [
        'P144'
    ]
};

const dataset1: DBType = {
    videos: [],
};

export {
    video1,
    dataset1,
};