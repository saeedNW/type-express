/** import express router */
import { Router } from "express";
/** create main router */
const mainRouter: Router = Router();
/** import router decorator */
import decoratorRouter from "../decorators/router.decorators";

/** initialize router decorator */
mainRouter.use(decoratorRouter);

/** export the main router */
export default mainRouter;
