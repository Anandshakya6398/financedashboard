import Dashboard from "./components/SummaryCards";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import RoleSwitcher from "./components/RoleSwitcher";

function App() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Finance Dashboard
        </h1>
        <RoleSwitcher />
      </div>
      <Dashboard />
      <Transactions />
      <Insights />
    </div>
  );
}

export default App;