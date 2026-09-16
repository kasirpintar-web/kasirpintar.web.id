import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTransactions, cancelTransaction } from '../../firebase/db';
import { Transaction } from '../../types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { Loading } from '../../components/ui/Loading';
import { EmptyState } from '../../components/ui/EmptyState';
import { ReceiptPreview } from '../../components/ReceiptPreview';
import { FirestorePermissionBanner } from '../../components/common/FirestorePermissionBanner';
import { isFirestorePermissionError } from '../../firebase/errors';
import { formatRupiah, formatDateAsiaJakarta } from '../../utils/format';
import {
  Search,
  Receipt,
  Eye,
  XCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { store } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  // Receipt Modal
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  // Cancellation Modal
  const [txToCancel, setTxToCancel] = useState<Transaction | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, [store]);

  const loadTransactions = async () => {
    if (!store) return;
    try {
      setLoading(true);
      setPermissionError(null);
      const list = await getTransactions(store.id, 100);
      setTransactions(list);
    } catch (err: any) {
      console.error('Failed to load transactions:', err);
      if (isFirestorePermissionError(err)) {
        setPermissionError('Missing or insufficient permissions');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.cashierName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  const handleOpenReceipt = (tx: Transaction) => {
    setSelectedTx(tx);
    setReceiptModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!store || !txToCancel) return;
    try {
      setIsCancelling(true);
      await cancelTransaction(store.id, txToCancel.id, cancelReason || 'Dibatalkan oleh kasir');
      await loadTransactions();
      setCancelModalOpen(false);
      setTxToCancel(null);
      setCancelReason('');
    } catch (err: any) {
      alert(err.message || 'Gagal membatalkan transaksi');
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return <Loading message="Memuat riwayat transaksi toko..." />;
  }

  return (
    <div className="space-y-6">
      {/* Permission Error Banner */}
      {permissionError && (
        <FirestorePermissionBanner
          errorDetails={permissionError}
          onRetry={loadTransactions}
        />
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Riwayat Transaksi Penjualan</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi kasir
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari no. invoice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/20 focus:border-[#4A2E18]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 font-semibold whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full sm:w-auto text-xs py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-800 focus:outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="completed">Selesai (Completed)</option>
            <option value="cancelled">Dibatalkan (Cancelled)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredTransactions.length === 0 ? (
        <EmptyState
          icon={<Receipt className="w-8 h-8" />}
          title="Tidak ada transaksi"
          description={
            searchQuery
              ? `Tidak ditemukan transaksi dengan no. invoice "${searchQuery}".`
              : 'Belum ada data transaksi yang tercatat. Buka menu Kasir POS untuk mulai berjualan.'
          }
        />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Invoice</th>
                  <th className="py-3 px-4">Waktu (Asia/Jakarta)</th>
                  <th className="py-3 px-4">Kasir</th>
                  <th className="py-3 px-4">Jumlah Item</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {tx.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      {formatDateAsiaJakarta(tx.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-stone-700 font-medium">
                      {tx.cashierName || 'Kasir'}
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      {tx.items.reduce((s, i) => s + i.quantity, 0)} item
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      {formatRupiah(tx.total)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={tx.status === 'completed' ? 'success' : 'danger'}
                        size="sm"
                      >
                        {tx.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleOpenReceipt(tx)}
                        title="Lihat Struk JPG"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Struk
                      </Button>
                      {tx.status === 'completed' && (
                        <button
                          type="button"
                          onClick={() => {
                            setTxToCancel(tx);
                            setCancelReason('');
                            setCancelModalOpen(true);
                          }}
                          className="px-2 py-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                          title="Batalkan Transaksi & Kembalikan Stok"
                        >
                          <XCircle className="w-3.5 h-3.5 inline mr-1" />
                          Batal
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Struk Modal */}
      <ReceiptPreview
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        transaction={selectedTx}
        store={store}
      />

      {/* Cancel Transaction Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Batalkan Transaksi Penjualan"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Perhatian: Pemulihan Stok
            </p>
            <p>
              Membatalkan invoice <strong>{txToCancel?.invoiceNumber}</strong> akan secara otomatis mengembalikan
              stok seluruh produk terkait ke database toko.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700">
              Alasan Pembatalan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Salah input pesanan / pelanggan batal"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setCancelModalOpen(false)}
            >
              Kembali
            </Button>
            <Button
              type="button"
              variant="danger"
              className="flex-1"
              isLoading={isCancelling}
              onClick={handleConfirmCancel}
            >
              Ya, Batalkan Nota
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
