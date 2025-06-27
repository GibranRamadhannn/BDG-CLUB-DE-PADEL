import Image from "next/image";

export default function HeroSection({
  paragraph1,
  paragraph2first,
  paragraph2second,
  title,
  source,
  alt,
}) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center mx-5 pt-10 pb-18">
      <div className="w-full flex flex-col justify-center gap-2">
        <p className="font-[family-name:var(--font-geist-mono)] text-md">
          {paragraph1}
        </p>
        <h1 className="font-bold font-[family-name:var(--font-montserrat)] text-xl md:text-8xl">
          {title}
        </h1>
        <p className="font-[family-name:var(--font-geist-mono)] text-md mt-4 md:mt-9">
          {paragraph2first}
          <br />
          <span>{paragraph2second}</span>
        </p>
      </div>

      <div className="w-full flex justify-center items-center mb-10 md:mb-0">
        <Image
          className="w-full md:w-3/4"
          src={source}
          alt={alt}
          width={0}
          height={0}
        />
      </div>
    </div>
  );
}
