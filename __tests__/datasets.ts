import {DBType} from "../src/db/db";

const video1: any = {
    id: Date.now() + Math.random(),
    title: `t ${Date.now() + Math.random()}`,
};

const dataset1: DBType = {
    videos: [video1],
};

export {
    video1,
    dataset1,
};