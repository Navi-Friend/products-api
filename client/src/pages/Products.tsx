import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/products/middlewares";
import { IProduct } from "../types/product.interface";
import { ErrNotification } from "../components/ui/ErrNotification";
import { toast } from "react-toastify";
import { ProductCard } from "../components/products/ProductCard";
import { selectFilteredAndSortedProducts } from "../store/products/selectors";
import { ProductSort } from "../components/products/ProductSort";
import { ProductFilter } from "../components/products/ProductFilter";
import { openModal } from "../store/ui/slice";
import { Modal } from "../components/modal/Modal";
import { ProductForm } from "../components/modal/ProductForm";

export function Products() {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectFilteredAndSortedProducts);
    const status = useSelector((state: RootState) => state.products.status);
    const error = useSelector((state: RootState) => state.products.error);
    const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
        if (status === "failed" && error) {
            toast.error(<ErrNotification error={error} />, {
                toastId: "products-error",
            });
        }
    }, [status, error, dispatch]);

    const handleEditClick = (product: IProduct) => {
        dispatch(openModal({ modalType: "edit", product }));
    };

    return (
        <div className="flex flex-col max-w-4/5 py-20 mx-auto gap-10">
            <button
                onClick={() => dispatch(openModal({ modalType: "add" }))}
                className="bg-gray-700 text-white px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform">
                Add Product
            </button>
            <div className="flex gap-5">
                <nav className="flex flex-col gap-4">
                    <ProductFilter />
                    <ProductSort />
                </nav>
                {status === "loading" && <p>Loading...</p>}
                {status === "succeeded" && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length ? (
                            products.map((product: IProduct) => (
                                <ProductCard
                                    {...product}
                                    key={product._id}
                                    onEdit={() => handleEditClick(product)}
                                />
                            ))
                        ) : (
                            <div
                                style={{ gridColumn: "1/-1" }}
                                className="w-full text-center text-4xl font-medium">
                                Подходящих товаров не найдено
                            </div>
                        )}
                    </ul>
                )}
                {isModalOpen && (
                    <Modal>
                        <ProductForm />
                    </Modal>
                )}
            </div>
        </div>
    );
}
