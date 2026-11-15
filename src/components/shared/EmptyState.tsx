export function EmptyState({
  icon,
  title,
  children,
  actions,
}: {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed bg-card px-6 py-12 text-center">
      {icon && <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">{icon}</div>}
      <h2 className="text-display text-2xl text-primary">{title}</h2>
      {children && <p className="mx-auto mt-2 max-w-[52ch] text-muted-foreground">{children}</p>}
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}
