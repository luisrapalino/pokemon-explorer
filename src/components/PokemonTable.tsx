import DataTable, { type TableColumn } from "react-data-table-component";
import type { PokemonDetail } from "../types/pokemon";

interface Props {
  data: PokemonDetail[];
  onRowClick: (pokemon: PokemonDetail) => void;
  filterType: string;
}

export default function PokemonTable({ data, onRowClick, filterType }: Props) {
  const columns: TableColumn<PokemonDetail>[] = [
    {
      name: "Imagen",
      cell: (row) => (
        <img src={row.sprites.front_default} alt={row.name} width={40} />
      ),
      width: "70px",
      sortable: false,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      format: (row) => row.name.charAt(0).toUpperCase() + row.name.slice(1),
    },
    {
      name: "Tipo(s)",
      selector: (row) => row.types.map((t) => t.type.name).join(", "),
      sortable: true,
    },
    {
      name: "Peso (kg)",
      selector: (row) => row.weight / 10,
      sortable: true,
    },
    {
      name: "Altura (m)",
      selector: (row) => row.height / 10,
      sortable: true,
    },
    {
      name: "HP",
      selector: (row) =>
        row.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
      sortable: true,
    },
    {
      name: "XP",
      selector: (row) => row.base_experience,
      sortable: true,
    },
    {
      name: "Ataque",
      selector: (row) =>
        row.stats.find((s) => s.stat.name === "attack")?.base_stat || 0,
      sortable: true,
    },
    {
      name: "Defensa",
      selector: (row) =>
        row.stats.find((s) => s.stat.name === "defense")?.base_stat || 0,
      sortable: true,
    },
    {
      name: "Ataque especial",
      selector: (row) =>
        row.stats.find((s) => s.stat.name === "special-attack")?.base_stat ?? 0,
      sortable: true,
    },
    {
      name: "Defensa especial",
      selector: (row) =>
        row.stats.find((s) => s.stat.name === "special-defense")?.base_stat ??
        0,
      sortable: true,
    },
    {
      name: "Velocidad",
      selector: (row) =>
        row.stats.find((s) => s.stat.name === "speed")?.base_stat ?? 0,
      sortable: true,
    },
    {
      name: "Ver detalles",
      cell: (row) => (
        <button
          onClick={() => onRowClick(row)}
          className="text-blue-500 underline cursor-pointer"
        >
          Ver
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  const filteredData = filterType
    ? data.filter((p) => p.types.some((t) => t.type.name === filterType))
    : data;

  return (
    <div className="mt-6">
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        highlightOnHover
        striped
        responsive
        noDataComponent="No hay Pokémon para mostrar"
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
          selectAllRowsItem: false,
        }}
        className="mt-10 text-lg font-medium"
      />
    </div>
  );
}
