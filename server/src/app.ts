import express, { Express, json } from 'express';
import { Server } from 'http';
import { TYPES } from './IoC/types';
import { ILoggerService } from './logger/logger.service.interface';
import { inject, injectable } from 'inversify';
import IExceptionFilter from './exceptions/exception.filter.interface';
import { MongooseService } from './database/mongoose.service';
import { ProductController } from './product/controllers/product.controller';

@injectable()
export class App {
	app: Express;
	port: number;
	server!: Server;

	constructor(
		@inject(TYPES.Logger) private readonly logger: ILoggerService,
		@inject(TYPES.ExceptionFilter)
		private readonly exceptionFilter: IExceptionFilter,
		@inject(TYPES.MongooseService)
		private readonly mongoService: MongooseService,
		@inject(TYPES.ProductController)
		private readonly productController: ProductController,
	) {
		this.app = express();
		this.port = Number(process.env.BACKEND_PORT) || 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/api', this.productController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		await this.mongoService.connect();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.info(`Server started on ${this.port} port`, this);
	}

	async close(): Promise<void> {
		this.server.close();
		await this.mongoService.disconnect();
	}
}
