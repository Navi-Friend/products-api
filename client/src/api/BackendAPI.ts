import axios from "axios";
import {
    IProduct,
    ProductFormData,
    ProductStatistics,
} from "../types/product.interface";
import { ProductSchema, ProductStatisticsShema, SingleProductSchema } from "./constants";

export class BackendAPI {
    private static BASE_URL = "http://localhost:8000/api";

    static async getProducts(): Promise<IProduct[]> {
        const response = await axios.get(`${this.BASE_URL}/products`);
        return ProductSchema.parse(response.data);
    }

    static async createProduct(product: ProductFormData): Promise<IProduct> {
        const response = await axios.post(`${this.BASE_URL}/products`, product);
        return SingleProductSchema.parse(response.data);
    }

    static async updateProduct(
        id: string,
        product: ProductFormData
    ): Promise<IProduct> {
        const response = await axios.put(
            `${this.BASE_URL}/products/${id}`,
            product
        );
        return SingleProductSchema.parse(response.data);
    }

    static async getStatistics(): Promise<ProductStatistics | null> {
        const response = await axios.get(`${this.BASE_URL}/statistics`);
        return ProductStatisticsShema.parse(response.data);
    }
}
