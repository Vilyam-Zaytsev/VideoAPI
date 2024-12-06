import {config} from "dotenv";
config();

const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/hometask_01/api/videos',
    },
};

export {SETTINGS};
