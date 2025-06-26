import { useEffect, useState } from "react";
import {
  getBasicPokemonList,
  getPokemonDetail,
  getPokemonSpecies,
} from "./services/pokeapi";
import type { PokemonDetail, PokemonSpecies } from "./types/pokemon";
import GridView from "./pages/GridView";
import TableView from "./pages/TableView";
import PokemonModal from "./components/PokemonModal";
import ViewModeSelector from "./components/ViewModeSelector";
import Loader from "./components/Loader";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PokemonDetail | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);

  const handleSelect = async (pokemon: PokemonDetail) => {
    setSelected(pokemon);
    const info = await getPokemonSpecies(pokemon.id);
    setSpecies(info);
  };

  useEffect(() => {
    async function fetchAll() {
      const basicList = await getBasicPokemonList();
      const detailed = await Promise.all(
        basicList.map((p) => getPokemonDetail(p.url))
      );
      setPokemons(detailed.filter(Boolean) as PokemonDetail[]);
      setLoading(false);
    }

    fetchAll();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Explorer</h1>

      <div className="flex gap-2 mb-4">
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: viewMode === "grid" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: viewMode === "grid" ? -100 : 100 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === "grid" ? (
              <GridView pokemons={pokemons} onSelect={handleSelect} />
            ) : (
              <TableView pokemons={pokemons} onSelect={handleSelect} />
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {selected && (
        <PokemonModal
          pokemon={selected}
          species={species}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}

export default App;
