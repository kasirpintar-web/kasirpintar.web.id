import React, { useState } from 'react';
import { Transaction, Store } from '../types';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { formatRupiah, formatDateAsiaJakarta } from '../utils/format';
import { generateReceiptJpg, downloadReceipt } from '../services/receipt';
import { Download, Check, Share2, ReceiptText } from 'lucide-react';

interface ReceiptPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  store: Store | null;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  isOpen,
  onClose,
  transaction,
  store,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!transaction) return null;

  const handleDownloadJpg = async () => {
    try {
      setIsGenerating(true);
      const { dataUrl } = await generateReceiptJpg(transaction, store);
      downloadReceipt(dataUrl, transaction.invoiceNumber);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate JPG receipt:', err);
      alert('Gagal membuat gambar struk. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareWhatsApp = () => {
    const itemsList = transaction.items
      .map((i) => `  ${i.name} (${i.quantity}x) = ${formatRupiah(i.subtotal)}`)
      .join('\n');

    const message =
      `*STRUK PEMBELIAN - ${store?.name || 'KASIR PINTAR'}*\n` +
      `No. Invoice: ${transaction.invoiceNumber}\n` +
      `Tanggal: ${formatDateAsiaJakarta(transaction.createdAt)}\n\n` +
      `*Daftar Belanja:*\n${itemsList}\n\n` +
      `*Total:* ${formatRupiah(transaction.total)}\n` +
      `*Bayar:* ${formatRupiah(transaction.payment)}\n` +
      `*Kembalian:* ${formatRupiah(transaction.change)}\n\n` +
      `${store?.receiptFooter || 'Terima kasih telah berbelanja!'}\n` +
      `_kasirpintar.web.id_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Struk Pembayaran" maxWidth="md">
      <div className="flex flex-col items-center">
        {/* Paper Receipt Simulation */}
        <div className="w-full max-w-sm bg-white border border-stone-200 rounded-xl p-5 shadow-xs font-mono text-xs text-stone-800 space-y-3">
          {/* Logo / Header */}
          <div className="text-center pb-2 border-b border-dashed border-stone-300">
            {store?.logoUrl ? (
              <img
                src={store.logoUrl}
                alt={store.name}
                className="h-12 mx-auto object-contain mb-2"
              />
            ) : (
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 text-[#4A2E18] flex items-center justify-center mb-1">
                <ReceiptText className="w-5 h-5" />
              </div>
            )}
            <h4 className="font-bold text-sm text-stone-900 uppercase">
              {store?.name || 'KASIR PINTAR'}
            </h4>
            {store?.address && <p className="text-stone-500 text-[11px]">{store.address}</p>}
            {(store?.phone || store?.email) && (
              <p className="text-stone-500 text-[11px]">
                {[store?.phone, store?.email].filter(Boolean).join('   ')}
              </p>
            )}
          </div>

          {/* Meta Info */}
          <div className="space-y-1 text-[11px] text-stone-600 pb-2 border-b border-dashed border-stone-300">
            <div className="flex justify-between">
              <span>Invoice:</span>
              <span className="font-bold text-stone-900">{transaction.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Waktu:</span>
              <span>{formatDateAsiaJakarta(transaction.createdAt)}</span>
            </div>
            {transaction.cashierName && (
              <div className="flex justify-between">
                <span>Kasir:</span>
                <span>{transaction.cashierName}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="space-y-2 py-1 border-b border-dashed border-stone-300">
            {transaction.items.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-medium text-stone-900">
                  <span className="truncate pr-2">{item.name}</span>
                  <span>{formatRupiah(item.subtotal)}</span>
                </div>
                <div className="text-stone-500 text-[10px]">
                  {item.quantity} x {formatRupiah(item.price)}
                </div>
              </div>
            ))}
          </div>

          {/* Calculation */}
          <div className="space-y-1.5 pt-1 text-[12px]">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{formatRupiah(transaction.subtotal)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-stone-900 pt-1 border-t border-stone-200">
              <span>TOTAL</span>
              <span>{formatRupiah(transaction.total)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Metode</span>
              <span className="font-bold">{transaction.paymentMethod === 'qris' ? 'QRIS' : 'CASH / TUNAI'}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Bayar</span>
              <span>{formatRupiah(transaction.payment)}</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-800">
              <span>Kembalian</span>
              <span>{formatRupiah(transaction.change)}</span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-3 border-t border-dashed border-stone-300 text-stone-500 text-[11px]">
            <p>{store?.receiptFooter || 'Terima kasih telah berbelanja'}</p>
            <p className="text-[10px] text-stone-400 mt-1">kasirpintar.web.id</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-5">
          <Button
            type="button"
            variant="primary"
            className="flex-1"
            onClick={handleDownloadJpg}
            isLoading={isGenerating}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 mr-2 text-emerald-800" />
                Tersimpan!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Struk JPG
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleShareWhatsApp}
          >
            <Share2 className="w-4 h-4 mr-2 text-emerald-600" />
            Kirim WhatsApp
          </Button>
        </div>
      </div>
    </Modal>
  );
};
