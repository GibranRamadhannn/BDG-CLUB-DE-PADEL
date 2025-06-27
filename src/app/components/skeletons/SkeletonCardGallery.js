export default function SekletonCard() {
  return (
    <div className="animate-pulse bg-muted/40 rounded-xl border h-full w-full p-4 flex flex-col justify-between items-center gap-4">
      <div className="w-20 h-20 bg-gray-300 rounded-full mt-8" />
      <div className="w-3/4 h-6 bg-gray-300 rounded-md mb-10 items-start" />
    </div>
  );
}
