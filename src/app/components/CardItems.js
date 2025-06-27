export default function CardItem({ icon: Icon, title }) {
  return (
    <div className="dark:invert interactive p-4 flex flex-col justify-between items-center gap-3 border border-foreground/30 rounded-2xl hover:border-foreground/50 transition duration-500 ease-in-out hover:bg-gradient-to-t from-foreground/10 from-10% to-background/5 to-35%">
      <div className="p-4 w-full flex justify-center mt-10">
        <Icon className="w-20 h-20 text-foreground" />
      </div>
      <div className="p-4 w-full text-start">
        <h1 className="font-[family-name:var(--font-geist-sans)] font-semibold text-xl text-foreground">
          {title}
        </h1>
      </div>
    </div>
  );
}
