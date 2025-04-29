import { ClassConstructor, plainToClass } from 'class-transformer';
import { IMiddleware } from './middleware.interface';
import { validate } from 'class-validator';
import { NextFunction, Response, Request } from 'express';
import { AppError, ErrorDetail } from '../../exceptions/errors/app-error';
import { ERROR_STATUSES } from '../../exceptions/errors/errorStatuses';

export class ValidateDTOMiddleware implements IMiddleware {
	constructor(private readonly classToValidate: ClassConstructor<object>) {}

	async execute(
		{ body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const instance = plainToClass(this.classToValidate, body);

		const errors = await validate(instance);
		if (errors.length) {
			const details: ErrorDetail[] = errors.flatMap((error) =>
				Object.entries(error.constraints || {}).map(([_, message]) => ({
					field: error.property,
					message,
				})),
			);
			throw new AppError(
				400,
				ERROR_STATUSES.VALIDATION_ERROR,
				'Validation failed',
				details,
			);
		}
		next();
	}
}
