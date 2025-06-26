import { useState } from "react";
import type { PokemonDetail } from "../types/pokemon";
import PokemonCard from "../components/PokemonCard";
import ReactPaginate from "react-paginate";
import SearchBar from "../components/SearchBar";
import ColorGroupFilter from "../components/ColorGroupFilter";
import typeColorMap from "../types/typeColorMap";

interface Props {
  pokemons: PokemonDetail[];
  onSelect: (pokemon: PokemonDetail) => void;
}

export default function GridView({ pokemons, onSelect }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  let filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedColor) {
    filtered = filtered.filter((p) => {
      const tipoPrincipal = p.types[0]?.type.name;
      const color = typeColorMap[tipoPrincipal];
      return color === selectedColor;
    });
  }

  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  return (
    <div>
      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(0);
        }}
      />
      <div className="flex items-center justify-between mb-4">
        <label>
          <span className="mr-2">Filas por página:</span>
          <select
            className="border p-1 rounded"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
          >
            {[10, 20, 30, 40, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <p>
          Página {page + 1} de {pageCount}
        </p>
      </div>

      <ColorGroupFilter
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />

      {paginated.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {paginated.map((p) => (
            <PokemonCard key={p.id} pokemon={p} onClick={onSelect} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-700 mt-10 text-lg font-medium">
          No hay Pokémon para mostrar
        </div>
      )}

      {paginated.length > 0 && (
        <ReactPaginate
          previousLabel={"← Anterior"}
          nextLabel={"Siguiente →"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={
            "flex justify-center flex-wrap mt-6 gap-2 gap-y-3 text-sm"
          }
          pageLinkClassName={"px-2 py-1 border rounded cursor-pointer"}
          activeLinkClassName={"bg-blue-500 border-blue-500 text-white"}
          previousLinkClassName={"px-2 py-1 border rounded cursor-pointer"}
          nextLinkClassName={"px-2 py-1 border rounded cursor-pointer"}
          disabledClassName={"opacity-50"}
        />
      )}
    </div>
  );
}
