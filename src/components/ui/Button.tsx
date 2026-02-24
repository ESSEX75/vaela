import Link from 'next/link';
import { cn } from '@/utils';
import type { ComponentPropsWithoutRef } from 'react';

const variantClasses = {
  primary:
    'rounded-md bg-black px-8 py-3 text-base font-medium text-white transition hover:bg-neutral-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none',
  ghost: 'font-medium text-gray-600 hover:text-black',
  danger: 'font-medium text-brand hover:text-brand-hover transition-colors',
  'icon-round':
    'h-10 w-10 rounded-full bg-white text-black transition-all hover:bg-black hover:text-white',
  'icon-ghost': 'rounded-md text-black transition-colors',
  provider:
    'w-full rounded-xl px-4 py-2.5 font-semibold transition-all duration-200 active:scale-[0.98]',
} as const;

export type ButtonVariant = keyof typeof variantClasses;

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
} as const;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: keyof typeof sizeClasses;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsLinkProps
  extends
    ButtonBaseProps,
    Omit<
      ComponentPropsWithoutRef<typeof Link>,
      'href' | 'className' | 'children'
    > {
  href: string;
}

interface ButtonAsButtonProps
  extends
    ButtonBaseProps,
    Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> {
  href?: undefined;
}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button({
  variant = 'primary',
  size,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const base = variantClasses[variant];

  const sizeOverride =
    variant === 'primary' && size ? sizeClasses[size] : undefined;

  const classes = cn(
    'inline-flex items-center justify-center gap-2',
    base,
    sizeOverride,
    fullWidth && 'w-full',
    className,
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLinkProps;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
