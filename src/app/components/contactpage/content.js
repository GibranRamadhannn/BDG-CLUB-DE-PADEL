import Image from "next/image";

export default function ContactContent() {
  return (
    <div className="md:px-10 px-4 grid grid-cols-1 gap-2 mb-6">
      {/* Instagram */}
      <div className="flex justify-start items-center md:p-2 gap-4">
        <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] relative">
          <Image
            src="/instagram.svg"
            alt="Instagram Icon"
            fill
            className="object-contain"
            priority
          />
        </div>
        <a
          href="https://www.instagram.com/bdg.clubdepadel"
          className="md:text-4xl text-xl font-medium font-[family-name:var(--font-geist-mono)] text-black hover:text-stoplight/80"
        >
          @bdg.clubdepadel
        </a>
      </div>
      {/* Reclub */}
      <div className="flex justify-start items-center md:p-2 gap-4">
        <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] relative">
          <Image
            src="/reclub-logo.svg"
            alt="Reclub Icon"
            fill
            className="object-contain dark:invert"
            priority
          />
        </div>
        <a
          href="https://reclub.co/clubs/@bdgclubdepadel"
          className="md:text-4xl text-xl font-medium font-[family-name:var(--font-geist-mono)] text-black hover:text-stoplight/80"
        >
          @bdgclubdepadel
        </a>
      </div>
      {/* Whatsapp */}
      <div className="flex justify-start items-center md:p-2 gap-4">
        <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] relative">
          <Image
            src="/whatsapp.svg"
            alt="Whatsapp Icon"
            fill
            className="object-contain"
            priority
          />
        </div>
        <a
          href="https://api.whatsapp.com/send/?phone=%2B6285223394998&text&type=phone_number&app_absent=0"
          className="md:text-4xl text-xl font-medium font-[family-name:var(--font-geist-mono)] text-black hover:text-stoplight/80"
        >
          BCDP Whatsapp
        </a>
      </div>
      {/* Location */}
      <div className="flex justify-start items-center md:p-2 gap-4">
        <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] relative">
          <Image
            src="/pin.svg"
            alt="Location Pin Icon"
            fill
            className="object-contain"
            priority
          />
        </div>
        <a
          href="https://maps.app.goo.gl/mN6c5XGrEgS4BcgcA"
          className="md:text-4xl text-xl font-medium font-[family-name:var(--font-geist-mono)] text-black hover:text-stoplight/80"
        >
          Bandung, West Java, Indonesia
        </a>
      </div>
    </div>
  );
}
