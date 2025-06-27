import Image from "next/image";

export default function ContactAnimation() {
  return (
    <div className="hidden lg:relative lg:block lg:w-[350px] lg:h-[350px] lg:mx-auto mt-6 lg:mt-0">
      {/* Circle Picture */}
      <div className="w-full h-full bg-white rounded-full shadow-md overflow-hidden z-10 relative">
        <Image
          src="/bdgclubdepadel-flag2.jpg"
          alt="BDGCLUBDEPADEL Flag"
          width={350}
          height={350}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Infinite Animation Text */}
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          animation: "spin 15s linear infinite",
        }}
      >
        <svg viewBox="0 0 360 360" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 180, 180 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
            />
          </defs>
          <text
            fill="black"
            fontSize="16"
            fontFamily="monospace"
            letterSpacing="2"
          >
            <textPath href="#circlePath" startOffset="0%" textLength="1005">
              BDG CLUB DE PADEL • BDG CLUB DE PADEL • BDG CLUB DE PADEL •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
