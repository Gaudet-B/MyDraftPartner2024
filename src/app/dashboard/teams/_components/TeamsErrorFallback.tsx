export default function TeamsErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
      <h2 className="font-aquire text-xl text-red-600">
        Oops! Something went wrong with the teams page
      </h2>
      <p className="text-gray-600">
        {error?.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Refresh Page
      </button>
    </div>
  );
}
