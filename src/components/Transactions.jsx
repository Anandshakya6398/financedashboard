import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Transactions() {
  const {
    transactions,
    setTransactions,
    role,
    search,
    setSearch,
    filter,
    setFilter,
  } = useContext(AppContext);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
  });

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.amount || !form.category) return;

    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    };

    setTransactions([...transactions, newTx]);
    setForm({ amount: "", category: "", type: "expense" });
  };

  let filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filter) filtered = filtered.filter((t) => t.type === filter);

  return (
    <div className="mt-6 space-y-4">

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Admin Form */}
      {role === "admin" && (
        <form
          onSubmit={handleAdd}
          className="card flex flex-col md:flex-row "
        >
          <input
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
            Add
          </button>
        </form>
      )}

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="py-2">Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-800 hover:bg-gray-800/40"
              >
                <td className="py-2">{t.date}</td>
                <td className="font-medium">₹{t.amount}</td>
                <td>{t.category}</td>
                <td
                  className={
                    t.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {t.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center py-4 text-gray-400">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}