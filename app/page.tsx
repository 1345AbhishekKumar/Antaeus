"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import Image from "next/image";

import { useTranslation } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

// Components
import Navbar from "@/components/Navbar";
import FullscreenMenu from "@/components/FullscreenMenu";
import KineticLine from "@/components/KineticLine";
import Marquee from "@/components/Marquee";
import AnimatedNumber from "@/components/AnimatedNumber";
import ExperimentalFleet from "@/components/ExperimentalFleet";
import ShutterGallery from "@/components/ShutterGallery";
import FloatingDestinations from "@/components/FloatingDestinations";
import EditorialGrid from "@/components/EditorialGrid";
import SpotlightSection from "@/components/SpotlightSection";
import LimitlessHorizon from "@/components/LimitlessHorizon";
import Footer from "@/components/Footer";

import {
  MagneticButton,
  RevealLine,
  RevealText,
  SectionHeader,
} from "@/components/UI";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { e: 35, s: "Years of expertise", suf: "+" },
  { e: 5, s: "Locations globally", suf: "" },
  { e: 97, s: "Retention rate", suf: "%" },
  { e: 280, s: "Corporate customers", suf: "+" },
];

const featureList = [
  "International physical office network",
  "24/7 support all year round",
  "Global availability & supplier management",
  "Tailor-made travel service",
  "Cost control management",
  "New digital travel management platform",
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AntaeusPage() {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [setListRef, listInView] = useInView({ threshold: 0.2 });

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const services = [
    {
      title: t("btn_marine"),
      image:
        "https://images.unsplash.com/photo-1518873890627-d4b177c06e51?auto=format&fit=crop&q=80&w=1000&h=1500",
    },
    {
      title: t("btn_corp"),
      image:
        "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000&h=1500",
    },
    {
      title: t("btn_leisure"),
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000&h=1500",
    },
  ];

  const technologies = [
    {
      title: "Digital Travel Management Platform",
      desc: "Find everything you need for your business trip in one place. Select the location, add travelers, ask for hotel or transfer quotations. Just as simple as that.",
    },
    {
      title: "Real-Time Communication",
      desc: "Antaeus travel advisors are omnipresent and always available to chat with you online, replying to your questions before, during or after your trip.",
    },
    {
      title: "Advanced Reporting Tool",
      desc: "You have access to accurate, transparent and fully consolidated data about your itineraries, thanks to our specialized reporting software.",
    },
  ];

  return (
    <div className="font-sans text-[#111] bg-white selection:bg-[#233C7F] selection:text-white min-h-screen flex flex-col overflow-x-hidden">
      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} />
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full min-h-[90vh] flex flex-col justify-between group/hero">
        {/* Kinetic headline */}
        <div className="relative z-10 select-none">
          <div className="text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter uppercase flex flex-col">
            <KineticLine text={t("hero_1")} delay={100} direction="left" />
            <KineticLine text={t("hero_2")} delay={300} direction="right" />
            <KineticLine text={t("hero_3")} delay={500} direction="left" />
            <KineticLine text={t("hero_4")} delay={700} direction="right" />
          </div>
        </div>

        {/* Hero bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pt-12 mt-auto relative">
          <div className="absolute top-0 left-0 w-full">
            <RevealLine />
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8 animate-[fadeIn_2s_ease-out_1.2s_both]">
            <MagneticButton href="#marine">{t("btn_marine")}</MagneticButton>
            <MagneticButton href="#corporate">{t("btn_corp")}</MagneticButton>
            <MagneticButton href="#leisure">{t("btn_leisure")}</MagneticButton>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 animate-[fadeIn_2s_ease-out_1.8s_both] text-xs font-bold tracking-[0.2em] uppercase text-black/40">
            <p className="mb-4 text-[#233C7F]">{t("hero_scroll")}</p>
            <div className="flex gap-8">
              {["ATHENS", "BASEL", "MIAMI"].map((city) => (
                <span
                  key={city}
                  className="hover:text-black hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center gap-1"
                >
                  {city} <ArrowUpRight size={12} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-20 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full"
      >
        <SectionHeader
          index="01"
          title={t("sec1_title")}
          subtitle={t("sec1_sub")}
          description="A family-run global travel management company with a 35-year long presence and expertise. Traveling to go higher."
        />
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-12 md:py-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full"
      >
        <div className="mb-12">
          <h2 className="text-sm font-semibold tracking-widest uppercase mb-12">
            <RevealText>{t("sec2_title")}</RevealText>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {/* Service list */}
          <div className="w-full md:w-1/2 flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 w-full">
              <RevealLine />
            </div>
            {services.map((svc, i) => (
              <div key={i} className="relative">
                <a
                  href="#"
                  className="group flex items-center justify-between py-8 md:py-12 transition-colors relative z-10"
                  onMouseEnter={() => setActiveServiceIdx(i)}
                >
                  <span
                    className={`text-3xl md:text-5xl font-bold tracking-tight uppercase transition-colors duration-500 ${
                      activeServiceIdx === i
                        ? "text-black"
                        : "text-black/30 group-hover:text-black/60"
                    }`}
                  >
                    {svc.title}
                  </span>
                  <ArrowUpRight
                    className={`transition-transform duration-500 ${
                      activeServiceIdx === i
                        ? "rotate-45 scale-110 text-black"
                        : "text-black/30"
                    }`}
                    size={32}
                  />
                </a>
                <div className="absolute bottom-0 left-0 w-full">
                  <RevealLine />
                </div>
              </div>
            ))}
          </div>

          {/* Service image */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] bg-gray-100 overflow-hidden group">
            {services.map((svc, i) => (
              <Image
                key={i}
                src={svc.image}
                alt={svc.title}
                fill
                className={`object-cover transition-all duration-[1200ms] ${
                  activeServiceIdx === i
                    ? "opacity-100 scale-100 group-hover:scale-105"
                    : "opacity-0 scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We Do It Better ───────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full bg-[#F9F9F9] mt-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left copy */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-8">
              <RevealText>{t("sec3_title1")}</RevealText>
              <br />
              <RevealText delay={100}>{t("sec3_title2")}</RevealText>
            </h2>
            <p className="text-lg text-black/60 font-serif leading-relaxed mb-12">
              <RevealText delay={200}>
                Antaeus Travel Group provides holistic travel services for
                almost any place in the world.
              </RevealText>
            </p>
            <MagneticButton href="#more">{t("btn_learn")}</MagneticButton>
          </div>

          {/* Right feature list */}
          <div className="w-full lg:w-2/3">
            <ul ref={setListRef} className="relative">
              <div className="absolute top-0 left-0 w-full">
                <RevealLine />
              </div>
              {featureList.map((item, i) => (
                <li
                  key={i}
                  className={`relative flex items-start gap-6 py-6 group overflow-hidden transition-all duration-700 ${
                    listInView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-12"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-sm font-mono text-black/40 mt-1.5 w-6">
                    0{i + 1}
                  </span>
                  <span className="text-xl md:text-2xl font-medium tracking-tight uppercase group-hover:text-[#233C7F] transition-all duration-300">
                    {item}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 origin-left scale-x-100" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Why Antaeus (Stats) ───────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <SectionHeader
          index="02"
          title={t("sec4_title")}
          subtitle={t("sec4_sub")}
          description="Sit back & relax; Antaeus will do the rest."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mt-16 relative">
          <div className="absolute top-0 left-0 w-full">
            <RevealLine />
          </div>
          {stats.map((st, i) => (
            <div key={i} className="flex flex-col pl-4 pt-8 relative group">
              <span className="absolute left-0 top-0 w-[1px] h-full bg-black/20 group-hover:bg-[#233C7F] transition-colors" />
              <span className="text-6xl md:text-8xl font-bold tracking-tighter mb-2 group-hover:-translate-y-2 transition-transform duration-500">
                <AnimatedNumber end={st.e} suffix={st.suf} />
              </span>
              <span className="text-sm font-semibold tracking-widest uppercase text-black/60">
                {st.s}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Technology ────────────────────────────────────────────────────── */}
      <section
        id="technology"
        className="py-20 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full"
      >
        <SectionHeader
          index="03"
          title={t("sec5_title")}
          subtitle={t("sec5_sub")}
          description="Tech enthusiasts bringing travel coordinators and advisors together."
        />

        <div className="flex flex-col lg:flex-row gap-16 mt-12">
          {/* Animated orb */}
          <div className="w-full lg:w-1/3 flex items-center justify-center bg-[#F9F9F9] p-12 overflow-hidden group">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-[#233C7F]/20 rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite]">
                <div className="w-24 h-24 border-2 border-dashed border-[#233C7F]/40 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
              </div>
              <div className="absolute w-12 h-12 bg-[#233C7F] rounded-full animate-[pulse_3s_infinite]" />
            </div>
          </div>

          {/* Accordion */}
          <div className="w-full lg:w-2/3 relative">
            <div className="absolute top-0 left-0 w-full">
              <RevealLine />
            </div>
            {technologies.map((tech, i) => (
              <div key={i} className="relative">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === i ? null : i)
                  }
                  className="w-full flex items-center justify-between py-8 text-left hover:text-[#233C7F] transition-colors group z-10 relative"
                >
                  <span className="text-xl md:text-2xl font-bold tracking-tight uppercase pr-8 group-hover:translate-x-2 transition-transform">
                    {tech.title}
                  </span>
                  <span
                    className={`p-2 border rounded-full bg-white transition-all duration-500 ${
                      activeAccordion === i
                        ? "rotate-180 border-[#233C7F] text-[#233C7F]"
                        : ""
                    }`}
                  >
                    {activeAccordion === i ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-700 ${
                    activeAccordion === i
                      ? "max-h-96 opacity-100 pb-8"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-black/60 font-serif text-lg leading-relaxed max-w-2xl">
                    {tech.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full">
                  <RevealLine />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet ─────────────────────────────────────────────────────────── */}
      <ExperimentalFleet />

      {/* ── Experimental Sections ─────────────────────────────────────────── */}
      <div id="more">
        <ShutterGallery />
        <FloatingDestinations />
        <EditorialGrid />
        <SpotlightSection />
        <LimitlessHorizon />
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
