export interface SupportedLanguage {
  code: string;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  { code: "zh", label: "Chinese", nativeLabel: "中文", dir: "ltr" },
  { code: "ko", label: "Korean", nativeLabel: "한국어", dir: "ltr" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", dir: "ltr" },
];

export const DEFAULT_LANGUAGE = "en";
