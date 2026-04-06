import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useContext(AppContext);

  const expenseData = transactions.filter((t) => t.type === "expense");

  const categoryTotals = {};

  expenseData.forEach((t) => {
    categoryTotals[t.category] =
      (categoryTotals[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  return (
    <div className="mt-6 p-4 bg-yellow-100 rounded">
      <h2 className="font-bold">Insights</h2>
      <p>Highest Spending: {highestCategory}</p>
    </div>
  );
}