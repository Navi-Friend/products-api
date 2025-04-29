import { Container } from 'inversify';
import { ILoggerService } from '../logger/logger.service.interface';
import { TYPES } from './types';
import { LoggerService } from '../logger/logger.service';
import { App } from '../app';
import IExceptionFilter from '../exceptions/exception.filter.interface';
import { ExceptionFilter } from '../exceptions/exception.filter';
import { MongooseService } from '../database/mongoose.service';
import { IProductService } from '../product/services/product.service.interface';
import { ProductService } from '../product/services/product.service';
import { ProductController } from '../product/controllers/product.controller';

const appContainer = new Container();

appContainer
	.bind<ILoggerService>(TYPES.Logger)
	.to(LoggerService)
	.inSingletonScope();
appContainer.bind<App>(TYPES.App).to(App).inSingletonScope();
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<MongooseService>(TYPES.MongooseService).to(MongooseService);
appContainer.bind<IProductService>(TYPES.ProductService).to(ProductService);
appContainer
	.bind<ProductController>(TYPES.ProductController)
	.to(ProductController);

export default appContainer;
