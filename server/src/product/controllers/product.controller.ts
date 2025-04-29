import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/controller/base.controller';
import { TYPES } from '../../IoC/types';
import { IProductService } from '../services/product.service.interface';
import { ILoggerService } from '../../logger/logger.service.interface';
import { ValidateDTOMiddleware } from '../../common/middleware/validate-dto.middleware';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ValidateIdMiddleware } from '../../common/middleware/validate-id.middleware';

@injectable()
export class ProductController extends BaseController {
	constructor(
		@inject(TYPES.Logger) protected readonly logger: ILoggerService,
		@inject(TYPES.ProductService)
		private readonly productService: IProductService,
	) {
		super(logger);
		this.bindRoutes([
			{
				func: this.getStatistics,
				method: 'get',
				path: '/statistics',
			},
			{
				func: this.createProduct,
				method: 'post',
				path: '/products',
				middlewares: [new ValidateDTOMiddleware(CreateProductDTO)],
			},
			{ func: this.getProducts, method: 'get', path: '/products' },
			{
				func: this.getProduct,
				method: 'get',
				path: '/products/:id',
				middlewares: [new ValidateIdMiddleware()],
			},
			{
				func: this.updateProduct,
				method: 'put',
				path: '/products/:id',
				middlewares: [
					new ValidateDTOMiddleware(CreateProductDTO),
					new ValidateIdMiddleware(),
				],
			},
			{
				func: this.deleteProduct,
				method: 'delete',
				path: '/products/:id',
				middlewares: [new ValidateIdMiddleware()],
			},
		]);
	}

	async getStatistics(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const product = await this.productService.getStatistics();
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	}

	async createProduct(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const product = await this.productService.createProduct(req.body);
			res.status(201).json(product);
		} catch (error) {
			next(error);
		}
	}

	async updateProduct(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const product = await this.productService.updateProduct(
				req.params.id,
				req.body,
			);
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	}

	async getProduct(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const product = await this.productService.getProductById(
				req.params.id,
			);
			res.status(200).json(product ?? {});
		} catch (error) {
			next(error);
		}
	}

	async getProducts(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const products = await this.productService.getAllProducts();
			res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	}

	async deleteProduct(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const product = await this.productService.deleteProduct(
				req.params.id,
			);
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	}
}
