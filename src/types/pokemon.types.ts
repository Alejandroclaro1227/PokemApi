/**
 * Tipos TypeScript para la aplicación Pokémon
 */

// Tipo base para Pokémon en lista
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites;
}

// Tipo detallado para vista individual
export interface PokemonDetail extends Pokemon {
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  generation_id: number;
}

// Tipo de Pokémon (Fire, Water, etc.)
export interface PokemonType {
  name: string;
}

// Sprites/imágenes del Pokémon
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

// Estadística base
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

// Habilidad
export interface PokemonAbility {
  ability: {
    name: string;
  };
}

// Respuesta de GraphQL para lista de Pokémon
export interface GetPokemonsResponse {
  pokemon_v2_pokemon: Array<{
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemontypes: Array<{
      pokemon_v2_type: {
        name: string;
      };
    }>;
    pokemon_v2_pokemonsprites: Array<{
      sprites: string; // JSON string
    }>;
  }>;
}

// Respuesta de GraphQL para detalle de Pokémon
export interface GetPokemonDetailResponse {
  pokemon_v2_pokemon_by_pk: {
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemontypes: Array<{
      pokemon_v2_type: {
        name: string;
      };
    }>;
    pokemon_v2_pokemonsprites: Array<{
      sprites: string; // JSON string
    }>;
    pokemon_v2_pokemonstats: Array<{
      base_stat: number;
      pokemon_v2_stat: {
        name: string;
      };
    }>;
    pokemon_v2_pokemonabilities: Array<{
      pokemon_v2_ability: {
        name: string;
      };
    }>;
    pokemon_v2_pokemonspecy: {
      generation_id: number;
    };
  };
}

// Tipos disponibles para filtros
export type PokemonTypeFilter =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export const POKEMON_TYPES: PokemonTypeFilter[] = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];


