import { ErrorRequestHandler } from 'express';

export default interface IExceptionFilter {
	catch: ErrorRequestHandler;
}
