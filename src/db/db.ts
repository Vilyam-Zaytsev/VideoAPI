import {DBType} from "../types/db-type";

const db: DBType = {
    videos: [],
};

const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = [];

        return;
    }

    db.videos = dataset.videos || db.videos;
};

export {
    db,
    setDB,
}