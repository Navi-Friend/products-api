import { useDispatch } from "react-redux";
import { setCategoryFilter } from "../../store/products/slice";
import { ProductCategory } from "../../types/product.interface";
import { ProductCategoryToUI } from "../../utils/toUI";

export function ProductFilter() {
    const dispatch = useDispatch();

    const handleFilterChange: React.MouseEventHandler<HTMLInputElement> = (e) => {
        dispatch(setCategoryFilter(e.currentTarget.id));
    };

    return (
        <div className="rounded-md border border-gray-300 shadow-sm p-4 bg-white text-sm font-medium text-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Фильтр по категориям</h3>
            <div className="space-y-3">
                {Object.values(ProductCategory).map((category) => (
                    <div 
                        className="flex items-center group py-1 rounded-md transition-colors"
                        key={category}
                    >
                        <input
                            className="w-5 h-5 mr-2 cursor-pointer text-indigo-600 focus:ring-indigo-500 rounded border-gray-300"
                            type="checkbox"
                            name={category}
                            id={category}
                            onClick={handleFilterChange}
                        />
                        <label 
                            htmlFor={category} 
                            className="cursor-pointer text-gray-700 group-hover:text-indigo-600 transition-colors"
                        >
                            {ProductCategoryToUI(category)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}