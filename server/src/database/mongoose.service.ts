import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { TYPES } from '../IoC/types';
import { ILoggerService } from '../logger/logger.service.interface';

@injectable()
export class MongooseService {
	constructor(
		@inject(TYPES.Logger) private readonly logger: ILoggerService,
	) {}

	async connect(): Promise<void> {
		try {
			if (!process.env.MONGO_URI) {
				this.logger.error('Variable MONGO_URI is not found', this);
				throw new Error();
			} else {
				await mongoose.connect(process.env.MONGO_URI);
			}

			this.logger.info('MongoDB connected', this);
		} catch (error) {
			if (error instanceof Error) {
				this.logger.info('MongoDB connection error', this);
			}
		}
	}

	async disconnect(): Promise<void> {
		try {
			await mongoose.disconnect();
			this.logger.info('MongoDB disconnected', this);
		} catch (error) {
			if (error instanceof Error) {
				this.logger.info('MongoDB disconnection error', this);
			}
		}
	}
}
