export enum ProductCategory {
  Electronics = "electronics",
  Clothing = "clothing",
  Products = "products",
}

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: ProductCategory;
  __v: number;
}

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: ProductCategory;
}

export interface ProductCategoryStat {
  count: number;
  category: ProductCategory;
}

export interface ProductStatistics {
  totalProducts: number;
  averagePrice: number;
  productsByCategory: ProductCategoryStat[];
}
