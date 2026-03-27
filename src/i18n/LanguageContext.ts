import { createContext } from "react";
import { copy, type Locale } from "./copy";

export type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof copy)[Locale];
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
