import { IoClose } from "react-icons/io5";
import type { PokemonDetail, PokemonSpecies } from "../types/pokemon";
import StatBar from "./StatBar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface Props {
  pokemon: PokemonDetail;
  species: PokemonSpecies | null;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose, species }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const descripcion =
    species?.flavor_text_entries
      .find((entry) => entry.language.name === "es")
      ?.flavor_text.replace(/\f/g, " ") || "";

  const imagen =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          className="bg-white p-4 rounded-lg w-full max-w-4xl relative overflow-y-auto max-h-[90vh] flex flex-col lg:flex-row gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
          >
            <IoClose />
          </button>

          <div className="flex flex-col justify-center lg:w-1.5/3">
            <h2 className="text-xl font-bold mt-4 capitalize text-center">
              {pokemon.name}
            </h2>
            <div className="relative flex justify-center items-center w-full h-40">
              <span
                className="absolute text-[210px] font-extrabold uppercase pointer-events-none z-0"
                style={{
                  WebkitTextStroke: "5px #d1d5db", // gray-300
                  color: "transparent",
                  opacity: 0.3,
                  lineHeight: 1,
                }}
              >
                {pokemon.id}
              </span>
              <img
                src={imagen}
                className="w-32 h-32 object-contain drop-shadow-md relative z-10"
                alt={pokemon.name}
              />
            </div>
            {descripcion && (
              <div className="mt-4">
                <p className="font-semibold mb-1">Descripción:</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {descripcion}
                </p>
              </div>
            )}
            <div className="mt-4">
              <p className="font-semibold mb-1">Habilidades:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700 capitalize">
                {pokemon.abilities.map((a) => (
                  <li key={a.ability.name}>
                    {a.ability.name}{" "}
                    {a.is_hidden && (
                      <span className="text-xs text-gray-500">(oculta)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1 text-sm overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm border border-gray-200 p-4 rounded-lg bg-gray-50 my-4">
              <div className="font-medium text-gray-600">Tipo(s)</div>
              <div className="text-gray-800 font-semibold capitalize">
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </div>

              <div className="font-medium text-gray-600">Altura</div>
              <div className="text-gray-800 font-semibold">
                {pokemon.height / 10} m
              </div>

              <div className="font-medium text-gray-600">Peso</div>
              <div className="text-gray-800 font-semibold">
                {pokemon.weight / 10} kg
              </div>
            </div>

            <p className="mt-2 font-semibold">Estadísticas:</p>
            <div className="mt-2">
              {pokemon.stats.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
