"use client";

import ContactAnimation from "../../components/contactpage/animation";
import ContactContent from "../../components/contactpage/content";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between font-[family-name:var(--font-montserrat)] bg-silver-medal">
      {/* Title ::begin */}
      <div className="pt-36 mb-10 px-4">
        <h1 className="md:text-8xl text-4xl text-black font-bold font-[family-name:var(--font-roboto)]">
          JOIN OUR <span className="text-stoplight">SESSION</span>
        </h1>
      </div>
      {/* Title ::end */}

      {/* Content ::begin */}
      <div className="md:mb-22 md:flex md:flex-row md:justify-between md:items-center">
        {/* Contact Info ::begin */}
        <ContactContent />
        {/* Contact Info ::end */}

        {/* Animation ::begin */}
        <ContactAnimation />
        {/* Animation ::end */}
      </div>
      {/* Content ::end */}
    </div>
  );
}
