import { ClassConstructor } from 'class-transformer';
import { IMiddleware } from './middleware.interface';
import { NextFunction, Response, Request } from 'express';
import { AppError, ErrorDetail } from '../../exceptions/errors/app-error';
import { ERROR_STATUSES } from '../../exceptions/errors/errorStatuses';
import { Types } from 'mongoose';

export class ValidateIdMiddleware implements IMiddleware {
	async execute(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (!Types.ObjectId.isValid(req.params.id)) {
			const details: ErrorDetail[] = [
				{
					field: 'id',
					message: 'Id cannot be converted to ObjectId',
				},
			];
			throw new AppError(
				400,
				ERROR_STATUSES.VALIDATION_ERROR,
				'Invalid ObjectId',
				details,
			);
		}
		next();
	}
}
