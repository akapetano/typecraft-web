import { Time } from "@/constants/time";

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}

export function setCookie(
  name: string,
  value: string,
  time: number = Time.YEARS_1,
) {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + time);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}
