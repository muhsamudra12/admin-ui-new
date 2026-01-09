import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CompositionExample from "../Elements/CompositionExample";
import CircularProgress from "@mui/material/CircularProgress";

function CardGoal(props) {
  const { data } = props;

  // Logika untuk menghitung nilai chart (persentase)
  // Menghindari pembagian dengan nol jika data belum siap
  const chartValue =
    data && data.target_amount && data.target_amount !== 0
      ? (data.present_amount / data.target_amount) * 100
      : 0;

  // Konten utama yang ditampilkan jika data sudah ada
  const chartData = (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex">
          <span className="text-2xl font-bold me-4">
            ${data?.target_amount || 0}
          </span>
          <div className="p-2 bg-gray-05 text-gray-01 rounded-md box-border cursor-pointer hover:bg-gray-200 transition-colors">
            <Icon.Edit size={16} />
          </div>
        </div>
        <div className="text-gray-03 text-sm">Nov, 2023</div>
      </div>

      <div className="border-b-2 border-gray-05 my-4"></div>

      <div className="flex justify-between">
        <div>
          <div className="flex mt-3 mb-10 text-gray-01">
            <Icon.Award />
            <div className="ms-2">
              <div className="text-sm">Target Achieved</div>
              <div className="font-bold text-xl text-black">
                ${data?.present_amount || 0}
              </div>
            </div>
          </div>
          <div className="flex text-gray-01">
            <Icon.Target />
            <div className="ms-2">
              <div className="text-sm">This Month Target</div>
              <div className="font-bold text-xl text-black">
                ${data?.target_amount || 0}
              </div>
            </div>
          </div>
        </div>

        <div className="ms-4 text-center">
          {/* Komponen Chart Pie */}
          <CompositionExample data={chartValue} />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-03">$0</span>
            <span className="font-bold text-lg">12K</span>
            <span className="text-gray-03">$20K</span>
          </div>
          <div className="mt-2 text-xs text-gray-04">Target vs Achievement</div>
        </div>
      </div>
    </div>
  );

  return (
    <Card
      title="Goals"
      desc={
        // Jika data kosong atau sedang loading, tampilkan spinner
        !data || Object.keys(data).length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full min-h-[200px] text-primary">
            <CircularProgress color="inherit" size={50} />
            <span className="mt-2 text-sm">Loading Data...</span>
          </div>
        ) : (
          chartData
        )
      }
    />
  );
}

export default CardGoal;
