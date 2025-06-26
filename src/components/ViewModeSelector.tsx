import { BsGrid, BsTable } from "react-icons/bs";

interface Props {
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
}

export default function ViewModeSelector({ viewMode, setViewMode }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        title="Cuadrícula"
        onClick={() => setViewMode("grid")}
        className={`px-4 py-2 rounded ${
          viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <BsGrid />
      </button>
      <button
        title="Tabla"
        onClick={() => setViewMode("table")}
        className={`px-4 py-2 rounded ${
          viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <BsTable />
      </button>
    </div>
  );
}
