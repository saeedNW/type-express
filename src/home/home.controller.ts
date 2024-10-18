/** import express types */
import { Request, Response, NextFunction } from "express";
/** import router decorators */
import { Controller, Get } from "../decorators/router.decorators";

/**
 * HomeController is a controller class for handling routes related to "/home".
 * The @Controller("/home") decorator registers this class with a base route of "/home".
 */
@Controller("/home")
export class HomeController {
	/**
	 * The 'getHomeInfo' method handles GET requests and responds with "home".
	 *
	 * @Get() - This decorator registers the method as a GET route handler.
	 *          Since no path is specified, the method name 'getHomeInfo' will be used as part of the route.
	 *          The full route is determined by combining this with the controller's base path,
	 *          which might look like "/controllerBasePath/getHomeInfo".
	 *
	 * Parameters:
	 * - @param {Request} req - The request object from the client.
	 * - @param {Response} res - The response object to send data back to the client.
	 * - @param {NextFunction} next - The next middleware function to handle errors or continue processing.
	 *
	 * @returns {Response | void} - Returns a response with a 200 status and JSON payload, or passes an error to the next middleware.
	 */
	@Get()
	getHomeInfo(
		req: Request,
		res: Response,
		next: NextFunction
	): Response<any, Record<string, any>> | void {
		try {
			return res.status(200).json("data");
		} catch (err) {
			return next(err);
		}
	}
}
