import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import CardBalance from "../components/Fragments/CardBalance";
import CardGoal from "../components/Fragments/CardGoal";
import CardUpcomingBill from "../components/Fragments/CardUpcomingBill";
import CardRecentTransaction from "../components/Fragments/CardRecentTransaction";
import CardStatistic from "../components/Fragments/CardStatistic";
import CardExpenseBreakdown from "../components/Fragments/CardExpenseBreakdown";
import AppSnackbar from "../components/Elements/AppSnackbar";

import {
  balances,
  bills,
  expensesBreakdowns,
  expensesStatistics,
  transactions,
} from "../data";

import { goalService } from "../services/dataService";
import { AuthContext } from "../context/authContext";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [goals, setGoals] = useState({ present_amount: 0, target_amount: 0 });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchGoals = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const data = await goalService();
      if (data) {
        setGoals({
          present_amount: data.present_amount || 0,
          target_amount: data.target_amount || 0,
        });
      }
    } catch (err) {
      if (err.status !== 401) {
        setSnackbar({
          open: true,
          message: "Gagal mengambil data goals",
          severity: "error",
        });
      }
      if (err.status === 401) logout();
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <MainLayout>
      <div className="grid sm:grid-cols-12 gap-6">
        <div className="sm:col-span-4">
          <CardBalance data={balances} />
        </div>
        <div className="sm:col-span-4">
          <CardGoal data={goals} />
        </div>
        <div className="sm:col-span-4">
          <CardUpcomingBill data={bills} />
        </div>
        <div className="sm:col-span-4 sm:row-span-2">
          <CardRecentTransaction data={transactions} />
        </div>
        <div className="sm:col-span-8">
          <CardStatistic data={expensesStatistics} />
        </div>
        <div className="sm:col-span-8">
          <CardExpenseBreakdown data={expensesBreakdowns} />
        </div>
      </div>

      {snackbar.open && (
        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      )}
    </MainLayout>
  );
}

export default Dashboard;
