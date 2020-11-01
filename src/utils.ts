export function hoursAgoFromDate(dateTime: number): number {
  return new Date(Date.now() - dateTime * 1000).getHours();
}
