import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Dashboard() {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const balance = income - expense;

  // Line chart data
  let running = 0;
  const lineData = transactions.map(t => {
    running += t.type === "income" ? t.amount : -t.amount;
    return { date: t.date, balance: running };
  });
  const categoryMap = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

  const pieData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = ["#a78bfa", "#60a5fa", "#f87171", "#34d399"];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-sm text-gray-400">Balance</p>
          <h2 className="text-xl font-semibold text-black">₹{balance}</h2>
        </div>

        <div className="card text-center">
          <p className="text-sm text-gray-400">Income</p>
          <h2 className="text-xl font-semibold text-green-400">₹{income}</h2>
        </div>

        <div className="card text-center">
          <p className="text-sm text-gray-400">Expense</p>
          <h2 className="text-xl font-semibold text-red-400">₹{expense}</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="mb-4">Balance Trend</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#a78bfa"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2 className="mb-4">Spending Breakdown</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}