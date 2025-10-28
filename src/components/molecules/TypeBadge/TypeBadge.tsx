import type { PokemonType } from '../../../types/pokemon.types';
import { capitalize, getTypeColor } from '../../../utils/helpers';
import { Badge } from '../../atoms/Badge/Badge';

/**
 * Componente TypeBadge molecule
 * Badge especializado para tipos de Pokémon
 */

export interface TypeBadgeProps {
  type: PokemonType;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
}

export const TypeBadge = ({
  type,
  size = 'md',
  variant = 'solid',
}: TypeBadgeProps) => {
  return (
    <Badge color={getTypeColor(type.name)} size={size} variant={variant}>
      {capitalize(type.name)}
    </Badge>
  );
};




