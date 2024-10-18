/** import register DTO */
import { RegisterDTO } from "./auth.dto";
/** import user interface */
import { IUser } from "../types/user.types";
/** import user model */
import { UserModel } from "../models/user.model";
/** import utilities */
import { errorHandler, HashString } from "../modules/utils";
/** import class validator module methods */
import { validateSync } from "class-validator";

export class AuthService {
	async registerService(userDto: RegisterDTO): Promise<IUser> {
		const errors = validateSync(userDto);
		const checkedErrors = errorHandler(errors);
		if (checkedErrors.length > 0) {
			throw {
				status: 422,
				success: false,
				message: "validation Error",
				errors: checkedErrors,
			};
		}

		const existUser = await UserModel.findOne({ username: userDto.username });
		if (existUser) {
			throw { status: 400, message: "this username already exist" };
		}

		userDto.password = HashString(userDto.password);
		const user: IUser = await UserModel.create(userDto);
		return user;
	}
}
