interface StatsCardsProps {
    total: number;
    avgPrice: number;
    categoriesCount: number;
}

export function StatsCards({
    total,
    avgPrice,
    categoriesCount,
}: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-gray-500">Всего товаров</h4>
                <p className="text-2xl font-bold">{total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-gray-500">Средняя цена</h4>
                <p className="text-2xl font-bold">
                    {avgPrice.toFixed(2) + " $"}
                </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-gray-500">Категорий</h4>
                <p className="text-2xl font-bold">{categoriesCount}</p>
            </div>
        </div>
    );
}
