import { type JSX } from "react";
import { motion } from "framer-motion";
import { getStatColor } from "../utils/stats";
import {
  GiHeartPlus,
  GiBroadsword,
  GiShield,
  GiLightningArc,
  GiMagicAxe,
  GiMagicShield,
} from "react-icons/gi";

interface Props {
  name: string;
  value: number;
}

const statIcons: Record<string, JSX.Element> = {
  hp: <GiHeartPlus />,
  attack: <GiBroadsword />,
  defense: <GiShield />,
  speed: <GiLightningArc />,
  "special-attack": <GiMagicAxe />,
  "special-defense": <GiMagicShield />,
};
const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defensa",
  speed: "Velocidad",
  "special-attack": "Ataque especial",
  "special-defense": "Defensa especial",
};

export default function StatBar({ name, value }: Props) {
  return (
    <div className="mb-2">
      <div className="text-sm mb-1 capitalize flex items-center gap-2">
        {statIcons[name] || null}
        {statLabels[name] || name}: <strong>{value}</strong>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-3 rounded-full ${getStatColor(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
