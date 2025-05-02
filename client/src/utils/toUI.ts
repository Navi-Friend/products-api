import { IProduct, ProductCategory } from "../types/product.interface";

export const ProductCategoryToUI = (category: ProductCategory): string => {
  switch (category) {
    case ProductCategory.Clothing:
      return "Одежда";
    case ProductCategory.Electronics:
      return "Электроника";
    case ProductCategory.Products:
      return "Продукты";
    default:
      return "";
  }
};

export const ProductSortFieldToUI = (
  field: keyof Pick<IProduct, "price" | "quantity">
): string => {
  switch (field) {
    case "price":
      return "Цена";
    case "quantity":
      return "В наличии";
    default:
      return "";
  }
};

export const ProductSortOrderToUI = (order: "asc" | "desc"): string => {
  switch (order) {
    case "asc":
      return "по возрастанию";
    case "desc":
      return "по убыванию";
    default:
      return "";
  }
};
