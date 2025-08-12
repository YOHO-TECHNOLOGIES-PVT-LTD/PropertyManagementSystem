import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  subText: string;
  percentage: number;
  icon: React.ReactNode;
  iconBg?: string;
  iconTextColor?: string;
}

const Card1: React.FC<CardProps> = ({
  title,
  value,
  subText,
  percentage,
  icon,
  iconBg = "bg-gray-400",
  iconTextColor = "text-white",
}) => {
  const percentageColor =
    percentage >= 0 ? "bg-green-500" : "bg-red-500";

  // Format large numbers with commas and currency
  const formatValue =
    typeof value === "number"
      ? value.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })
      : value;

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full min-w-[220px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-full ${iconBg} ${iconTextColor}`}
        >
          {icon}
        </div>
        <h3 className="text-gray-700 font-medium">{title}</h3>
      </div>

      {/* Main Value */}
      <div className="text-2xl font-bold text-black mt-3">
        {typeof value === "number" && title.toLowerCase().includes("revenue")
          ? `₹${formatValue}`
          : formatValue}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-500">{subText}</span>
        <span
          className={`${percentageColor} text-white text-xs px-2 py-1 rounded-lg`}
        >
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
        </span>
      </div>
    </div>
  );
};

export default Card1;
