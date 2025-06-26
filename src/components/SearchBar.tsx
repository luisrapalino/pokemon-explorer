import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative mb-4 w-full max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-4 py-2 rounded shadow-sm pl-10"
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
