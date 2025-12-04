import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'info';
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

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:opacity-90',
  secondary: 'bg-surface text-heading hover:opacity-90',
  outline: 'bg-transparent text-heading border-2 border-default hover:border-accent',
  info: 'bg-info text-white hover:opacity-90',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClassName =
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const combinedClassName = `${baseClassName} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (props.as === 'link') {
    const { as: _as, to, children, ...rest } = props;
    void _as;
    return (
      <Link to={to} className={combinedClassName} {...rest}>
        {children}
      </Link>
    );
  }

  if (props.as === 'a') {
    const { as: _as, ...rest } = props;
    void _as;
    return <a className={combinedClassName} {...rest} />;
  }

  const { as: _as, ...rest } = props;
  void _as;
  return <button className={combinedClassName} {...rest} />;
}
