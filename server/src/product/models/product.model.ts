// 1. Backend (Node.js + Express + MongoDB):
// - REST API для CRUD операций с товарами.
// - Поля товара:
//   - Название (обязательное, уникальное).
//   - Описание.
//   - Цена (число > 0).
//   - Количество на складе (число ≥ 0).
//   - Категория (выбор из списка: электроника, одежда, продукты).
// - Валидация данных на сервере (например, через Joi или mongoose-валидаторы).
// - Роут для получения статистики:
//   - Общее количество товаров.
//   - Средняя цена товара.
//   - Количество товаров по категориям.

import { Document, Schema, model } from 'mongoose';

export enum ProductCategory {
	Electronics = 'electronics',
	Clothing = 'clothing',
	Products = 'products',
}

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	quantity: number;
	category: ProductCategory;
}

const ProductSchema = new Schema<IProduct>({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: false },
	price: { type: Number, required: true, min: [0, 'Price must be positive'] },
	quantity: {
		type: Number,
		required: true,
		min: [0, 'Quantity must be positive'],
	},
	category: {
		type: String,
		enum: Object.values(ProductCategory),
		required: true,
	},
});

export const ProductModel = model<IProduct>('Product', ProductSchema);
