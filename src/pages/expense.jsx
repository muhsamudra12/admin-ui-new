import React, { useState, useEffect } from "react";
import MainLayout from "../components/Layout/MainLayout";
import CardExpense from "../components/Fragments/CardExpense";
import CircularProgress from "@mui/material/CircularProgress";
import { expenseService } from "../services/dataService";

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const data = await expenseService();
        setExpenses(data || []);
      } catch (error) {
        console.error("Gagal load data:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    getExpenses();
  }, []);

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-500 mb-6">
          Expenses Comparison
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <CircularProgress color="primary" size={80} />
          </div>
        ) : (
          /* GRID 3 KOLOM sesuai gambar soal */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((categoryGroup, index) => (
              <CardExpense key={index} data={categoryGroup} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ExpensesPage;
