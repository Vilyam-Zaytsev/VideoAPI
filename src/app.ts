import express, {Request, Response} from "express";
import cors from "cors";
import {SETTINGS} from "./settings";
import {getVideosController} from "./videos/getVideosController";
import {videoRouter} from "./routes/videoRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({version: '1.0'});
});

app.use(SETTINGS.PATH.VIDEOS, videoRouter)


export {app};