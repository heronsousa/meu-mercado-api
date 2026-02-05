export function parseDate(dateStr: string): Date | null {
  const match = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})([+-]\d{2}:\d{2})/);

  if (!match) return new Date();

  const [_, dd, mm, yyyy, hh, min, ss, offset] = match;

  const iso = `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}${offset}`;

  return new Date(iso);
}