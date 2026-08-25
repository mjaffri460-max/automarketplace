import { en } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";
import { zh } from "./zh";
import { ko } from "./ko";
import { hi } from "./hi";
import type { Messages } from "./types";

export const MESSAGES: Record<string, Messages> = { en, fr, ar, zh, ko, hi };
export type { Messages };
