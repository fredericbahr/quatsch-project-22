import express, { Router } from "express";
import { handleCustomAction } from "../controllers/webhook";

const baseRouter: Router = express.Router();

baseRouter.post("/webhook", handleCustomAction);

export default baseRouter;
