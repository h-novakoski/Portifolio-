import { useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Locale } from "./copy";
import { LanguageContext, type LanguageContextValue } from "./LanguageContext";

function getInitialLocale(): Locale {
  const saved = window.localStorage.getItem("portfolio-locale");
  if (saved === "pt" || saved === "en") return saved;
  return "pt";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en-US";
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const setLocale = (newLocale: Locale) => setLocaleState(newLocale);
    const toggleLocale = () =>
      setLocaleState((current) => (current === "pt" ? "en" : "pt"));

    return {
      locale,
      setLocale,
      toggleLocale,
      t: copy[locale],
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
