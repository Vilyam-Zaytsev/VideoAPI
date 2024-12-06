import {app} from "../src/app";
import {agent} from "supertest";

const req = agent(app);

export {req};