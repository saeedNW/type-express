/** import mongoose */
import mongoose from "mongoose";

/** create database connection */
mongoose
	.connect("mongodb://127.0.0.1:27017/type-express")
	.then(() => console.log("connected To DB!"))
	.catch((err: any) => console.log(err.message));
