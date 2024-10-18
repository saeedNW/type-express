/** import mongoose schema and model methods */
import { Schema, model } from "mongoose";
/** import user's custom interface */
import { IUser } from "../types/user.types";

/**
 * define user schema based on user interface
 */
const UserSchema = new Schema<IUser>({
	fullName: {
		type: String,
		required: true,
		trim: true,
	},
	username: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	accessToken: {
		type: String,
	},
	email: {
		type: String,
	},
	mobile: {
		type: String,
	},
});

export const UserModel = model<IUser>("user", UserSchema);
