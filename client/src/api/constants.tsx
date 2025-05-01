import { z } from "zod";
import { ProductCategory } from "../types/product.interface";

export const SingleProductSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    quantity: z.number(),
    category: z.nativeEnum(ProductCategory),
    __v: z.number(),
});

export const ProductSchema = z.array(SingleProductSchema);

export const ServerApiErrorSchema = z.object({
    error: z.object({
        status: z.string(),
        code: z.number(),
        message: z.string(),
        details: z
            .array(
                z.object({
                    field: z.string(),
                    message: z.string(),
                })
            )
            .optional(),
    }),
});

export const ProductStatisticsShema = z.object({
    totalProducts: z.number(),
    averagePrice: z.number(),
    productsByCategory: z.array(
        z.object({ count: z.number(), category: z.nativeEnum(ProductCategory) })
    ),
});
