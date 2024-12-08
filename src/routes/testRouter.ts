import {Router} from "express";
import {testController} from "../controllers/testController";

const testRouter = Router();

testRouter.delete('/', testController.deleteAllData);

export {testRouter};