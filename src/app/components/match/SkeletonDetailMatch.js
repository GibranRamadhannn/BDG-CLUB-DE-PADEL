"use client";

export default function SkeletonDetailMatch() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)] bg-mercury animate-pulse pt-32 px-6 space-y-6">
      <div className="h-4 w-40 bg-gray-300 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 w-2/3 bg-gray-300 rounded"></div>
        <div className="h-10 w-36 bg-gray-300 rounded-xl"></div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>
      <div className="flex gap-6">
        <div className="bg-white p-5 rounded-xl w-3/5 space-y-4">
          <div className="flex justify-between">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-36 bg-gray-300 rounded-xl"></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                <div className="space-y-1">
                  <div className="w-28 h-4 bg-gray-300 rounded"></div>
                  <div className="w-20 h-3 bg-gray-300 rounded"></div>
                  <div className="w-24 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl w-2/5 space-y-6">
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
          <div className="flex justify-between items-center border-b border-mercury pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
              <div className="space-y-2">
                <div className="w-28 h-4 bg-gray-300 rounded"></div>
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="w-10 h-10 border border-gray-300 rounded-xl"></div>
          </div>
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
              <div className="space-y-2">
                <div className="w-36 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl w-full">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
