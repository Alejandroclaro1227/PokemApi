/**
 * Funciones de validación para la aplicación
 */

/**
 * Valida el nombre de un Pokémon para búsqueda
 * @param name - Nombre a validar
 * @returns true si es válido, false si no
 */
export const validatePokemonName = (name: string): boolean => {
  if (name.length < 3) return false;
  const regex = /^[a-zA-Z0-9\s-]+$/;
  return regex.test(name);
};

/**
 * Valida que el nombre no esté vacío
 * @param name - Nombre a validar
 * @returns true si no está vacío
 */
export const isNotEmpty = (name: string): boolean => {
  return name.trim().length > 0;
};

/**
 * Valida caracteres especiales
 * @param input - String a validar
 * @returns true si no tiene caracteres especiales
 */
export const hasNoSpecialCharacters = (input: string): boolean => {
  const regex = /^[a-zA-Z0-9\s-]+$/;
  return regex.test(input);
};

/**
 * Valida longitud mínima
 * @param input - String a validar
 * @param minLength - Longitud mínima requerida
 * @returns true si cumple la longitud
 */
export const meetsMinLength = (input: string, minLength: number): boolean => {
  return input.length >= minLength;
};


