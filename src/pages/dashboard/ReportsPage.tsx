import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTransactions } from '../../firebase/db';
import { Transaction } from '../../types';
import { StatsCard } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import { FirestorePermissionBanner } from '../../components/common/FirestorePermissionBanner';
import { isFirestorePermissionError } from '../../firebase/errors';
import { formatRupiah } from '../../utils/format';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  Receipt,
  DollarSign,
  Package,
  Calendar,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { store } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'all'>('7d');
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const load = async () => {
    if (!store) return;
    try {
      setLoading(true);
      setPermissionError(null);
      const list = await getTransactions(store.id, 200);
      setTransactions(list);
    } catch (err: any) {
      console.error('Failed to load transactions for report:', err);
      if (isFirestorePermissionError(err)) {
        setPermissionError('Missing or insufficient permissions');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [store]);

  // Calculations based on completed transactions
  const completedTx = useMemo(() => {
    return transactions.filter((tx) => tx.status === 'completed');
  }, [transactions]);

  // Financial metrics
  const totalRevenue = useMemo(() => {
    return completedTx.reduce((sum, tx) => sum + tx.total, 0);
  }, [completedTx]);

  const cashRevenue = useMemo(() => completedTx.filter((tx) => tx.paymentMethod === 'cash' || !tx.paymentMethod).reduce((sum, tx) => sum + tx.total, 0), [completedTx]);
  const qrisRevenue = useMemo(() => completedTx.filter((tx) => tx.paymentMethod === 'qris').reduce((sum, tx) => sum + tx.total, 0), [completedTx]);

  const totalCost = useMemo(() => {
    return completedTx.reduce((sum, tx) => {
      const txCost = tx.items.reduce((itemSum, item) => {
        const cost = item.costPrice || 0;
        return itemSum + cost * item.quantity;
      }, 0);
      return sum + txCost;
    }, 0);
  }, [completedTx]);

  const estimatedProfit = useMemo(() => {
    return totalRevenue - totalCost;
  }, [totalRevenue, totalCost]);

  const avgOrderValue = useMemo(() => {
    return completedTx.length > 0 ? Math.round(totalRevenue / completedTx.length) : 0;
  }, [totalRevenue, completedTx]);

  // Chart data: 7 days daily revenue
  const chartData = useMemo(() => {
    const days: { [key: string]: { date: string; omset: number; count: number } } = {};
    const now = new Date();

    // Prepare last 7 days slots
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      days[key] = { date: key, omset: 0, count: 0 };
    }

    completedTx.forEach((tx) => {
      const txDate = tx.createdAt ? tx.createdAt.toDate() : new Date();
      const key = txDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      if (days[key]) {
        days[key].omset += tx.total;
        days[key].count += 1;
      }
    });

    return Object.values(days);
  }, [completedTx]);

  // Best selling products
  const topProducts = useMemo(() => {
    const itemMap: { [name: string]: { name: string; qty: number; total: number } } = {};
    completedTx.forEach((tx) => {
      tx.items.forEach((item) => {
        if (!itemMap[item.name]) {
          itemMap[item.name] = { name: item.name, qty: 0, total: 0 };
        }
        itemMap[item.name].qty += item.quantity;
        itemMap[item.name].total += item.subtotal;
      });
    });
    return Object.values(itemMap)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [completedTx]);

  if (loading) {
    return <Loading message="Menghitung rekap penjualan & profit..." />;
  }

  return (
    <div className="space-y-6">
      {/* Permission Error Banner */}
      {permissionError && (
        <FirestorePermissionBanner
          errorDetails={permissionError}
          onRetry={load}
        />
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Laporan Keuangan & Penjualan
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Analisis performa omset toko dan produk terlaris
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Pendapatan (Omset)"
          value={formatRupiah(totalRevenue)}
          subtitle="Dari transaksi selesai"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatsCard
          title="Estimasi Laba Kotor"
          value={formatRupiah(estimatedProfit)}
          subtitle={totalCost > 0 ? 'Omset dikurangi HPP produk' : 'Isi harga modal produk'}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatsCard
          title="Total Transaksi"
          value={`${completedTx.length} Nota`}
          subtitle="Transaksi berstatus selesai"
          icon={<Receipt className="w-5 h-5" />}
        />
        <StatsCard
          title="Rata-rata Nota (AOV)"
          value={formatRupiah(avgOrderValue)}
          subtitle="Nilai belanja per pelanggan"
          icon={<Package className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard title="Pendapatan CASH / TUNAI" value={formatRupiah(cashRevenue)} subtitle="Transaksi tunai selesai" icon={<DollarSign className="w-5 h-5" />} />
        <StatsCard title="Pendapatan QRIS" value={formatRupiah(qrisRevenue)} subtitle="Pencatatan transaksi QRIS" icon={<Receipt className="w-5 h-5" />} />
      </div>

      {/* Charts & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Chart (8 cols) */}
        <div className="lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Grafik Penjualan 7 Hari</h3>
                <p className="text-xs text-stone-500">Tren pendapatan harian toko Anda</p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500">
                <Calendar className="w-3.5 h-3.5" /> 7 Hari Terakhir
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#78716C' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#78716C' }}
                    tickFormatter={(val) => (val >= 1000 ? `${Math.round(val / 1000)}k` : val)}
                  />
                  <Tooltip
                    formatter={(val: any) => [formatRupiah(val), 'Omset']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E7E5E4',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  />
                  <Bar dataKey="omset" fill="#4A2E18" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Top 5 Products (4 cols) */}
        <div className="lg:col-span-4">
          <Card>
            <h3 className="text-base font-bold text-stone-900 mb-1">Produk Terlaris</h3>
            <p className="text-xs text-stone-500 mb-4">5 barang paling sering dibeli</p>

            {topProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                Belum ada produk terjual.
              </div>
            ) : (
              <div className="space-y-3">
                {topProducts.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-[#4A2E18] font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-stone-500">Terjual {item.qty} unit</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900 shrink-0">
                      {formatRupiah(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
