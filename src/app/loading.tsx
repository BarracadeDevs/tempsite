export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-1.5">
        <span className="h-1 w-1 rounded-full bg-emerald-800 animate-bounce [animation-delay:0ms]" />
        <span className="h-1 w-1 rounded-full bg-emerald-800 animate-bounce [animation-delay:150ms]" />
        <span className="h-1 w-1 rounded-full bg-emerald-800 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
