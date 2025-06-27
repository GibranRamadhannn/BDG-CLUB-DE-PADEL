import { Sun, Moon } from "lucide-react";

export default function NavDate() {
  const today = new Date();
  const hour = today.getHours();
  const isDay = hour >= 6 && hour < 18;

  const icon = isDay ? (
    <Sun className="w-4 h-4 text-yellow-500 inline-block m-2" />
  ) : (
    <Moon className="w-4 h-4 text-blue-500 inline-block m-2" />
  );

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(today);

  return (
    <h1 className="flex items-center rounded-full px-3 py-2 bg-foreground text-sm/6 font-[family-name:var(--font-geist-mono)] text-background">
      <span className="rounded-full border border-cavernous/80 items-center justify-center align-items-center text-center mr-2">
        {icon}
      </span>
      {formattedDate}
    </h1>
  );
}
