import { Store, Transaction } from '../types';
import { formatRupiah, formatDateAsiaJakarta } from '../utils/format';

/**
 * Generates a crisp, authentic POS thermal receipt image (JPG)
 * using HTML5 Canvas API, ensuring no browser screenshot glitches.
 */
export async function generateReceiptJpg(
  transaction: Transaction,
  store: Store | null
): Promise<{ dataUrl: string; blob: Blob }> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  const width = 560; // Clean thermal receipt width
  const padding = 36;

  // Pre-calculate height
  let estimatedHeight = 220; // Header & store info
  if (store?.logoUrl) estimatedHeight += 80;
  estimatedHeight += 90; // Invoice & date section
  estimatedHeight += transaction.items.length * 48; // Items
  estimatedHeight += 160; // Subtotal, total, payment, change
  estimatedHeight += 120; // Footer & barcode decoration

  canvas.width = width;
  canvas.height = estimatedHeight;

  // Background: clean crisp off-white receipt paper
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, estimatedHeight);

  // Subtle receipt border
  ctx.strokeStyle = '#E7E5E4';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 8, width - 16, estimatedHeight - 16);

  let y = padding + 10;

  // Load and draw store logo if present
  if (store?.logoUrl) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // continue gracefully without crashing if image fails
        img.src = store.logoUrl!;
      });
      if (img.width && img.height) {
        const logoMaxH = 64;
        const scale = Math.min(180 / img.width, logoMaxH / img.height, 1);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        ctx.drawImage(img, (width - drawW) / 2, y, drawW, drawH);
        y += drawH + 16;
      }
    } catch (e) {
      console.warn('Could not render store logo on receipt:', e);
    }
  }

  // Store Name
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  const storeName = store?.name || 'KASIR PINTAR UMKM';
  ctx.fillText(storeName.toUpperCase(), width / 2, y);
  y += 24;

  // Store details
  ctx.fillStyle = '#57534E';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  if (store?.address) {
    ctx.fillText(store.address, width / 2, y);
    y += 18;
  }
  if (store?.phone || store?.email) {
    const contactLine = [store?.phone, store?.email].filter(Boolean).join('   ');
    ctx.fillText(contactLine, width / 2, y);
    y += 18;
  }

  y += 8;

  // Divider line
  function drawDashedLine(currentY: number) {
    if (!ctx) return;
    ctx.strokeStyle = '#A8A29E';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, currentY);
    ctx.lineTo(width - padding, currentY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawDashedLine(y);
  y += 20;

  // Invoice & Date
  ctx.textAlign = 'left';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#44403C';
  ctx.fillText(`No. Invoice:`, padding, y);
  ctx.textAlign = 'right';
  ctx.font = 'bold 14px "Plus Jakarta Sans", monospace';
  ctx.fillStyle = '#1C1917';
  ctx.fillText(transaction.invoiceNumber, width - padding, y);
  y += 20;

  ctx.textAlign = 'left';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#44403C';
  ctx.fillText(`Waktu:`, padding, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatDateAsiaJakarta(transaction.createdAt), width - padding, y);
  y += 20;

  if (transaction.cashierName) {
    ctx.textAlign = 'left';
    ctx.fillText(`Kasir:`, padding, y);
    ctx.textAlign = 'right';
    ctx.fillText(transaction.cashierName, width - padding, y);
    y += 20;
  }

  y += 4;
  drawDashedLine(y);
  y += 22;

  // Item List Headers
  ctx.textAlign = 'left';
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#1C1917';
  ctx.fillText('ITEM / DETAIL', padding, y);
  ctx.textAlign = 'right';
  ctx.fillText('TOTAL', width - padding, y);
  y += 18;

  // Items
  for (const item of transaction.items) {
    ctx.textAlign = 'left';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#1C1917';
    let displayName = item.name;
    if (displayName.length > 32) displayName = displayName.slice(0, 30) + '...';
    ctx.fillText(displayName, padding, y);

    ctx.textAlign = 'right';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(formatRupiah(item.subtotal), width - padding, y);
    y += 18;

    ctx.textAlign = 'left';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#78716C';
    ctx.fillText(`${item.quantity} x ${formatRupiah(item.price)}`, padding, y);
    y += 22;
  }

  y += 4;
  drawDashedLine(y);
  y += 24;

  // Subtotal & Totals
  ctx.textAlign = 'left';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#44403C';
  ctx.fillText('Subtotal', padding, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatRupiah(transaction.subtotal), width - padding, y);
  y += 24;

  ctx.textAlign = 'left';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#1C1917';
  ctx.fillText('TOTAL', padding, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatRupiah(transaction.total), width - padding, y);
  y += 26;

  ctx.textAlign = 'left';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#44403C';
  ctx.fillText('Bayar (Tunai/QRIS)', padding, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatRupiah(transaction.payment), width - padding, y);
  y += 22;

  ctx.textAlign = 'left';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#292524';
  ctx.fillText('Kembalian', padding, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatRupiah(transaction.change), width - padding, y);
  y += 24;

  drawDashedLine(y);
  y += 24;

  // Receipt Footer
  ctx.textAlign = 'center';
  ctx.font = 'italic 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#57534E';
  const footerText = store?.receiptFooter || 'Terima kasih telah berbelanja';
  ctx.fillText(footerText, width / 2, y);
  y += 22;

  ctx.font = '11px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#A8A29E';
  ctx.fillText('Didukung oleh Kasir Pintar   kasirpintar.web.id', width / 2, y);

  const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else resolve(new Blob());
      },
      'image/jpeg',
      0.95
    );
  });

  return { dataUrl, blob };
}

export function downloadReceipt(dataUrl: string, invoiceNumber: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `struk-${invoiceNumber}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
