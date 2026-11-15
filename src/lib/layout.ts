export const HOME_HEADER_COMPACT_BREAKPOINT = 375;

export function isCompactHomeHeader(width: number): boolean {
  return width <= HOME_HEADER_COMPACT_BREAKPOINT;
}
