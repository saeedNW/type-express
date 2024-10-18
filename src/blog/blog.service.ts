/** import class validator module methods */
import { validateSync } from "class-validator";
/** import blog model */
import { BlogModel } from "../models/blog.model";
/** import utilities */
import { errorHandler } from "../modules/utils";
/** import public types */
import { FindDoc } from "../types/public.types";
/** import blog dto */
import { BlogIdDto, CreateBlogDto } from "./blog.dto";
/** import blog types */
import { IBlog } from "./blog.type";

export class BlogService {
	async create(blogDto: CreateBlogDto): Promise<IBlog> {
		const errors = validateSync(blogDto);
		const checkedErrors = errorHandler(errors);
		if (checkedErrors.length > 0) {
			throw { status: 400, errors: checkedErrors, message: "validation Error" };
		}

		const blog: IBlog = await BlogModel.create(blogDto);

		return blog;
	}

	async fetchAll(): Promise<IBlog[]> {
		const blogs: IBlog[] = await BlogModel.find({});

		return blogs;
	}

	async fetchByID(blogId: BlogIdDto): Promise<FindDoc<IBlog>> {
		const blog: FindDoc<IBlog> = await BlogModel.findById(blogId.id);
		if (!blog) {
			throw { status: 404, message: "notFound Blog" };
		}

		return blog;
	}

	async removeByID(blogId: BlogIdDto): Promise<string> {
		const blog: FindDoc<IBlog> = await this.fetchByID(blogId);
		if (!blog) {
			return "Blog was not found";
		}

		const deleteResult: any = await BlogModel.deleteOne({ _id: blogId.id });
		if (deleteResult.deletedCount > 0) {
			return "deleted blog successful";
		}

		return "error: cannot remove blog";
	}
}
