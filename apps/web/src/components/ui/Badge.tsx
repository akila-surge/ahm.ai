interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-[0.85rem] py-[0.3rem] rounded-full text-[0.72rem] font-bold tracking-[0.06em] uppercase bg-primary-dim text-primary border border-primary-ring ${className}`}
    >
      {children}
    </span>
  );
}
