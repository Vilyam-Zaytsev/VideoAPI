import {Request, Response} from "express";

type ParamType = {
    id: string
};

type BodyType = {
    id: number,
    title: string
};

type QueryType = {
    search?: string
};

type OutputType = void;

const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {

};

export {
    ParamType,
    BodyType,
    QueryType,
    OutputType,
    someController
};