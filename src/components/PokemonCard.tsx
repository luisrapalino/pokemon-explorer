import type { PokemonDetail } from "../types/pokemon";
import { motion } from "framer-motion";
import tipoColorMap from "../types/typeColorMap";

interface Props {
  pokemon: PokemonDetail;
  onClick: (pokemon: PokemonDetail) => void;
}

export default function PokemonCard({ pokemon, onClick }: Props) {
  const tipoPrincipal = pokemon.types[0]?.type.name;

  const tipoColor = tipoColorMap[tipoPrincipal] || "bg-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: pokemon.id * 0.005 }}
      className={`relative rounded-xl shadow-md p-4 cursor-pointer transform hover:scale-[1.03] transition-transform duration-200 ${tipoColor}`}
      onClick={() => onClick(pokemon)}
    >
      {/* ID */}
      <div className="absolute top-2 right-3 text-xs font-bold text-gray-500">
        #{pokemon.id}
      </div>

      {/* Imagen */}
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-20 h-20 drop-shadow-md"
      />

      {/* Nombre */}
      <p className="text-center mt-3 text-lg font-semibold capitalize">
        {pokemon.name}
      </p>

      {/* Tipos */}
      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="text-xs px-2 py-1 bg-white/30 border border-white/50 rounded-full backdrop-blur-sm"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
