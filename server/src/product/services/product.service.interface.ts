import { StatResponseDTO } from '../dto/stat.response.dto';
import { IProduct } from '../models/product.model';

export interface IProductService {
	createProduct(data: IProduct): Promise<IProduct>;

	getProductById(id: string): Promise<IProduct | null>;

	getAllProducts(): Promise<IProduct[]>;
	updateProduct(
		id: string,
		data: Partial<IProduct>,
	): Promise<IProduct | null>;

	deleteProduct(id: string): Promise<IProduct | null>;
	getStatistics(): Promise<StatResponseDTO>;
}
