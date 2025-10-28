import { gql } from '@apollo/client';

/**
 * Query para obtener lista de Pokémon con paginación
 */
export const GET_ALL_POKEMON = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
    ) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

/**
 * Query para obtener todos los tipos de Pokémon disponibles
 */
export const GET_ALL_TYPES = gql`
  query GetAllTypes {
    pokemon_v2_type(order_by: { name: asc }) {
      id
      name
    }
  }
`;




