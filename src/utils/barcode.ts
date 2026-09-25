const L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const G = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
const R = ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];
const PARITY = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];

export function generateBarcodeValue(): string {
  const base = `20${Date.now().toString().slice(-10)}`.slice(0, 12);
  const digits = base.split('').map(Number);
  const sum = digits.reduce((s, d, i) => s + d * (i % 2 ? 3 : 1), 0);
  return base + String((10 - (sum % 10)) % 10);
}

export function normalizeBarcode(value: string): string {
  return value.replace(/\D/g, '').slice(0, 13);
}

export function ensureEan13(value: string): string {
  const clean = normalizeBarcode(value);
  if (clean.length === 13) return clean;
  if (clean.length !== 12) return generateBarcodeValue();
  const digits = clean.split('').map(Number);
  const sum = digits.reduce((s, d, i) => s + d * (i % 2 ? 3 : 1), 0);
  return clean + String((10 - (sum % 10)) % 10);
}

export function ean13Svg(value: string, width = 520, height = 190): string {
  let code = normalizeBarcode(value);
  if (code.length === 12) {
    const digits = code.split('').map(Number);
    const sum = digits.reduce((s, d, i) => s + d * (i % 2 ? 3 : 1), 0);
    code += String((10 - (sum % 10)) % 10);
  }
  if (code.length !== 13) code = generateBarcodeValue();
  const first = Number(code[0]);
  const parity = PARITY[first];
  let bits = '101';
  for (let i = 1; i <= 6; i++) bits += parity[i - 1] === 'L' ? L[Number(code[i])] : G[Number(code[i])];
  bits += '01010';
  for (let i = 7; i <= 12; i++) bits += R[Number(code[i])];
  bits += '101';
  const quiet = 26;
  const module = (width - quiet * 2) / bits.length;
  const bars = bits.split('').map((bit, i) => bit === '1'
    ? `<rect x="${(quiet + i * module).toFixed(2)}" y="12" width="${Math.max(module, .7).toFixed(2)}" height="${height - 54}" fill="#111827"/>` : '').join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="white"/>${bars}<text x="${width/2}" y="${height-15}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#111827">${code}</text></svg>`;
}
