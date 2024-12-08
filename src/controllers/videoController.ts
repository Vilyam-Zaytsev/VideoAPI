import {Request, Response} from "express";
import {db} from "../db/db";
import {InputVideoType, OutputVideoType} from "../types/video-types";
import {titleFieldValidator} from "../validation/titleFieldValidator";
import {errors} from "../validation/errors";
import {authorFieldValidator} from "../validation/authorFieldValidator";
import {availableResolutionsFieldValidator} from "../validation/availableResolutionsFieldValidator";
import {canBeDownloadedValidator} from "../validation/canBeDownloadedValidator";
import {minAgeRestrictionFieldValidator} from "../validation/minAgeRestrictionFieldValidator";
import {ErrorsType} from "../types/errors-type";
import {publicationDateFieldValidator} from "../validation/publicationDateFieldValidator";

const videoController = {
    getVideos: (
        req: Request,
        res: Response<OutputVideoType[]>) => {
        const videos: OutputVideoType[] = db.videos;

        res
            .status(200)
            .json(videos);
    },

    getVideo: (
        req: Request,
        res: Response<OutputVideoType | ErrorsType>) => {
        const videoId = Number(req.params.id);
        const responseVideo: OutputVideoType | undefined = db.videos.find(v => v.id === videoId);

        if (!responseVideo) {
            errors.errorsMessages.push({
                message: 'There is no video with this ID',
                field: 'ID'
            })
            res
                .status(404)
                .json(errors);

            errors.errorsMessages = [];

            return;
        }

        res
            .status(200)
            .json(responseVideo);
    },
    createVideo: (
        req: Request<any, any, InputVideoType>,
        res: Response<any, OutputVideoType>) => {
        const titleClient = req.body.title;
        const authorClient = req.body.author;
        const availableResolutionsClient = req.body.availableResolutions;

        titleFieldValidator(titleClient, errors);
        authorFieldValidator(authorClient, errors);
        availableResolutionsFieldValidator(availableResolutionsClient, errors);

        if (errors.errorsMessages.length) {
            res
                .status(400)
                .json(errors);

            errors.errorsMessages = [];

            return;
        }



        const newVideo = {
            id: Math.floor(Date.now() + Math.random()),
            title: titleClient,
            author: authorClient,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: availableResolutionsClient,
        };
        db.videos = [...db.videos, newVideo];

        res
            .status(201)
            .json(newVideo);
    },
    updateVideo: (req: Request, res: Response) => {
        const videoId = Number(req.params.id);
        const videoToUpdate: OutputVideoType | undefined = db.videos.find(v => v.id === videoId);

        if (!videoToUpdate) {
            errors.errorsMessages.push({
                message: 'There is no video with this ID',
                field: 'ID'
            })
            res
                .status(404)
                .json(errors);

            errors.errorsMessages = [];

            return;
        }

        const {
            title,
            author,
            availableResolutions,
            canBeDownloaded,
            minAgeRestriction,
            publicationDate
        } = req.body;

        titleFieldValidator(title, errors);
        authorFieldValidator(author, errors);
        availableResolutionsFieldValidator(availableResolutions, errors);
        canBeDownloadedValidator(canBeDownloaded, errors);
        minAgeRestrictionFieldValidator(minAgeRestriction, errors);
        publicationDateFieldValidator(publicationDate, errors);

        if (errors.errorsMessages.length) {
            res
                .status(400)
                .json(errors);

            errors.errorsMessages = [];

            return;
        }

        videoToUpdate.title = title;
        videoToUpdate.author = author;
        videoToUpdate.availableResolutions = availableResolutions;
        videoToUpdate.canBeDownloaded = canBeDownloaded;
        videoToUpdate.minAgeRestriction = minAgeRestriction;
        videoToUpdate.publicationDate = publicationDate;

        db.videos = db.videos.map(v => v.id === videoId ? videoToUpdate : v);

        res
            .status(204)
            .end();
    },
    deleteVideo: (req: Request, res: Response) => {
        const videoId = Number(req.params.id);
        const videoToDelete = db.videos.find(v => v.id === videoId);

        if (!videoToDelete) {
            errors.errorsMessages.push({
                message: 'There is no video with this ID',
                field: 'ID'
            });

            res
                .status(404)
                // .json(errors);
                .end();

            errors.errorsMessages = [];

            return;
        }


        db.videos = db.videos.filter(v => v.id !== videoId);

        res
            .status(204)
            .end();
    },
};

export {videoController};
