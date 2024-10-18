/** import express types */
import { Request, Response, NextFunction } from "express";
/** import router decorators */
import { Controller, Post } from "../decorators/router.decorators";
/** import user model */
import { UserModel } from "../models/user.model";
/** import utilities */
import { compareHashString, jwtGenerator } from "../modules/utils";
/** import user interface */
import { IUser } from "../types/user.types";
/** import public types */
import { TResponseMethod } from "../types/public.types";
/** import auth service */
import { AuthService } from "./auth.service";
/** create new instance from auth service */
const authService: AuthService = new AuthService();
/** import auth DTO */
import { RegisterDTO } from "./auth.dto";
/** import class transformer module methods */
import { plainToClass } from "class-transformer";

/**
 * AuthController is a controller class for handling routes related to "/auth".
 * The @Controller("/auth") decorator registers this class with a base route of "/auth".
 */
@Controller("/auth")
export class AuthController {
	/**
	 * The 'register' method handles POST requests and responds with a success message.
	 *
	 * @POST() - This decorator registers the method as a POST route handler.
	 * 			 Since no path is specified, the method name 'register' will be used as part of the route.
	 *           The full route is determined by combining this with the controller's base path,
	 *           which might look like "/controllerBasePath/register".
	 *
	 * Parameters:
	 * - @param {Request} req - The request object from the client.
	 * - @param {Response} res - The response object to send data back to the client.
	 * - @param {NextFunction} next - The next middleware function to handle errors or continue processing.
	 *
	 * @returns {Promise<Response | void>} - Returns a response with a 201 status and JSON payload, or passes an error to the next middleware.
	 */
	@Post()
	async register(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>> | void> {
		try {
			const registerDto: RegisterDTO = plainToClass(RegisterDTO, req.body, {
				excludeExtraneousValues: true,
			});

			const user: IUser = await authService.registerService(registerDto);

			return res.status(201).json({
				status: 201,
				success: true,
				message: "successful",
				data: { user },
			});
		} catch (err) {
			return next(err);
		}
	}

	@Post()
	async login(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>> | void> {
		try {
			const { username, password } = req.body;
			const existUser: IUser | null = await UserModel.findOne({ username });

			if (!existUser) {
				throw {
					status: 401,
					message: "the username or password is incorrect",
				};
			}

			const isTrueUser: boolean = compareHashString(
				password,
				existUser.password
			);

			if (!isTrueUser) {
				throw {
					status: 401,
					message: "the username or password is incorrect",
				};
			}

			// @ts-ignore
			await jwtGenerator({ username, id: existUser._id });

			const user = await UserModel.findById(existUser._id, {
				__v: 0,
				password: 0,
			});

			const response: TResponseMethod = {
				status: 200,
				success: true,
				message: "Your request ended successfully",
				data: { user },
			};

			return res.status(200).json(response);
		} catch (err) {
			return next(err);
		}
	}
}
