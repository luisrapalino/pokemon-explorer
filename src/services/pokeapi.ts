import type { PokemonDetail } from "../types/pokemon";

export interface BasicPokemon {
  name: string;
  url: string;
}

export async function getBasicPokemonList(
  limit = 151
): Promise<BasicPokemon[]> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error("Error al obtener los Pokémon");
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPokemonDetail(
  url: string
): Promise<PokemonDetail | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("No se pudo obtener el detalle");
    const data: PokemonDetail = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getPokemonSpecies(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener species");
  return await res.json();
}
