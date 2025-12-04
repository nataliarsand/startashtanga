import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface ButtonAsButtonProps
  extends BaseButtonProps,
    ComponentPropsWithoutRef<'button'> {
  as?: 'button';
  to?: never;
  href?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link';
  to: string;
  href?: never;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsAnchorProps
  extends BaseButtonProps,
    ComponentPropsWithoutRef<'a'> {
  as: 'a';
  href: string;
  to?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsAnchorProps;

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: '#AA5042',
    color: '#FFFFFF',
  },
  secondary: {
    backgroundColor: '#F5EDDF',
    color: '#4F3130',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#4F3130',
    border: '2px solid #DCC8AF',
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClassName =
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const combinedClassName = `${baseClassName} ${sizeStyles[size]} ${className}`;
  const style = variantStyles[variant];

  if (props.as === 'link') {
    const { as: _, to, children, ...rest } = props;
    return (
      <Link to={to} className={combinedClassName} style={style} {...rest}>
        {children}
      </Link>
    );
  }

  if (props.as === 'a') {
    const { as: _, ...rest } = props;
    return <a className={combinedClassName} style={style} {...rest} />;
  }

  const { as: _, ...rest } = props;
  return <button className={combinedClassName} style={style} {...rest} />;
}
