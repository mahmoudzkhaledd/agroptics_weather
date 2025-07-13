import { ZodError } from "zod";

export function isValidDate(dateString?: string | null) {
  const dateObject = new Date(dateString ?? "invalid date");
  const valid =
    !isNaN(dateObject.getTime()) &&
    dateString === dateObject.toISOString().split("T")[0];
  return valid ? dateObject : null;
}
export function areDatesEqual(date1: Date, date2: Date) {
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  return day1 === day2 && month1 === month2 && year1 === year2;
}

export function toNumber(n: any) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0) ? parseFloat(n) : null;
}
export function toInt(n: any) {
  return !isNaN(parseInt(n)) && !isNaN(n - 0) ? parseInt(n) : null;
}
export async function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
export function getLastFriday(date: Date) {
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const daysUntilLastFriday = (dayOfWeek + 2) % 7; // 2 represents Friday
  const lastFriday = new Date(
    date.getTime() - daysUntilLastFriday * 24 * 60 * 60 * 1000
  );
  return lastFriday;
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
export function formatArabicDate(date: Date): string {
  var date = new Date("2016-12-04");
  var months = [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  var days = [
    "اﻷحد",
    "اﻷثنين",
    "الثلاثاء",
    "اﻷربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  var delDateString =
    days[date.getDay()] +
    ", " +
    date.getDate() +
    " " +
    months[date.getMonth()] +
    ", " +
    date.getFullYear();
  return delDateString;
}
export function isValidHexaCode(str: string) {
  let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  if (str == null) {
    return false;
  }
  return regex.test(str);
}

export function replaceVariables(inputString: string, replacementObject: any) {
  var regex = /{{(.*?)}}/g;
  var replacedString = inputString.replace(regex, function (match, p1) {
    var variableName = p1.trim();
    if (replacementObject.hasOwnProperty(variableName)) {
      return replacementObject[variableName];
    } else {
      return match;
    }
  });
  return replacedString;
}

export function extractKeys(inputString: string, safe = true) {
  var regex = /{{(.*?)}}/g;
  var keys = [];
  var match;
  while ((match = regex.exec(inputString)) !== null) {
    var key = match[1].trim();
    if (key != "") keys.push(key);
  }
  if (!safe) {
    const obj: any = {};
    for (const x of keys) {
      if (obj[x] == null) {
        obj[x] = true;
      } else {
        throw new Error(`${x} is declared twice in the schema!`);
      }
    }
  }
  return keys;
}

export function isValidCuid(cuidString: string) {
  const cuidRegex = /^c[a-z0-9]{24}$/;

  return cuidRegex.test(cuidString);
}
export function objectToQueryString(filter?: any) {
  if (filter == null) return "";
  return Object.keys(filter)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(filter[key])
    )
    .join("&");
}

export function extractError(ex: any): string {
  if (ex?.code == "P2002") {
    return `${ex.meta.target.join(".")} is already taken.`;
  }
  if (ex?.code == "P2025") {
    return ex.meta.cause;
  }
  if (ex.msg != null) {
    return ex.msg;
  }
  if (
    ex?.response?.data?.type ==
    "https://mailchimp.com/developer/marketing/docs/errors/"
  ) {
    return ex?.response?.data?.title;
  }

  if (ex instanceof ZodError && ex?.issues != null && ex?.issues.length != 0) {
    const err: any = ex.issues[0];
    return err.message;
    return `Expected ${err.expected} in ${err.path.join(".")} but received ${
      err.received
    }`;
  }
  if (ex instanceof Error && ex.message.startsWith("msg:")) {
    return ex.message.replace("msg:", "").trim();
  }
  return ex.message ?? "Unknown error occured, please try again later.";
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "");
}
