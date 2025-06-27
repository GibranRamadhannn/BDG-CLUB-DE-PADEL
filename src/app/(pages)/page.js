"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { AuroraBackground } from "../components/ui/aurora-background";

export default function Home() {
  return (
    <section className="relative isolate min-h-screen font-[family-name:var(--font-montserrat)]">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Still warming up... big game comin’ soon
          </div>
          <Image
            src="/logo-3.png"
            alt="BDGCLUBDEPADEL Logo"
            width={400}
            height={0}
          />
        </motion.div>
      </AuroraBackground>
    </section>
  );
}
