import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function toNumber(n: any) {
  const isNumeric = /^-?\d*\.?\d*$/.test(n); // Check for valid number patterns
  return isNumeric && !isNaN(parseFloat(n)) ? parseFloat(n) : null;
}
export function toInt(n: any) {
  if (n == null) return null;
  return !isNaN(parseInt(n)) && !isNaN(n - 0) ? parseInt(n) : null;
}
export function isUrlMatching(url: string, routes: Array<String>) {
  for (const pattern of routes) {
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(
      "^" + escapedPattern.replace(/:[^\s/]+/g, "([^/]+)") + "$"
    );
    if (regex.test(url)) return true;
  }
  return false;
}

export function toFixed2(num: number): number {
  return parseFloat(num.toFixed(2));
}
export function extractError(ex: any): string {
  if ((ex as Error).message == "NEXT_REDIRECT") {
    throw ex;
  }

  if (process.env.NODE_ENV == "development") console.log(ex);

  if (
    ex?.response?.data?.type ==
    "https://mailchimp.com/developer/marketing/docs/errors/"
  ) {
    return ex?.response?.data?.title;
  }

  if (ex instanceof ZodError && ex?.issues != null && ex?.issues.length != 0) {
    const err: any = ex.issues[0];
    return err.message;
  }
  if (ex instanceof Error && ex.message.startsWith("msg: ")) {
    return ex.message.replace("msg: ", "").trim();
  }
  return "Unknown error occured, please try again later.";
}
export function addDaysNumber(date: number, days: number) {
  return date + days * 24 * 60 * 60 * 1000;
}

export function daysBetween(date1: Date, date2: Date) {
  const date1Ms = new Date(date1).getTime();
  const date2Ms = new Date(date2).getTime();

  const differenceMs = Math.abs(date2Ms - date1Ms);

  return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
}
