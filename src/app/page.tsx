"use client";

import { motion } from "framer-motion";
import { ArrowDown, Building2, Heart, Palette } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GeometricLines } from "@/components/ui/GeometricLines";
import { useRouter } from "next/navigation";

const cards = [
  {
    href: "/category/architecture",
    title: "Architecture",
    subtitle: "Spaces that inspire",
    icon: <Building2 className="h-10 w-10 text-dark" />,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800",
    accent: "bg-blue"
  },
  {
    href: "/category/art",
    title: "Art Projects",
    subtitle: "Creative expressions",
    icon: <Palette className="h-10 w-10 text-dark" />,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    accent: "bg-red"
  },
  {
    href: "/category/personal",
    title: "Personal",
    subtitle: "Passion projects",
    icon: <Heart className="h-10 w-10 text-white" />,
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800",
    accent: "bg-yellow"
  }
] as const;

export default function HomePage() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero: minimalist with geometric lines */}
      <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden pt-24">
        <GeometricLines variant="grid" animated className="opacity-40 dark:opacity-20" />
        <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 text-7xl font-extrabold tracking-tight md:text-[10rem]"
          >
            Portfolio.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-lg font-medium uppercase tracking-[0.3em] text-paper-text-muted dark:text-ink-text-muted md:text-xl"
          >
            ARCHITECT. INNOVATOR. ARTIST.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex items-center justify-center"
          >
            <button
              onClick={() => scrollToSection("about")}
              aria-label="Scroll to About section"
              className="group inline-flex items-center gap-2 rounded-full border border-paper-line px-4 py-2 text-sm transition-colors hover:bg-paper-surface dark:border-ink-line dark:hover:bg-ink-surface"
            >
              <ArrowDown className="h-4 w-4" />
              Scroll
            </button>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-0 scroll-mt-24">
        <div className="mx-auto max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-y border-paper-line bg-paper-surface px-8 py-20 dark:border-ink-line dark:bg-ink-surface"
          >
            <div className="mx-auto max-w-7xl">
              <div className="max-w-2xl">
                <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">About</h2>
                <div className="space-y-5 text-base leading-relaxed text-paper-text-muted dark:text-ink-text-muted">
                  <p>
                    I am an architectural designer who reads cities through their details—façades, joints, materials, and the quiet decisions that reveal a designer's intent. My work in urban rehabilitation, interior architecture, and community development has taught me that every drawing, every section, every BIM model carries a story waiting to be repaired or reimagined.
                  </p>
                  <p>
                    I design to mend what architecture leaves behind: the gaps in equity, the broken systems, the forgotten narratives. Through technical precision--site analysis, regulatory coordination, spatial programming, and digital visualization--I strive to guide each project toward clarity, dignity, and purpose.
                  </p>
                </div>
                
                <div className="mt-12 border-l-4 border-paper-line pl-6 italic text-paper-text dark:border-ink-line dark:text-ink-text">
                  <p className="mb-3 text-lg leading-relaxed">
                    "I believe architecture moves forward when we honor its past, study its details, and reshape its future with intention. That is the direction I design in."
                  </p>
                  <p className="text-sm font-medium uppercase tracking-wider text-paper-text-muted dark:text-ink-text-muted">
                    — Ananya Naik
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work grid */}
      <section id="work" className="relative py-28 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14 text-center text-3xl font-bold tracking-tight md:text-4xl"
          >
            Explore My Work
          </motion.h2>
        </div>
        <div className="flex flex-col">
          {cards.map((card, idx) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer border-b border-paper-line first:border-t dark:border-ink-line"
              onClick={() => router.push(card.href)}
            >
              <div className="relative flex items-center justify-center overflow-hidden bg-paper-surface transition-all duration-300 hover:brightness-90 dark:bg-ink-surface h-48 md:h-56">
                {/* Full background image */}
                <img
                  src={`${card.image}&auto=format&fit=crop&q=80`}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
                {/* Centered text */}
                <div className="relative z-10 text-center text-white">
                  <h3 className="mb-2 text-3xl font-bold uppercase tracking-tight md:text-4xl">{card.title}</h3>
                  <p className="text-sm uppercase tracking-[0.2em] opacity-90 md:text-base">{card.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative px-8 pb-32 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <GeometricLines variant="horizontal" animated className="opacity-40 dark:opacity-20" />
          <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Get in touch</h2>
              <p className="max-w-prose text-paper-text-muted dark:text-ink-text-muted">
                For collaborations, commissions, or portfolio inquiries.
              </p>
            </div>
            <div className="justify-self-start md:justify-self-end">
              <Button onClick={() => (window.location.href = "mailto:hello@example.com")}>
                Email Me
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

