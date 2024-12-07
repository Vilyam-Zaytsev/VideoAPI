import {Request, Response} from "express";
import {db} from "../db/db";
import {InputVideoType, OutputVideoType} from "../types/video-types";
import {titleFieldValidator} from "../validation/titleFieldValidator";
import {errors} from "../validation/errors";
import {authorFieldValidator} from "../validation/authorFieldValidator";
import {availableResolutionsFieldValidator} from "../validation/availableResolutionsFieldValidator";

const videoController = {
    getVideos: (
        req: Request,
        res: Response<OutputVideoType[]>) => {
        const videos: OutputVideoType[] = db.videos;

        res
            .status(200)
            .json(videos);
    },
    createVideo: (
        req: Request<any, any, InputVideoType>,
        res: Response<any, OutputVideoType>) => {
        const title = req.body.title;
        const author = req.body.author;
        const availableResolutions = req.body.availableResolutions;

        titleFieldValidator(title, errors);
        authorFieldValidator(author, errors);
        availableResolutionsFieldValidator(availableResolutions, errors);

        if (errors.errorsMessages.length) {
            res
                .status(400)
                .json(errors);

            return;
        }

            const newVideo = {
            ...req.body,
            id: Date.now() + Math.random(),
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
        };
        db.videos = [...db.videos, newVideo];

            res
            .status(201)
            .json(newVideo);
    },
    updateVideo: (req: Request, res: Response) => {

    },
    deleteVideo: (req: Request, res: Response) => {

    },
};

export {videoController};
