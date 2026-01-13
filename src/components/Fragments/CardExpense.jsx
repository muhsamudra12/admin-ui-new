import React from "react";
import Icon from "../Elements/Icon";

function CardExpense({ data }) {
  const getIcon = (category) => {
    const iconMap = {
      housing: <Icon.House />,
      food: <Icon.Food />,
      transportation: <Icon.Transport />,
      entertainment: <Icon.Movie />,
      shopping: <Icon.Shopping />,
      others: <Icon.Other />,
    };
    return iconMap[category.toLowerCase()] || <Icon.Other />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-6 border border-gray-100">
      {/* Bagian Header Kartu*/}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="p-3 bg-gray-100 rounded-lg text-gray-500">
            {getIcon(data.category)}
          </div>
          <div>
            <h3 className="font-bold text-gray-400 text-sm capitalize">
              {data.category}
            </h3>
            <p className="text-xl font-extrabold text-gray-800">
              ${data.amount}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 font-bold">
            <span className="text-gray-500 text-sm">{data.percentage}%</span>
            <span
              className={
                data.trend === "up" ? "text-red-500" : "text-green-500"
              }
            >
              {data.trend === "up" ? (
                <Icon.ArrowUp size={16} />
              ) : (
                <Icon.ArrowDown size={16} />
              )}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1 italic font-medium leading-tight">
            Compare to the last month
          </p>
        </div>
      </div>

      {/* Bagian List Detail */}
      <div className="flex flex-col">
        {data.detail.map((item, idx) => (
          <div
            key={idx}
            className="py-3 border-t border-gray-100 first:border-0"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-700 text-xs">{item.item}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-700 text-xs">
                  ${item.amount}
                </p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-medium text-right mt-1">
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardExpense;
