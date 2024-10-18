/** import express router */
import { Router } from "express";
/** create an instance from router */
const decoratorRouter: Router = Router();

/**
 * A decorator factory that registers a class method as a GET route.
 *
 * @param path - (Optional) The path for the route. If not provided, the method name will be used.
 *               - If 'path' starts with a "/", it will be used as is.
 *               - If 'path' is provided but does not start with a "/", a leading "/" is prepended.
 *               - If 'path' is not provided, the method name will be used as the route path (prefixed by "/").
 * 
 * @returns A decorator function that registers the method with the route.
 */
export function Get(path?: string | undefined) {
	/**
	 * A decorator function that maps a class method to a GET route.
	 *
	 * @param target - The target object (the class the method belongs to).
	 * @param propertyKey - The name of the method being decorated.
	 * @param descriptor - The method descriptor.
	 *
	 * The resulting route is registered with 'decoratorRouter.get()' and associates it with
	 * the method using the 'target[propertyKey]' syntax.
	 */
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const route = path
			? path[0] === "/"
				? path
				: "/" + path
			: "/" + propertyKey;

		decoratorRouter.get(`${route}`, target[propertyKey]);
	};
}

/**
 * A decorator factory that registers a class method as a POST route.
 */
export function Post(path?: string | undefined) {
	/**
	 * A decorator function that maps a class method to a POST route.
	 */
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const route = path
			? path[0] == "/"
				? path
				: "/" + path
			: "/" + propertyKey;

		decoratorRouter.post(`${route}`, target[propertyKey]);
	};
}

/**
 * A decorator factory that registers a class method as a PUT route.
 */
export function Put(path?: string | undefined) {
	/**
	 * A decorator function that maps a class method to a PUT route.
	 */
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const route = path
			? path[0] == "/"
				? path
				: "/" + path
			: "/" + propertyKey;

		decoratorRouter.put(`${route}`, target[propertyKey]);
	};
}

/**
 * A decorator factory that registers a class method as a PATCH route.
 */
export function Patch(path?: string | undefined) {
	/**
	 * A decorator function that maps a class method to a PATCH route.
	 */
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const route = path
			? path[0] == "/"
				? path
				: "/" + path
			: "/" + propertyKey;
		
		decoratorRouter.patch(`${route}`, target[propertyKey]);
	};
}

/**
 * A decorator factory that registers a class method as a DELETE route.
 */
export function Delete(path?: string | undefined) {
	/**
	 * A decorator function that maps a class method to a DELETE route.
	 */
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const route = path
			? path[0] == "/"
				? path
				: "/" + path
			: "/" + propertyKey;
		
		decoratorRouter.delete(`${route}`, target[propertyKey]);
	};
}

/**
 * A decorator factory that registers a class as a controller with a base route.
 *
 * @param controllerPath - (Optional) The base path for the controller. If not provided, defaults to "/".
 *                        - If 'controllerPath' starts with a "/", it will be used as is.
 *                        - If 'controllerPath' does not start with a "/", a leading "/" is prepended.
 *                        - If 'controllerPath' is not provided, the base path will be "/".
 * 
 * @returns A decorator function that registers the class as a controller with the specified or default base path.
 */
export function Controller(controllerPath?: string | undefined) {
	/**
	 * A decorator function that registers a class as a controller with a base route.
	 *
	 * @param target - The target class that will be registered as a controller.
	 *
	 * The function:
	 * - Checks if 'controllerPath' starts with a "/" and prepends one if it doesn't.
	 * - If 'controllerPath' is not provided, it defaults to "/".
	 * - Registers the class with 'decoratorRouter.use()', associating it with the base path.
	 */
	return function (target: any) {
		// Ensure the controller path starts with a "/" if provided
		if (controllerPath?.[0] !== "/") controllerPath = "/" + controllerPath;

		// Use provided path or default to "/"
		const path = controllerPath ?? "/";

		// Register the controller with the calculated base path
		decoratorRouter.use(path, decoratorRouter);
	};
}


export default decoratorRouter;
