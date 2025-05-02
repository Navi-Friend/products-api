import { createSlice } from "@reduxjs/toolkit";
import { IProduct, ProductCategory } from "../../types/product.interface";
import { fetchProducts, createProduct, updateProduct } from "./middlewares";
import { ApiError } from "../../types/error.interface";

export interface ProductState {
  items: IProduct[];
  sortBy: {
    field: keyof Pick<IProduct, "price" | "quantity">;
    order: "asc" | "desc";
  };
  categoryFilters: ProductCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ApiError | null;
}

const initialState: ProductState = {
  items: [],
  sortBy: { field: "price", order: "asc" },
  categoryFilters: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    setCategoryFilter(state, action) {
      if (state.categoryFilters.includes(action.payload)) {
        const filterIndex = state.categoryFilters.indexOf(action.payload);
        state.categoryFilters.splice(filterIndex, 1);
      } else {
        state.categoryFilters.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? { message: "Unknown error" };
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setSortBy, setCategoryFilter } = productSlice.actions;

export default productSlice.reducer;
