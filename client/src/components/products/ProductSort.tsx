import { useDispatch } from "react-redux";
import { IProduct } from "../../types/product.interface";
import { AppDispatch } from "../../store/store";
import { ProductState, setSortBy } from "../../store/products/slice";
import { SortDropdown } from "../ui/SortDropdown";

const sortOptions: { option: string; order: string }[] = [
    { option: "Цена", order: "по возростанию" },
    { option: "Цена", order: "по убыванию" },
    { option: "Количество", order: "по возростанию" },
    { option: "Количество", order: "по убыванию" },
];

function matchUIOptions(data: {
    option: string;
    order: string;
}): ProductState["sortBy"] {
    const obj: ProductState["sortBy"] = {};
    if (data.option === "Количество") {
        obj.field = "quantity";
    }
    if (data.option === "Цена") {
        obj.field = "price";
    }
    if (data.order === "по возростанию") {
        obj.order = "asc";
    }
    if (data.order === "по убыванию") {
        obj.order = "desc";
    }
    return obj;
}

export function ProductSort() {
    const dispatch = useDispatch<AppDispatch>();

    const handleSort = (
        option: keyof Pick<IProduct, "price" | "quantity">,
        order = "asc"
    ) => {
        console.log(order);
        dispatch(setSortBy(matchUIOptions({ option, order })));
    };

    return (
        <SortDropdown
            options={sortOptions}
            onSelect={({ option, order }) => handleSort(option, order)}
            label="Сортировать"
        />
    );
}
