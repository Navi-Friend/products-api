import { StatsCards } from "../components/statistics/StatCards";
import { CategoryDistribution } from "../components/statistics/CategoryDistribution";
import { BackendAPI } from "../api/BackendAPI";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ErrNotification } from "../components/ui/ErrNotification";
import { ApiError } from "../types/error.interface";

export function Statistics() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["statistics"],
        queryFn: () => BackendAPI.getStatistics(),
        retry: 1,
    });

    if (isLoading)
        return (
            <div className="font-medium w-full text-3xl text-center pt-28">
                Загрузка...
            </div>
        );
    if (isError && !toast.isActive("stat-error")) {
        console.log(error, typeof error);
        const apiError = error as ApiError;
        toast.error(<ErrNotification error={apiError} />, {
            toastId: "stat-error",
        });
    }

    if (!data)
        return (
            <div className="font-medium w-full text-3xl text-center pt-28">
                Данных еще нет :(
            </div>
        );

    return (
        <section className="space-y-6 py-20">
            <StatsCards
                total={data.totalProducts}
                avgPrice={data.averagePrice}
                categoriesCount={data.productsByCategory.length}
            />
            <CategoryDistribution data={data.productsByCategory} />
        </section>
    );
}
