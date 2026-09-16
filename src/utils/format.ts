/**
 * Utilities for formatting Currency, Dates in Asia/Jakarta timezone, and Invoices.
 */

export function formatRupiah(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'Rp 0';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/\s+/g, ' ');
}

export function parseDate(val: any): Date {
  if (!val) return new Date();
  if (val instanceof Date) return val;
  if (typeof val.toDate === 'function') {
    return val.toDate();
  }
  if (val.seconds) {
    return new Date(val.seconds * 1000);
  }
  return new Date(val);
}

export function formatDateAsiaJakarta(val: any, includeTime = true): string {
  const d = parseDate(val);
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      ...(includeTime
        ? {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }
        : {}),
    };
    const formatted = new Intl.DateTimeFormat('id-ID', options).format(d);
    return includeTime ? `${formatted} WIB` : formatted;
  } catch {
    return d.toLocaleString('id-ID');
  }
}

export function formatDateShort(val: any): string {
  const d = parseDate(val);
  try {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  } catch {
    return d.toLocaleDateString();
  }
}

export function getJakartaDateParts(val: any = new Date()): { year: string; month: string; day: string } {
  const d = parseDate(val);
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.format(d).split('-'); // [YYYY, MM, DD]
  return {
    year: parts[0] || '2026',
    month: parts[1] || '09',
    day: parts[2] || '15',
  };
}

export function generateInvoiceNumber(): string {
  const { year, month, day } = getJakartaDateParts();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timeSuffix = Date.now().toString().slice(-3);
  return `INV-${year}${month}${day}-${randomSuffix.toString().slice(0, 2)}${timeSuffix.slice(0, 2)}`;
}
