"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, LangKey, TranslationKeys } from "@/data/translations";

interface LanguageContextType {
  lang: LangKey;
  setLang: (lang: LangKey) => void;
  t: (key: TranslationKeys) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

const htmlLang: Record<LangKey, string> = {
  EN: "en",
  ES: "es",
  FR: "fr",
  GR: "el",
  CH: "de",
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangKey>("EN");

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang];
  }, [lang]);

  const t = (key: TranslationKeys): string =>
    translations[lang]?.[key] || translations["EN"][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
