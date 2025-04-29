import { ProductCategory } from '../models/product.model';

export interface StatResponseDTO {
	totalProducts: number;
	averagePrice: number;
	productsByCategory: Array<{ category: ProductCategory; count: number }>;
}
