"use client";

import React, { createContext, useContext, useState } from "react";
import { translations, LangKey, TranslationKeys } from "@/data/translations";

interface LanguageContextType {
  lang: LangKey;
  setLang: (lang: LangKey) => void;
  t: (key: TranslationKeys) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangKey>("EN");

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
