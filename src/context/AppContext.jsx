import { createContext, useEffect, useState } from "react";
import { transactionsData } from "../data/mockData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    setTransactions(saved ? JSON.parse(saved) : transactionsData);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        search,
        setSearch,
        filter,
        setFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};