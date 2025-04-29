import { Request, Response, NextFunction } from 'express';
import IExceptionFilter from './exception.filter.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../IoC/types';
import { ILoggerService } from '../logger/logger.service.interface';
import { AppError, ErrorDetail } from './errors/app-error';
import { ERROR_STATUSES } from './errors/errorStatuses';
import mongoose from 'mongoose';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(
		@inject(TYPES.Logger) private readonly logger: ILoggerService,
	) {}

	catch(err: Error, req: Request, res: Response, next: NextFunction): void {
		this.logger.warn(JSON.stringify(err));
		if (err instanceof AppError) {
			this.logger.error(`Error ${err.status} : ${err.message}`, this);
			res.status(err.code).json(err.toJSON());
		}

		if (err.name === 'MongoServerError' && err.code === 11000) {
			const field = Object.keys(err.keyValue)[0];
			const value = err.keyValue[field];

			this.logger.error(`Error ${err.name} ${err.message}`, this);
			res.status(400).json(
				new AppError(
					400,
					ERROR_STATUSES.DUBLICATE_KEY,
					`Duplicate value '${value}' for field '${field}'`,
					[{ field, message: `Value '${value}' already exists` }],
				).toJSON(),
			);
		}

		if (err instanceof mongoose.Error.ValidationError) {
			const details: ErrorDetail[] = Object.values(err.errors).map(
				(e: any) => ({
					field: e.path,
					message: e.message,
				}),
			);

			this.logger.error(`Error ${err.name} ${err.message}`, this);

			res.status(400).json(
				new AppError(
					400,
					ERROR_STATUSES.VALIDATION_ERROR,
					'Validation failed',
					details,
				).toJSON(),
			);
		}

		this.logger.error(`Error ${err.message}`, this);
		res.status(500).json(
			new AppError(
				500,
				ERROR_STATUSES.INTERNAL_SERVER_ERROR,
				'Internal server error',
			),
		);
	}
}
