import express, {Request, Response} from "express";
import cors from "cors";
import {SETTINGS} from "./settings";
import {videoRouter} from "./routes/videoRouter";
import {testRouter} from "./routes/testRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({version: '1.0'});
});

app.use(SETTINGS.PATH.VIDEOS, videoRouter);
app.use(SETTINGS.PATH.TEST, testRouter);


export {app};