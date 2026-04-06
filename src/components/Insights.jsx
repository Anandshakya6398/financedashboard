import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useContext(AppContext);

  const expenses = transactions.filter(t => t.type === "expense");

  const total = expenses.reduce((a, t) => a + t.amount, 0);

  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const highest = Object.keys(categoryMap).reduce((a, b) =>
    categoryMap[a] > categoryMap[b] ? a : b, ""
  );

  return (
    <div className="mt-6 card">
      <h2 className="text-lg font-semibold mb-3">Insights</h2>

      <div className="space-y-2 text-sm">
        <p>
          Highest Spending:{" "}
          <span className="text-purple-400 font-medium">
            {highest || "N/A"}
          </span>
        </p>

        <p>
          Total Expenses:{" "}
          <span className="text-red-400 font-medium">
            ₹{total}
          </span>
        </p>
      </div>
    </div>
  );
}