import { z } from "zod";
import { BackendAPI } from "../../api/BackendAPI";
import { AxiosError } from "axios";
import { ApiError } from "../../types/error.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductFormData } from "../../types/product.interface";
import {
    ProductSchema,
    ServerApiErrorSchema,
    SingleProductSchema,
} from "../../api/constants";

export const fetchProducts = createAsyncThunk<
    z.infer<typeof ProductSchema>,
    void,
    { rejectValue: ApiError }
>("products/fetch", async (_, { rejectWithValue }) => {
    try {
        const data = await BackendAPI.getProducts();
        return data;
    } catch (error) {
        return rejectWithValue(handleApiErrors(error));
    }
});

export const createProduct = createAsyncThunk<
    z.infer<typeof SingleProductSchema>,
    ProductFormData,
    { rejectValue: ApiError }
>("products/create", async (product, { rejectWithValue }) => {
    try {
        const data = await BackendAPI.createProduct(product);
        return data;
    } catch (error) {
        return rejectWithValue(handleApiErrors(error));
    }
});

export const updateProduct = createAsyncThunk<
    z.infer<typeof SingleProductSchema>,
    { id: string; product: ProductFormData },
    { rejectValue: ApiError }
>("products/update", async ({ id, product }, { rejectWithValue }) => {
    try {
        const data = await BackendAPI.updateProduct(id, product);
        return data;
    } catch (error) {
        return rejectWithValue(handleApiErrors(error));
    }
});

function handleApiErrors(error: unknown): ApiError {
    if (error instanceof AxiosError) {
        const serverError = ServerApiErrorSchema.safeParse(
            error.response?.data
        );
        if (serverError.success) {
            return {
                message: serverError.data.error.message,
                status: serverError.data.error.code,
                details: serverError.data.error.details,
            };
        }
        return {
            message: error.message,
            status: error.code,
        };
    }
    return {
        message:
            error instanceof Error
                ? error.message
                : "An unexpected error occurred",
        status: undefined,
    };
}
