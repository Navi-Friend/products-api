import { useState } from "react";

interface DropdownOption {
    option: string;
    order: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onSelect: (data: DropdownOption) => void;
    label?: string;
}

export const SortDropdown = ({
    options,
    onSelect,
    label = "Сортировать",
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[0].option);
    const [selectedOrder, setSelectedOrder] = useState(options[0].order);

    const handleSelection = (option: DropdownOption) => {
        onSelect(option);
        setIsOpen(!isOpen);
        setSelectedValue(option.option);
        setSelectedOrder(option.order);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}>
                    {label}: {`${selectedValue} ${selectedOrder}`}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                        {options.map((option) => (
                            <button
                                key={`${option.option}${option.order}`}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                    selectedValue === option.option &&
                                    selectedOrder === option.order
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                                onClick={() => {
                                    handleSelection(option);
                                }}>
                                {`${option.option} ${option.order}`}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
