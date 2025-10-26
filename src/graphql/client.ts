import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import type { Pokemon } from '../types/pokemon.types';

/**
 * Configuración de Apollo Client para conectar con PokeAPI GraphQL
 */

const httpLink = new HttpLink({
  uri: 'https://pokeapi.co/api/v2/pokemon/ditto',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemon: {
            // Configuración para merge de paginación
            keyArgs: false,
            merge(existing: Pokemon[], incoming: Pokemon[]) {
              if (!existing) {
                return incoming;
              }
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
