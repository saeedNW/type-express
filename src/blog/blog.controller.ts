/** import class transformer module methods */
import { plainToClass } from "class-transformer";
/** import express types */
import { NextFunction, Request, Response } from "express";
/** import router decorators */
import { Controller, Delete, Post, Get } from "../decorators/router.decorators";
/** import public types */
import { FindDoc } from "../types/public.types";
/** import blog dto */
import { BlogIdDto, CreateBlogDto } from "./blog.dto";
/** import blog types */
import { IBlog } from "./blog.type";
/** import blog service */
import { BlogService } from "./blog.service";
/** create new instance from blog service */
const blogService: BlogService = new BlogService();

@Controller("/blog")
export class BlogController {
	@Post()
	async createBlog(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>> | void> {
		try {
			const blogDto: CreateBlogDto = plainToClass(CreateBlogDto, req.body);

			const blog: IBlog = await blogService.create(blogDto);

			return res.status(201).json({
				status: 201,
				success: true,
				message: "created",
				data: { blog },
			});
		} catch (error) {
			next(error);
		}
	}

	@Get()
	async GetAllBlogs(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>> | void> {
		try {
			const blogs: IBlog[] = await blogService.fetchAll();

			return res.status(200).json({
				status: 200,
				success: true,
				message: "successful",
				data: {
					blogs,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * An asynchronous method to fetch a blog post by its ID.
	 *
	 * @Get("/find/:id") - This decorator registers the method as a route handler for GET requests at the path "/find/:id".
	 *                     The ':id' is a route parameter that is passed in the URL.
	 *           		   The full route is determined by combining this with the controller's base path,
	 *           		   which might look like "/controllerBasePath/find/:id".
	 *
	 * Parameters:
	 * - @param {Request} req - The incoming request object, which contains the blog ID in 'req.params'.
	 * - @param {Response} res - The response object used to send the result back to the client.
	 * - @param {NextFunction} next - The next middleware function, used to handle errors if any occur.
	 *
	 * @returns {Promise<Response | void>} - Returns a response with a 200 status and JSON payload, or passes an error to the next middleware.
	 */
	@Get("/find/:id")
	async GetBlogByID(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>> | void> {
		try {
			const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params);

			const blog: FindDoc<IBlog> = await blogService.fetchByID(blogDto);

			return res.status(200).json({
				status: 200,
				success: true,
				message: "successful",
				data: {
					blog,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * An asynchronous method to delete a blog post by its ID.
	 *
	 * @Delete("/delete/:id") - This decorator registers the method as a route handler for DELETE requests at the path "/delete/:id".
	 *                          The ':id' is a route parameter that is passed in the URL.
	 *           		   		The full route is determined by combining this with the controller's base path,
	 *           		   		which might look like "/controllerBasePath/delete/:id".
	 *
	 * Parameters:
	 * - @param {Request} req - The incoming request object, which contains the blog ID in 'req.params'.
	 * - @param {Response} res - The response object used to send the result back to the client.
	 * - @param {NextFunction} next - The next middleware function, used to handle errors if any occur.
	 *
	 * @returns {Promise<Response<any> | void>} - The method returns a response containing the status, success flag, and message,
	 *                                           or passes any errors to the next middleware.
	 */
	@Delete("/delete/:id")
	async RemoveBlogByID(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>> | void> {
		try {
			const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params);

			const message: string = await blogService.removeByID(blogDto);

			return res.status(200).json({
				status: 200,
				success: true,
				message,
			});
		} catch (error) {
			next(error);
		}
	}
}
