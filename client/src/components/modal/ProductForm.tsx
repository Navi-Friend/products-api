import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { closeModal } from "../../store/ui/slice";
import {
  ProductCategory,
  ProductFormData,
} from "../../types/product.interface";
import { toast } from "react-toastify";
import { ErrNotification } from "../ui/ErrNotification";
import { ApiError } from "../../types/error.interface";
import { createProduct, updateProduct } from "../../store/products/middlewares";

export const ProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentProduct = useSelector(
    (state: RootState) => state.ui.currentProduct
  );
  const modalType = useSelector((state: RootState) => state.ui.modalType);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const productData: ProductFormData = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || undefined,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      category: formData.get("category") as ProductCategory,
    };

    try {
      if (modalType === "add") {
        await dispatch(createProduct(productData)).unwrap();
        toast.success("Product added successfully");
      } else if (modalType === "edit" && currentProduct?._id) {
        await dispatch(
          updateProduct({
            id: currentProduct._id,
            product: productData,
          })
        ).unwrap();
        toast.success("Product updated successfully");
      }
      dispatch(closeModal());
    } catch (error) {
      const apiError = error as ApiError;
      if (!toast.isActive("api-error")) {
        toast.error(<ErrNotification error={apiError} />, {
          toastId: "api-error",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={currentProduct?.name || ""}
          placeholder="Product name"
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={currentProduct?.description || ""}
          placeholder="Product description"
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          required
          min="0"
          step="0.01"
          defaultValue={currentProduct?.price || ""}
          placeholder="Price"
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          required
          min="0"
          defaultValue={currentProduct?.quantity || ""}
          placeholder="Quantity"
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={currentProduct?.category || ""}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Select Category</option>
          {Object.values(ProductCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => dispatch(closeModal())}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {modalType === "add" ? "Add Product" : "Update Product"}
        </button>
      </div>
    </form>
  );
};
