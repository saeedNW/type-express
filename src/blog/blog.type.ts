/** import mongoose Document interface */
import { Document } from "mongoose";

/**
 * Define an Interface that has been extended from
 * mongoose's Document interface that will be used
 * in blog related components
 */ export interface IBlog extends Document {
	title: string;
	text: string;
	image: string;
	author: string;
}
