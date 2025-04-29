import { ILoggerService, LogLevel } from './logger.service.interface';
import { injectable } from 'inversify';
import winston, { createLogger, Logger } from 'winston';
import { config } from './logger.config';

@injectable()
export class LoggerService implements ILoggerService {
	logger: Logger;
	public readonly level: LogLevel = config.level as LogLevel;
	private readonly levels = config.levels;
	private readonly colors = config.colors;
	constructor() {
		this.logger = this.createWinstonLogger();
		this.info('logger successfully created', this);
	}

	private createWinstonLogger(): Logger {
		winston.addColors(this.colors);

		return createLogger({
			level: this.level,
			levels: this.levels,
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.colorize({ all: true }),
						winston.format.printf(
							(info) =>
								`${info.timestamp} ${info.level}: ${info.message}`,
						),
					),
				}),
			],
		});
	}

	debug(message: string, context: unknown): void {
		this.logger.debug(
			`[${context?.constructor?.name ?? 'Global'}] ${message}`,
		);
	}

	info(message: string, context: unknown): void {
		this.logger.info(
			`[${context?.constructor?.name ?? 'Global'}] ${message}`,
		);
	}

	warn(message: string, context: unknown): void {
		this.logger.warn(
			`[${context?.constructor?.name ?? 'Global'}] ${message}`,
		);
	}

	error(message: string, context: unknown): void {
		this.logger.error(
			`[${context?.constructor?.name ?? 'Global'}] ${message}`,
		);
	}

	log(level: LogLevel, message: string, context: unknown): void {
		this.logger.log(
			level,
			`[${context?.constructor?.name ?? 'Global'}] ${message}`,
		);
	}
}
