import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole } = useContext(AppContext);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-400">Role:</label>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="viewer" className="bg-gray-900">Viewer</option>
        <option value="admin" className="bg-gray-900">Admin</option>
      </select>
    </div>
  );
}