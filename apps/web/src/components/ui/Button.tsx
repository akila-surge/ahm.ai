type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap leading-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white border border-transparent hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(30,80,217,0.35)]',
  secondary:
    'bg-card text-foreground border border-border hover:bg-card-elevated hover:border-border-light',
  outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary-dim',
  ghost:
    'bg-transparent text-primary border border-transparent hover:bg-primary-dim font-semibold',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'text-[0.875rem] px-5 py-[0.45rem]',
  md: 'text-[1rem] px-8 py-[0.875rem]',
  lg: 'text-[1rem] px-8 py-[1.125rem]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
