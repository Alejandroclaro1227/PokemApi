/**
 * Funciones helper para la aplicación
 */

import type { PokemonSprites } from '../types/pokemon.types';

/**
 * Capitaliza la primera letra de un string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Parsea el JSON de sprites que viene de la API
 */
export const parseSprites = (spritesJson: string): PokemonSprites => {
  try {
    return JSON.parse(spritesJson) as PokemonSprites;
  } catch {
    return {
      front_default: null,
      front_shiny: null,
    };
  }
};

/**
 * Obtiene la mejor imagen disponible del Pokémon
 */
export const getBestImage = (sprites: PokemonSprites, id?: number): string => {
  // Intentar obtener la imagen de alta calidad primero
  if (sprites.other?.['official-artwork']?.front_default) {
    return sprites.other['official-artwork'].front_default;
  }

  // Si no, usar el sprite por defecto
  if (sprites.front_default) {
    return sprites.front_default;
  }

  // Fallback: construir URL directa con el ID si está disponible
  if (id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';
};

/**
 * Formatea el peso del Pokémon (de hectogramos a kg)
 */
export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};

/**
 * Formatea la altura del Pokémon (de decímetros a metros)
 */
export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

/**
 * Formatea el nombre del stat para mostrar
 */
export const formatStatName = (statName: string): string => {
  const statMap: Record<string, string> = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque Esp.',
    'special-defense': 'Defensa Esp.',
    speed: 'Velocidad',
  };
  return statMap[statName] || capitalize(statName);
};

/**
 * Obtiene el color basado en el tipo de Pokémon
 */
export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return typeColors[type.toLowerCase()] || '#A8A878';
};

/**
 * Debounce para optimizar búsquedas
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Obtiene el número de generación formateado
 */
export const formatGeneration = (genId: number): string => {
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  return romans[genId - 1] || `${genId}`;
};
