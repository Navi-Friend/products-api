export interface ErrorDetail {
	field?: string;
	message: string;
}

export class AppError extends Error {
	public readonly status: string;
	public readonly code: number;
	public readonly details: ErrorDetail[];

	constructor(
		code: number,
		status: string,
		message: string,
		details: ErrorDetail[] = [],
	) {
		super(message);
		this.status = status;
		this.code = code;
		this.details = details;
	}

	toJSON(): {
		error: {
			status: string;
			code: number;
			message: string;
			details: ErrorDetail[];
		};
	} {
		return {
			error: {
				status: this.status,
				code: this.code,
				message: this.message,
				details: this.details,
			},
		};
	}
}
