import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator';
import { ProductCategory } from '../models/product.model';
import { Transform } from 'class-transformer';

export class CreateProductDTO {
	@IsString({ message: 'Product name must be a string' })
	name!: string;

	@IsString({ message: 'Product name must be a string' })
	@IsOptional()
	description!: string;

	@IsNumber()
	@IsPositive({ message: 'Price name must be a postitive number' })
	price!: number;

	@IsNumber()
	@IsPositive({ message: 'Quantity name must be a postitive number' })
	quantity!: number;

	@Transform(({ value }) => ('' + value).toLowerCase())
	@IsEnum(ProductCategory)
	category!: ProductCategory;
}
