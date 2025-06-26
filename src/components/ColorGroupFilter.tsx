import typeColorMap from "../types/typeColorMap";

interface Props {
  selectedColor: string;
  onSelect: (color: string) => void;
}

export default function ColorGroupFilter({ selectedColor, onSelect }: Props) {
  const uniqueColors = Array.from(new Set(Object.values(typeColorMap)));

  return (
    <div className="mb-4 flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelect("")}
        className="px-3 py-1 rounded bg-gray-300 text-sm"
      >
        Todos
      </button>

      {uniqueColors.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          className={`px-3 py-1 rounded text-sm border transition-all duration-150 ${
            selectedColor === color ? "ring-2 ring-blue-500 scale-105" : ""
          } ${color}`}
          title={`Color: ${color}`}
        >
          &nbsp;
        </button>
      ))}
    </div>
  );
}
