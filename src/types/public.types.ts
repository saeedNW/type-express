import { ObjectId } from "mongoose";
import { IUser } from "./user.types";

/**
 * define a new type to be used in order to create a new response
 * for client requests
 */
export type TResponseMethod = {
	status: number;
	success: boolean;
	message: string;
	data?: object | undefined;
	errors?: object | undefined;
};

/**
 * Define an interface DTO to be used for JST generator payload
 */
export interface JWTGeneratorPayloadDTO {
	id: ObjectId;
	username: IUser["username"];
}

/**
 * define a type to be used for database find requests
 */
export type FindDoc<T> = T | null | undefined;
