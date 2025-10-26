import styles from './Badge.module.css';

/**
 * Componente Badge atómico
 * Etiqueta para mostrar información pequeña
 */

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge = ({
  children,
  color,
  variant = 'solid',
  size = 'md',
  className = '',
}: BadgeProps) => {
  const badgeClasses = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  const style = color
    ? ({
        '--badge-color': color,
      } as React.CSSProperties)
    : {};

  return (
    <span className={badgeClasses} style={style}>
      {children}
    </span>
  );
};


