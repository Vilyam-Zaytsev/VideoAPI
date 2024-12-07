import {config} from "dotenv";
config();

const SETTINGS = {
    PORT: process.env.PORT || 5000,
    PATH: {
        VIDEOS: '/videos',
    },
};

export {SETTINGS};
