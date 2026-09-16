import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getTransactions, getProducts } from '../../firebase/db';
import { Transaction, Product } from '../../types';
import { StatsCard } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Loading } from '../../components/ui/Loading';
import { ReceiptPreview } from '../../components/ReceiptPreview';
import { FirestorePermissionBanner } from '../../components/common/FirestorePermissionBanner';
import { isFirestorePermissionError } from '../../firebase/errors';
import { formatRupiah, formatDateAsiaJakarta } from '../../utils/format';
import {
  Calculator,
  Package,
  Receipt,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Eye,
  Plus,
} from 'lucide-react';

export const DashboardOverviewPage: React.FC = () => {
  const { store, userProfile, currentUser, ensureStoreProvisioned } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todaySales, setTodaySales] = useState(0);
  const [todayTxCount, setTodayTxCount] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  // Struk modal
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    let currentStore = store;
    if (!currentStore && currentUser) {
      currentStore = await ensureStoreProvisioned();
    }
    if (!currentStore) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setPermissionError(null);
      const [txList, prodList] = await Promise.all([
        getTransactions(currentStore.id, 50),
        getProducts(currentStore.id),
      ]);

      // Calculate today's sales (Asia/Jakarta)
      const now = new Date();
      const todayYear = now.getFullYear();
      const todayMonth = now.getMonth();
      const todayDate = now.getDate();

      let salesSum = 0;
      let countSum = 0;

      txList.forEach((tx) => {
        if (tx.status === 'completed') {
          const txDate = tx.createdAt ? tx.createdAt.toDate() : new Date();
          if (
            txDate.getFullYear() === todayYear &&
            txDate.getMonth() === todayMonth &&
            txDate.getDate() === todayDate
          ) {
            salesSum += tx.total;
            countSum += 1;
          }
        }
      });

      setTodaySales(salesSum);
      setTodayTxCount(countSum);
      setRecentTransactions(txList.slice(0, 5));
      setProducts(prodList);
      setLowStockProducts(prodList.filter((p) => p.stock <= 5 && p.isActive));
    } catch (err: any) {
      console.error('Failed to load dashboard overview data:', err);
      if (isFirestorePermissionError(err)) {
        setPermissionError('Missing or insufficient permissions');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [store, currentUser]);

  if (loading) {
    return <Loading message="Memuat ringkasan toko..." />;
  }

  const handleOpenReceipt = (tx: Transaction) => {
    setSelectedTx(tx);
    setReceiptModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Permission Error Banner if Security Rules are not yet updated in Firebase Console */}
      {permissionError && (
        <FirestorePermissionBanner
          errorDetails={permissionError}
          onRetry={loadDashboardData}
        />
      )}

      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Selamat Datang Kembali
          </span>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-0.5">
            {store?.name || 'Toko Kasir Pintar'}
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Masuk sebagai <span className="font-semibold text-stone-800">{userProfile?.name}</span>{' '}
            (Owner). Siap melayani pelanggan hari ini?
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/dashboard/kasir">
            <Button variant="primary" size="md" className="gap-2 shadow-xs">
              <Calculator className="w-4 h-4" />
              Buka Mesin Kasir
            </Button>
          </Link>
          <Link to="/dashboard/products">
            <Button variant="outline" size="md" className="gap-2">
              <Plus className="w-4 h-4" />
              Kelola Produk
            </Button>
          </Link>
        </div>
      </div>

      {/* Low stock warning banner if any */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-200 text-amber-900 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <p className="font-bold text-amber-950">
              Perhatian: {lowStockProducts.length} Produk Menipis (Stok ≤ 5)
            </p>
            <p className="text-amber-800 mt-0.5">
              {lowStockProducts.map((p) => `${p.name} (${p.stock})`).join(', ')}.
            </p>
          </div>
          <Link to="/dashboard/products">
            <Button size="xs" variant="outline" className="text-amber-900 border-amber-300">
              Update Stok
            </Button>
          </Link>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Penjualan Hari Ini"
          value={formatRupiah(todaySales)}
          subtitle="Total omset transaksi selesai"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatsCard
          title="Transaksi Hari Ini"
          value={`${todayTxCount} Nota`}
          subtitle="Pelanggan terlayani hari ini"
          icon={<Receipt className="w-5 h-5" />}
        />
        <StatsCard
          title="Total Produk Aktif"
          value={`${products.filter((p) => p.isActive).length} Item`}
          subtitle="Katalog siap dijual di kasir"
          icon={<Package className="w-5 h-5" />}
        />
        <StatsCard
          title="Perhatian Stok"
          value={`${lowStockProducts.length} Item`}
          subtitle="Stok menipis atau kosong"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      {/* Recent Transactions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Transactions (8 cols) */}
        <div className="lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Transaksi Terbaru</h3>
                <p className="text-xs text-stone-500">5 transaksi kasir terakhir toko Anda</p>
              </div>
              <Link to="/dashboard/transactions">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-stone-600">
                  Lihat Semua <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            {recentTransactions.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                Belum ada transaksi penjualan tercatat. Mulai layani pesanan di menu Kasir POS!
              </div>
            ) : (
              <div className="divide-y divide-stone-100 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-stone-500 border-b border-stone-100">
                      <th className="pb-2 font-semibold">Invoice</th>
                      <th className="pb-2 font-semibold">Waktu</th>
                      <th className="pb-2 font-semibold">Total</th>
                      <th className="pb-2 font-semibold">Status</th>
                      <th className="pb-2 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 font-mono font-bold text-stone-900">
                          {tx.invoiceNumber}
                        </td>
                        <td className="py-3 text-stone-500">
                          {formatDateAsiaJakarta(tx.createdAt)}
                        </td>
                        <td className="py-3 font-bold text-stone-900">
                          {formatRupiah(tx.total)}
                        </td>
                        <td className="py-3">
                          <Badge
                            variant={tx.status === 'completed' ? 'success' : 'danger'}
                            size="sm"
                          >
                            {tx.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => handleOpenReceipt(tx)}
                            title="Lihat & Cetak Struk JPG"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            Struk
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Help & Guidance (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <h3 className="text-sm font-bold text-stone-900 mb-2">Panduan Kasir Cepat</h3>
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-[#4A2E18] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <p>
                  Tambahkan produk tokomu di menu <strong>Produk & Stok</strong>.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-[#4A2E18] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <p>
                  Buka menu <strong>Kasir POS</strong>, pilih produk pesanan pelanggan.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-[#4A2E18] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <p>
                  Masukkan nominal bayar, sistem akan menghitung kembalian dan stok berkurang.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-[#4A2E18] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  4
                </span>
                <p>
                  Download struk gambar format JPG atau langsung kirimkan rincian via WhatsApp.
                </p>
              </div>
            </div>
          </Card>

          <div className="p-4 rounded-3xl bg-linear-to-br from-[#4A2E18] to-stone-900 text-white space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE404]">
              Kasir Pintar Dukungan
            </span>
            <h4 className="text-sm font-bold">Butuh Bantuan Setting Toko?</h4>
            <p className="text-xs text-stone-300 leading-normal">
              Tim support Kasir Pintar siap mendampingi pengaturan tokomu via WhatsApp.
            </p>
            <a
              href="https://wa.me/6282379474173"
              target="_blank"
              rel="noreferrer"
              className="inline-block pt-1"
            >
              <Button size="xs" variant="primary" className="font-bold text-xs">
                Hubungi WA: 082379474173
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Struk Preview Modal */}
      <ReceiptPreview
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        transaction={selectedTx}
        store={store}
      />
    </div>
  );
};
