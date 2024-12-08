import {DBType} from "../src/types/db-type";

const video1: any = {
    id: 123,
    title: 'video1',
    author: 'Vilyam',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: '2024-12-07T18:59:56.299Z',
    publicationDate: '2024-12-07T18:59:56.299Z',
    availableResolutions: [
        'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'
    ]
};

const video2: any = {
    id: 123,
    title: 'video2',
    author: 'Vilyam',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: '2024-12-07T18:59:56.299Z',
    publicationDate: '2024-12-07T18:59:56.299Z',
    availableResolutions: [
        'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'
    ]
};

const dataset1: DBType = {
    videos: [video1, video2],
};

export {
    video1,
    dataset1,
};