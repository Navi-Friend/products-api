import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
export const config = {
	level:
		(process.env.NODE_ENV ?? 'development' === 'development')
			? 'debug'
			: 'warn',
	dir: process.env.LOG_DIR ?? path.join(__dirname, '../../../logs'),
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		debug: 'white',
	},
};
