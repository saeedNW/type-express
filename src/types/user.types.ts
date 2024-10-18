/** import mongoose Document interface */
import { Document } from "mongoose";

/**
 * Define an Interface that has been extended from
 * mongoose's Document interface that will be used
 * in User related component
 */
export interface IUser extends Document {
	fullName: string;
	username: string;
	password: string;
	accessToken?: string;
	email?: string;
	mobile?: string;
	avatar?: string;
}
