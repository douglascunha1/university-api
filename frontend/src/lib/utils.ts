export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(value?: string | null) {
  if (!value) return "-";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsed);
}

export function formatDateTime(value?: string | null) {
  if (!value) return "-";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
}

export function formatPhone(value?: string | null) {
  if (!value) return "-";
  const digits = String(value).replace(/\D/g, "");
  if (digits.length === 11) {
    // (XX) XXXXX-XXXX
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (digits.length === 10) {
    // (XX) XXXX-XXXX
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  // Fallback: group last 4 digits
  return digits.replace(/(\d+)(\d{4})$/, "$1-$2");
}

export function formatSexo(value?: string | null) {
  if (!value) return "-";
  const v = String(value).trim().toLowerCase();
  if (v === "m") return "Masculino";
  if (v === "f") return "Feminino";
  if (v === "o") return "Outro";
  return titleCase(v);
}

export function formatEstadoCivil(value?: string | null) {
  if (!value) return "-";
  const v = String(value).trim().toLowerCase();
  if (v === "s") return "Solteiro(a)";
  if (v === "c") return "Casado(a)";
  if (v === "d") return "Divorciado(a)";
  if (v === "v") return "Viúvo(a)";
  return titleCase(v);
}

export function formatNumber(value?: number | string | null) {
  if (value === null || value === undefined || value === "") return "-";
  const numberValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numberValue)) return String(value);
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export function titleCase(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
}