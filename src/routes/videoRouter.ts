import {Router} from "express";
import {videoController} from "../controllers/videoController";

const videoRouter = Router();

videoRouter.get('/', videoController.getVideos)
videoRouter.post('/', videoController.createVideo)
videoRouter.put('/', videoController.updateVideo)
videoRouter.delete('/', videoController.deleteVideo)

export {videoRouter};
