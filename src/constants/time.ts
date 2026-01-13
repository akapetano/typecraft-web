/**
 * Time constants in milliseconds
 * Provides a simple and expressive way to define time durations
 *
 * @example
 * // Simple usage
 * staleTime: Time.MINUTES_5
 *
 * @example
 * // Composable usage
 * staleTime: Time.MINUTES * 5
 * gcTime: Time.HOURS * 2
 */

// Define base units first
const SECOND = 1000 as const;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365 * DAY;

export const Time = {
  // Base units
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
  YEAR,

  // Plural aliases for readability
  SECONDS: SECOND,
  MINUTES: MINUTE,
  HOURS: HOUR,
  DAYS: DAY,
  WEEKS: WEEK,
  YEARS: YEAR,

  // Common durations - Seconds
  SECONDS_5: 5 * SECOND,
  SECONDS_10: 10 * SECOND,
  SECONDS_15: 15 * SECOND,
  SECONDS_30: 30 * SECOND,
  SECONDS_45: 45 * SECOND,

  // Common durations - Minutes
  MINUTES_1: MINUTE,
  MINUTES_2: 2 * MINUTE,
  MINUTES_5: 5 * MINUTE,
  MINUTES_10: 10 * MINUTE,
  MINUTES_15: 15 * MINUTE,
  MINUTES_30: 30 * MINUTE,

  // Common durations - Hours
  HOURS_1: HOUR,
  HOURS_2: 2 * HOUR,
  HOURS_6: 6 * HOUR,
  HOURS_12: 12 * HOUR,
  HOURS_24: 24 * HOUR,

  // Common durations - Days
  DAYS_1: DAY,
  DAYS_7: 7 * DAY,
  DAYS_30: 30 * DAY,

  // Common durations - Weeks
  WEEKS_1: WEEK,
  WEEKS_4: 4 * WEEK,
  WEEKS_8: 8 * WEEK,
  WEEKS_12: 12 * WEEK,
  WEEKS_16: 16 * WEEK,
  WEEKS_20: 20 * WEEK,
  WEEKS_24: 24 * WEEK,
  WEEKS_28: 28 * WEEK,

  // Common durations - Months (approximate)
  MONTHS_1: 30 * DAY,
  MONTHS_3: 90 * DAY,
  MONTHS_6: 180 * DAY,

  // Common durations - Years
  YEARS_1: YEAR,

  // Special values
  NEVER: Infinity,
  IMMEDIATE: 0,
  NOW: 0,
  STALE: -1,
} as const;

// Type helper for time values
export type TimeValue = (typeof Time)[keyof typeof Time];

// Helper functions for custom durations
export const time = {
  seconds: (n: number) => n * SECOND,
  minutes: (n: number) => n * MINUTE,
  hours: (n: number) => n * HOUR,
  days: (n: number) => n * DAY,
  weeks: (n: number) => n * WEEK,
} as const;

// Helper to format milliseconds to human-readable
export const formatTime = (ms: number): string => {
  if (ms >= YEAR) return `${Math.floor(ms / YEAR)}y`;
  if (ms >= WEEK) return `${Math.floor(ms / WEEK)}w`;
  if (ms >= DAY) return `${Math.floor(ms / DAY)}d`;
  if (ms >= HOUR) return `${Math.floor(ms / HOUR)}h`;
  if (ms >= MINUTE) return `${Math.floor(ms / MINUTE)}m`;
  if (ms >= SECOND) return `${Math.floor(ms / SECOND)}s`;
  return `${ms}ms`;
};
