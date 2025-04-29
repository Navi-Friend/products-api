import { Response, Router } from 'express';
import { IBaseController } from './base.controller.interface';
import { ILoggerService } from '../../logger/logger.service.interface';
import { ExpressReturnType, IControllerRoute } from '../route.interface';

export abstract class BaseController implements IBaseController {
	private readonly _router: Router;
	protected logger: ILoggerService;

	constructor(logger: ILoggerService) {
		this._router = Router();
		this.logger = logger;
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created<T>(res: Response, message: T): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.info(`[${route.method}] ${route.path}`, this);
			const middlewares = route.middlewares?.map((m) => {
				this.logger.info(`middleware ${route.path} connected`, this);
				return m.execute.bind(m);
			});
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
