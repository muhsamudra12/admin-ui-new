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
  goals as staticGoals,
  transactions,
} from "../data";

import { goalService } from "../services/dataService";
import { AuthContext } from "../context/authContext";

function dashboard() {
  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const [goals, setGoals] = useState({ present_amount: 0, target_amount: 0 });

  const fetchGoals = async () => {
    try {
      const data = await goalService();
      setGoals(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data goals",
        severity: "error",
      });

      if (err.response?.status === 401) {
        logout();
      }
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
          {/* Menggunakan data dari API (state goals) */}
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
      {/* Komponen Snackbar untuk menampilkan error */}
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

export default dashboard;
