import { useMemo, useState } from "react";
import type { PokemonDetail } from "../types/pokemon";
import PokemonTable from "../components/PokemonTable";
import SearchBar from "../components/SearchBar";

interface Props {
  pokemons: PokemonDetail[];
  onSelect: (pokemon: PokemonDetail) => void;
}

export default function TableView({ pokemons, onSelect }: Props) {
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");

  const filtered = pokemons
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) =>
      filterType ? p.types.some((t) => t.type.name === filterType) : true
    );

  const tiposUnicos = useMemo(() => {
    return Array.from(
      new Set(pokemons.flatMap((p) => p.types.map((t) => t.type.name)))
    );
  }, [pokemons]);

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="mb-4 border p-2 rounded"
      >
        <option value="">Todos los tipos</option>
        {tiposUnicos.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      <PokemonTable
        data={filtered}
        onRowClick={onSelect}
        filterType={filterType}
      />
    </div>
  );
}
