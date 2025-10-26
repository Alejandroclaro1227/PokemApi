import { useEffect, useState } from 'react';
import type { Pokemon, PokemonDetail } from '../types/pokemon.types';
import { parseSprites } from '../utils/helpers';

const GRAPHQL_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta';

/**
 * Hook para obtener lista de Pokémon con paginación usando GraphQL
 */
export const usePokemonList = (limit: number, offset: number) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetPokemons($limit: Int!, $offset: Int!) {
                pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {name: asc}) {
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
            `,
            variables: { limit, offset },
          }),
        });

        const { data } = await response.json();

        const formattedPokemons: Pokemon[] = data.pokemon_v2_pokemon.map(
          (p: any) => {
            // Parsear sprites o usar URL directa como fallback
            let sprites: any;
            try {
              sprites = p.pokemon_v2_pokemonsprites[0]?.sprites
                ? parseSprites(p.pokemon_v2_pokemonsprites[0].sprites)
                : {
                    front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
                    other: {
                      'official-artwork': {
                        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
                      },
                    },
                  };
            } catch (err) {
              sprites = {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
                other: {
                  'official-artwork': {
                    front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
                  },
                },
              };
            }

            return {
              id: p.id,
              name: p.name,
              height: p.height,
              weight: p.weight,
              types: p.pokemon_v2_pokemontypes.map((t: any) => ({
                name: t.pokemon_v2_type.name,
              })),
              sprites,
            };
          }
        );

        // Si offset es 0, reemplazar. Si no, acumular (paginación)
        setPokemons(prev =>
          offset === 0 ? formattedPokemons : [...prev, ...formattedPokemons]
        );
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, offset]);

  const loadMore = () => {
    // El offset se maneja desde el componente padre
  };

  return { pokemons, loading, error, loadMore };
};

/**
 * Hook para obtener detalle de un Pokémon específico usando GraphQL
 */
export const usePokemonDetail = (id: number) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetPokemonDetail($id: Int!) {
                pokemon_v2_pokemon_by_pk(id: $id) {
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
                  pokemon_v2_pokemonstats {
                    base_stat
                    pokemon_v2_stat {
                      name
                    }
                  }
                  pokemon_v2_pokemonabilities {
                    pokemon_v2_ability {
                      name
                    }
                  }
                  pokemon_v2_pokemonspecy {
                    generation_id
                  }
                }
              }
            `,
            variables: { id },
          }),
        });

        const { data } = await response.json();
        const p = data.pokemon_v2_pokemon_by_pk;

        // Parsear sprites o usar URL directa como fallback
        let sprites: any;
        try {
          sprites = p.pokemon_v2_pokemonsprites[0]?.sprites
            ? parseSprites(p.pokemon_v2_pokemonsprites[0].sprites)
            : {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
                other: {
                  'official-artwork': {
                    front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
                  },
                },
              };
        } catch (err) {
          sprites = {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
            other: {
              'official-artwork': {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
              },
            },
          };
        }

        const formattedPokemon: PokemonDetail = {
          id: p.id,
          name: p.name,
          height: p.height,
          weight: p.weight,
          types: p.pokemon_v2_pokemontypes.map((t: any) => ({
            name: t.pokemon_v2_type.name,
          })),
          sprites,
          stats: p.pokemon_v2_pokemonstats.map((s: any) => ({
            base_stat: s.base_stat,
            stat: { name: s.pokemon_v2_stat.name },
          })),
          abilities: p.pokemon_v2_pokemonabilities.map((a: any) => ({
            ability: { name: a.pokemon_v2_ability.name },
          })),
          generation_id: p.pokemon_v2_pokemonspecy.generation_id,
        };

        setPokemon(formattedPokemon);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  return { pokemon, loading, error };
};
