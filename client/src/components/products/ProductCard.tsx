import { IProduct } from "../../types/product.interface";

interface ProductCardProps extends IProduct {
    onEdit: () => void;
}

export function ProductCard({
    name,
    category,
    price,
    quantity,
    description,
    onEdit,
}: ProductCardProps) {
    return (
        <div className="p-4 overflow-auto bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-600">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-semibold text-gray-700 pb-4">
                    {name}
                </h1>
                <button
                    onClick={onEdit}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    Edit
                </button>
            </div>
            <h2>Category: {category}</h2>
            <p>Description: {description}</p>
            <h2>Price: {price?.toFixed(2)}$</h2>
            <h3>{quantity > 0 ? `In stock: ${quantity}` : "Out of stock"}</h3>
        </div>
    );
}
