"use client";

import { useTranslation } from "@/context/LanguageContext";
import { MagneticButton, RevealText } from "@/components/UI";

const quickLinks = [
  { label: "Who we are", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "The Fleet", href: "#explore" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      id="contact"
      className="bg-[#111] text-white pt-24 pb-12 px-6 md:px-12 mt-auto relative overflow-hidden scroll-mt-24"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-[50%] -right-[10%] w-[100vw] h-[100vw] rounded-full bg-[#1a1a1a] pointer-events-none opacity-50 blur-3xl"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between border-b border-white/20 pb-16 mb-16 gap-12">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight uppercase mb-8">
              <RevealText>Antaeus Travel</RevealText>
              <br />
              <RevealText delay={60}>Group</RevealText>
            </h3>
            <p className="text-white/60 max-w-sm mb-8">
              Global travel management since 1989.
            </p>
            <MagneticButton href="#contact" theme="dark">
              {t("btn_contact")}
            </MagneticButton>
          </div>

          <div className="flex flex-wrap gap-16 md:gap-24">
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-6 text-white/40">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-white text-white/60 text-sm uppercase flex items-center gap-2 group transition-colors duration-150"
                    >
                      <span className="w-4 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-6 text-white/40">
                Socials
              </h4>
              <ul className="space-y-4">
                {["LinkedIn", "Instagram", "Facebook"].map((l) => (
                  <li key={l}>
                    <a
                      href="#contact"
                      className="hover:text-white text-white/60 text-sm uppercase flex items-center gap-2 group transition-colors duration-150"
                    >
                      <span className="w-4 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40 font-semibold tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Antaeus Travel Group. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#contact" className="hover:text-white transition-colors duration-150">Terms</a>
            <a href="#contact" className="hover:text-white transition-colors duration-150">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
