import Image from "next/image";

export default function NavLogo({ source, alt, href, className = "" }) {
  return (
    <a href={href}>
      <div className={`relative ${className}`}>
        <Image
          className="dark:invert interactive"
          src={source}
          alt={alt}
          fill
          priority
        />
      </div>
    </a>
  );
}
