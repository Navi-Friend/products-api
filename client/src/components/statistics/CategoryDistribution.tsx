import { ProductCategoryStat } from "../../types/product.interface";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ProductCategoryToUI } from "../../utils/toUI";

interface CategoryDistributionProps {
  data: ProductCategoryStat[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function CategoryDistribution({ data }: CategoryDistributionProps) {
  const chartData = data.map((item) => ({
    name: ProductCategoryToUI(item.category),
    value: item.count,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        Распределение по категориям
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
