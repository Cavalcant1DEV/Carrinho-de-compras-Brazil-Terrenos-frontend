export function ProductSkeleton() {
  return (
    <article
      className="flex animate-pulse flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 aspect-[4/3] rounded-lg bg-gray-200" />
      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="h-5 w-2/3 rounded bg-gray-200" />
          <div className="h-5 w-16 rounded-full bg-gray-200" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-3/4 rounded bg-gray-200" />
        </div>
        <div className="mt-auto pt-6">
          <div className="mb-4 h-6 w-28 rounded bg-gray-200" />
          <div className="h-10 w-full rounded-lg bg-gray-200" />
        </div>
      </div>
    </article>
  );
}
