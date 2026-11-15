export default function Loading() {
  return (
    <div className="container-page py-10" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="h-10 w-2/3 max-w-md animate-pulse rounded-lg bg-secondary" />
      <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-secondary" />
      <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="h-64 animate-pulse rounded-xl bg-secondary" />
        ))}
      </ul>
    </div>
  );
}
