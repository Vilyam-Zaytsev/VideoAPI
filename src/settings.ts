import {config} from "dotenv";
config();

const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
    },
};

export {SETTINGS};
