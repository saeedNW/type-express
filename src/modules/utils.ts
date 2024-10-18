/** import bcrypt methods */
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign, Algorithm } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { JWTGeneratorPayloadDTO } from "../types/public.types";

const accessTokenSecret = "125CA691B798F2017BDF41B18279337F";

/**
 * A utility function to hash a given string using bcrypt.
 *
 * @param {string} data - The input string that needs to be hashed.
 *
 * @returns {string} - The hashed version of the input string.
 */
export function HashString(data: string): string {
	// Generate salt with cost factor 10
	const salt: string = genSaltSync(10);
	// Hash the data with the generated salt
	const hashedString: string = hashSync(data, salt);
	// Return the hashed string
	return hashedString;
}

/**
 * A utility function to compare a plain string with its hashed counterpart.
 *
 * @param {string} data - The plain text string to be compared (e.g., a password).
 * @param {string} encrypted - The hashed string to compare against (e.g., a stored hashed password).
 *
 * @returns {boolean} - Returns true if the plain text matches the hash, otherwise returns false.
 */
export function compareHashString(data: string, encrypted: string): boolean {
	return compareSync(data, encrypted); // Compare the plain string with the hashed string
}

export async function jwtGenerator(
	payload: JWTGeneratorPayloadDTO
): Promise<void> {
	const { id } = payload;
	const user = await UserModel.findById(id);
	if (!user) throw { status: 404, message: "notFoundUser" };

	const expiresIn: number = new Date().getTime() + 1000 * 60 * 60 * 24;
	const algorithm: Algorithm = "HS512";

	sign(
		payload,
		accessTokenSecret,
		{ expiresIn, algorithm },
		async (error, token) => {
			if (!error && token) {
				user.accessToken = token;
				await user.save();
			}
		}
	);
}

export function errorHandler(errors: any[]) {
	let errorTexts: string[] = [];
	for (const errorItem of errors) {
		errorTexts = errorTexts.concat(errorItem.constraints);
	}
	return errorTexts;
}