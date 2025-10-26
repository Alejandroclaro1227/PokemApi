import styles from './Card.module.css';

/**
 * Componente Card atómico
 * Contenedor para agrupar contenido
 */

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card = ({
  children,
  className = '',
  clickable = false,
  onClick,
  hoverable = false,
}: CardProps) => {
  const cardClasses = [
    styles.card,
    clickable && styles.clickable,
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const CardComponent = clickable ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      type={clickable ? 'button' : undefined}
    >
      {children}
    </CardComponent>
  );
};


