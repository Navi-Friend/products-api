import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectSortedProducts = createSelector(
  [
    (state: RootState) => state.products.sortBy,
    (state: RootState) => state.products.items,
  ],
  (sortBy, items) => {
    return [...items].sort((a, b) => {
      if (sortBy.order === "asc") {
        return a[sortBy.field] - b[sortBy.field];
      }
      if (sortBy.order === "desc") {
        return b[sortBy.field] - a[sortBy.field];
      }
      return 0;
    });
  }
);

export const selectFilteredProducts = createSelector(
  (state: RootState) => state.products.items,
  (state: RootState) => state.products.categoryFilters,
  (items, categoryFilters) => {
    if (!categoryFilters.length) return items;
    return items.filter((item) => categoryFilters.includes(item.category));
  }
);

export const selectFilteredAndSortedProducts = createSelector(
  [
    (state: RootState) => state.products.items,
    (state: RootState) => state.products.sortBy,
    (state: RootState) => state.products.categoryFilters,
  ],
  (items, sortBy, categoryFilters) => {
    const filteredItems = categoryFilters.length
      ? items.filter((item) => categoryFilters.includes(item.category))
      : items;
    return [...filteredItems].sort((a, b) => {
      if (sortBy.order === "asc") {
        return a[sortBy.field] - b[sortBy.field];
      }
      if (sortBy.order === "desc") {
        return b[sortBy.field] - a[sortBy.field];
      }
      return 0;
    });
  }
);
