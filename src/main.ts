/** import express module */
import express from "express";
/** import needed express types */
import { Application, Request, Response, NextFunction } from "express";
/** import http module */
import http, { Server } from "http";
/** import custom response type */
import { TResponseMethod } from "./types/public.types";
/** import main router */
import mainRouter from "./routes/index.router";
/** import application custom modules file */
import "./app.module";
/** import database connection module */
import "./modules/db.connection";

/** create application instance */
const app: Application = express();
/** create server instance */
const server: Server = http.createServer(app);
/** define application port number */
const PORT: number = 3000;

/** initialize express json body parser */
app.use(express.json());
/** initialize express urlencoded body parser */
app.use(express.urlencoded({ extended: true }));

/** initialize application main router */
app.use(mainRouter);
/** initialize 404 handler */
app.use((req: Request, res: Response, next: NextFunction): any => {
	/** define 404 response */
	const response: TResponseMethod = {
		status: 404,
		success: false,
		message: "The requested route was not found",
	};

	/** return a response to clint */
	return res.status(404).json(response);
});
/** initialize error handler */
app.use((error: any, req: Request, res: Response, next: NextFunction):any => {
	/** define default value for error status */
	const status: number = +error?.status || 500;
	/** define default value for error message */
	const message: string = error?.message || "internalServerError";
	
	/** define error response */
	const response: TResponseMethod = {
		status,
		success: false,
		message,
		errors: error?.errors || [],
	};

	/** return a response to clint */
	return res.status(status).json(response);
});

/** start application */
server.listen(PORT, () => {
	console.log(`Server running on => http://localhost:${PORT}`);
});
