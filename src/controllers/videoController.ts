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

            return;
        }

        res
            .status(200)
            .json(responseVideo);
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
            id: Math.floor(Date.now() + Math.random()),
            canBeDownloaded: true,
            minAgeRestriction: null,
            // createdAt: new Date().toISOString(),
            // publicationDate: new Date().toISOString(),

            createdAt: (() => {
                const currentDate = new Date(); // Текущая дата
                currentDate.setDate(currentDate.getDate() + 1); // Добавляем 1 день
                return currentDate.toISOString(); // Преобразуем в строку формата ISO
            })(),
            publicationDate: (() => {
                const currentDate = new Date(); // Текущая дата
                currentDate.setDate(currentDate.getDate() + 1); // Добавляем 1 день
                return currentDate.toISOString(); // Преобразуем в строку формата ISO
            })(),
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

            return;
        }

        const title = req.body.title;
        const author = req.body.author;
        const availableResolutions = req.body.availableResolutions;
        const canBeDownloaded = req.body.canBeDownloaded;
        const minAgeRestriction = req.body.minAgeRestriction;

        titleFieldValidator(title, errors);
        authorFieldValidator(author, errors);
        availableResolutionsFieldValidator(availableResolutions, errors);
        canBeDownloadedValidator(canBeDownloaded, errors);
        minAgeRestrictionFieldValidator(minAgeRestriction, errors);

        if (errors.errorsMessages.length) {
            res
                .status(400)
                .json(errors);

            return;
        }

        videoToUpdate.title = title;
        videoToUpdate.author = author;
        videoToUpdate.availableResolutions = availableResolutions;
        videoToUpdate.canBeDownloaded = canBeDownloaded;
        videoToUpdate.minAgeRestriction = minAgeRestriction;
        videoToUpdate.publicationDate = new Date().toISOString();

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
            return;
        }


        db.videos = db.videos.filter(v => v.id !== videoId);

        res
            .status(204)
            .end();
    },
};

export {videoController};
