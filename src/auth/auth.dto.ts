/** import class transformer module methods */
import { Expose } from "class-transformer";
/** import class validator module methods */
import { IsDefined, Matches } from "class-validator";

/**
 * RegisterDTO - A Data Transfer Object (DTO) for handling user registration input.
 *
 * This class uses decorators from 'class-transformer' and 'class-validator' to enforce validation and control
 * which properties are exposed when transforming class instances into plain objects.
 *
 * Properties:
 * - @IsDefined() - Ensures that the property is defined and not null/undefined.
 * - @Expose() - Marks the property to be included when transforming class instances to plain objects (e.g., when serializing).
 * - @Matches() - Validates the property using a regular expression pattern.
 *
 * Fields:
 * - username: The username must be defined and match the pattern, allowing letters, numbers, underscores, and dots,
 *   with a length between 5 and 20 characters.
 *   - Validation: @Matches(RegExp(/[A-Za-z0-9\_\.]{5,20}/)).
 *
 * - password: A defined password field. No specific validation rules are applied here, but it must be present.
 *
 * - fullName: The full name must be defined and match the pattern, allowing alphanumeric characters and spaces,
 *   with a length between 5 and 35 characters.
 *   - Validation: @Matches(RegExp(/[\w\s]{5,35}/)).
 */
export class RegisterDTO {
	@IsDefined()
	@Expose()
	@Matches(RegExp(/[A-Za-z0-9\_\.]{5,20}/)) // Username pattern (5-20 characters, letters, numbers, underscores, and dots)
	username: string;

	@IsDefined()
	@Expose() // Password field is required, but no specific validation is applied here
	password: string;

	@IsDefined()
	@Expose()
	@Matches(RegExp(/[\w\s]{5,35}/)) // Full name pattern (5-35 characters, alphanumeric and spaces)
	fullName: string;
}
