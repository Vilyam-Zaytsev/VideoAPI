import {Request, Response} from "express";
import {setDB} from "../db/db";

const testController = {
    deleteAllData: (req: Request, res: Response) => {
        setDB();

        res
            .status(204)
            .json({'message': 'All data has been deleted.'});
    }
};

export {testController};