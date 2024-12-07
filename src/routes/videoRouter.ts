import {Router} from "express";
import {videoController} from "../controllers/videoController";

const videoRouter = Router();

videoRouter.get('/', videoController.getVideos);
videoRouter.get('/:id', videoController.getVideo);
videoRouter.post('/', videoController.createVideo);
videoRouter.put('/:id', videoController.updateVideo);
videoRouter.delete('/:id', videoController.deleteVideo);

export {videoRouter};
