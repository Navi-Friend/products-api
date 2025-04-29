import { injectable } from 'inversify';
import { IProductService } from './product.service.interface';
import { StatResponseDTO } from '../dto/stat.response.dto';
import { IProduct, ProductModel } from '../models/product.model';

@injectable()
export class ProductService implements IProductService {
	async createProduct(data: IProduct): Promise<IProduct> {
		return await ProductModel.create(data);
	}

	async getProductById(id: string): Promise<IProduct | null> {
		return await ProductModel.findById(id).lean();
	}

	async getAllProducts(): Promise<IProduct[]> {
		return await ProductModel.find().lean();
	}

	async updateProduct(
		id: string,
		data: Partial<IProduct>,
	): Promise<IProduct | null> {
		return await ProductModel.findByIdAndUpdate(id, data, {
			new: true,
		}).lean();
	}

	async deleteProduct(id: string): Promise<IProduct | null> {
		return await ProductModel.findByIdAndDelete(id).lean();
	}

	async getStatistics(): Promise<StatResponseDTO> {
		const totalProducts = await ProductModel.countDocuments();
		const averagePrice = await ProductModel.aggregate([
			{ $group: { _id: null, avgPrice: { $avg: '$price' } } },
		]);
		const productsByCategory = await ProductModel.aggregate([
			{ $group: { _id: '$category', count: { $sum: 1 } } },
			{ $project: { category: '$_id', count: 1, _id: 0 } },
		]);

		return {
			totalProducts,
			averagePrice: averagePrice[0]?.avgPrice || 0,
			productsByCategory,
		};
	}
}
