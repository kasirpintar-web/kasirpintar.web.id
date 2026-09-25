import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getProducts, getCategories, createTransaction } from '../../firebase/db';
import { Product, Category, CartItem, Transaction } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Loading } from '../../components/ui/Loading';
import { EmptyState } from '../../components/ui/EmptyState';
import { ReceiptPreview } from '../../components/ReceiptPreview';
import { FirestorePermissionBanner } from '../../components/common/FirestorePermissionBanner';
import { BarcodeScanner } from '../../components/BarcodeScanner';
import { Modal } from '../../components/ui/Modal';
import { isFirestorePermissionError } from '../../firebase/errors';
import { formatRupiah } from '../../utils/format';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  Banknote,
  ScanLine,
  QrCode,
} from 'lucide-react';

export const PosKasirPage: React.FC = () => {
  const { store, userProfile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentInput, setPaymentInput] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris' | 'transfer'>('cash');
  const [notes, setNotes] = useState('');

  // Checkout submission
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Post-transaction receipt modal
  const [completedTransaction, setCompletedTransaction] = useState<Transaction | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  const loadData = async () => {
    if (!store) return;
    try {
      setLoading(true);
      setPermissionError(null);
      const [prodList, catList] = await Promise.all([
        getProducts(store.id),
        getCategories(store.id),
      ]);
      setProducts(prodList);
      setCategories(catList);
    } catch (err: any) {
      console.error('Failed to load POS data:', err);
      if (isFirestorePermissionError(err)) {
        setPermissionError('Missing or insufficient permissions');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load products & categories
  useEffect(() => {
    loadData();
  }, [store]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isActive) return false;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || p.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Cart Calculations
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  }, [cart]);

  const changeAmount = useMemo(() => {
    return Math.max(0, paymentAmount - cartTotal);
  }, [paymentAmount, cartTotal]);

  const isPaymentSufficient = paymentAmount >= cartTotal && cartTotal > 0;

  // Add item to cart
  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert(`Stok tidak mencukupi. Sisa stok hanya ${product.stock}`);
          return prev;
        }
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            costPrice: product.costPrice,
            quantity: 1,
            subtotal: product.price,
          },
        ];
      }
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    const product = products.find((p) => p.id === productId);
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (product && newQty > product.stock) {
              alert(`Maksimal stok tersedia hanya ${product.stock}`);
              return item;
            }
            return {
              ...item,
              quantity: newQty,
              subtotal: newQty * item.price,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
    setPaymentAmount(0);
    setPaymentInput('');
    setNotes('');
    setPaymentMethod('cash');
    setCheckoutError(null);
  };

  // Quick denomination click
  const handleQuickPay = (amount: number) => {
    setPaymentAmount(amount);
    setPaymentInput(amount.toString());
  };

  const handlePaymentInputChange = (val: string) => {
    const raw = val.replace(/\D/g, '');
    const num = parseInt(raw, 10) || 0;
    setPaymentAmount(num);
    setPaymentInput(raw);
  };

  const handleBarcodeDetected = (barcode: string) => {
    const normalized = barcode.trim();
    const product = products.find((p) => p.barcode === normalized && p.isActive);
    if (!product) {
      setCheckoutError(`Produk dengan barcode ${normalized} tidak ditemukan.`);
      return;
    }
    setCheckoutError(null);
    handleAddToCart(product);
    setScannerOpen(false);
  };

  // Checkout Execution
  const handleCheckout = async () => {
    if (!store || cart.length === 0) return;

    if (paymentAmount < cartTotal) {
      setCheckoutError(
        `Nominal pembayaran kurang Rp ${formatRupiah(cartTotal - paymentAmount)}`
      );
      return;
    }

    try {
      setIsCheckingOut(true);
      setCheckoutError(null);

      const createdTx = await createTransaction(store.id, {
        cashierName: userProfile?.name || 'Kasir',
        cashierUid: userProfile?.uid,
        items: cart,
        subtotal: cartTotal,
        discount: 0,
        total: cartTotal,
        payment: paymentAmount,
        change: changeAmount,
        paymentMethod,
        notes,
      });

      // Update local product stocks to match the transaction deduction
      setProducts((prev) =>
        prev.map((p) => {
          const cartItem = cart.find((ci) => ci.productId === p.id);
          if (cartItem) {
            return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
          }
          return p;
        })
      );

      // Open receipt modal
      setCompletedTransaction(createdTx);
      setReceiptModalOpen(true);

      // Reset cart
      handleClearCart();
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setCheckoutError(err.message || 'Transaksi gagal diproses. Silakan coba lagi.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return <Loading message="Menyiapkan mesin kasir..." />;
  }

  return (
    <div className="space-y-4">
      {/* Permission Error Banner */}
      {permissionError && (
        <FirestorePermissionBanner
          errorDetails={permissionError}
          onRetry={loadData}
        />
      )}

      {/* Top Bar / Search & Categories */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/20 focus:border-[#4A2E18]"
          />
        </div>

        <button type="button" onClick={() => { setCheckoutError(null); setScannerOpen(true); }} className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800">
          <ScanLine className="w-4 h-4" /> Scan Barcode
        </button>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#FFE404] text-[#2E1A0C] shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Semua ({products.filter((p) => p.isActive).length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id && p.isActive).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#FFE404] text-[#2E1A0C] shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* POS Grid & Cart Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Product Catalog (7 or 8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={<Package className="w-8 h-8" />}
              title="Produk tidak ditemukan"
              description={
                searchQuery
                  ? `Tidak ada produk dengan kata kunci "${searchQuery}".`
                  : 'Belum ada produk di kategori ini. Tambahkan produk di menu Produk & Stok.'
              }
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stock <= 0;
                const inCartItem = cart.find((i) => i.productId === product.id);

                return (
                  <button
                    key={product.id}
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => handleAddToCart(product)}
                    className={`text-left p-3 rounded-2xl bg-white border transition-all flex flex-col justify-between relative group ${
                      isOutOfStock
                        ? 'opacity-50 border-stone-200 cursor-not-allowed'
                        : 'border-stone-200/90 hover:border-amber-400 hover:shadow-md active:scale-98'
                    }`}
                  >
                    {/* Badge if item in cart */}
                    {inCartItem && (
                      <span className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#FFE404] text-[#2E1A0C] font-black text-xs flex items-center justify-center shadow-xs">
                        {inCartItem.quantity}
                      </span>
                    )}

                    {/* Image / Placeholder */}
                    <div className="w-full aspect-square rounded-xl bg-stone-100 overflow-hidden mb-2.5 relative flex items-center justify-center">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="text-stone-400 flex flex-col items-center">
                          <Package className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-medium">Foto Produk</span>
                        </div>
                      )}

                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center text-white text-[11px] font-bold uppercase tracking-wider">
                          Habis
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 leading-tight">
                        {product.name}
                      </h4>
                      <p className="text-xs sm:text-sm font-black text-amber-900 mt-1">
                        {formatRupiah(product.price)}
                      </p>
                    </div>

                    {/* Stock indicator */}
                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                      <span className="text-stone-500">Stok:</span>
                      <span
                        className={`font-bold ${
                          product.stock <= 5 ? 'text-red-600' : 'text-stone-700'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Cart & Payment Checkout Panel (5 or 4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg p-5 space-y-4">
            {/* Cart Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#4A2E18] flex items-center justify-center font-bold">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Keranjang Belanja</h3>
                  <p className="text-[11px] text-stone-500">{cart.length} item dipilih</p>
                </div>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold"
                >
                  Kosongkan
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-10 text-center text-xs text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                Klik produk di sebelah kiri untuk memasukkan ke kasir.
              </div>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1 divide-y divide-stone-100">
                {cart.map((item) => (
                  <div key={item.productId} className="pt-2 flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-stone-500">
                        {formatRupiah(item.price)} x {item.quantity} ={' '}
                        <span className="font-semibold text-stone-700">
                          {formatRupiah(item.subtotal)}
                        </span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.productId, -1)}
                        className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.productId, 1)}
                        className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className="p-1 text-stone-400 hover:text-red-600 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Totals Section */}
            <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold">{formatRupiah(cartTotal)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-stone-100">
                <span className="font-black text-sm text-stone-900">TOTAL BELANJA</span>
                <span className="text-xl font-black text-[#4A2E18]">{formatRupiah(cartTotal)}</span>
              </div>
            </div>

            {/* Payment Input & Quick Denominations */}
            {cart.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700">Metode Pembayaran</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => { setPaymentMethod('cash'); setPaymentAmount(0); setPaymentInput(''); }} className={`p-3 rounded-xl border text-left ${paymentMethod === 'cash' ? 'border-[#4A2E18] bg-amber-50' : 'border-stone-200 bg-white'}`}>
                      <Banknote className="w-4 h-4 mb-1" />
                      <span className="block text-xs font-black">CASH / TUNAI</span><span className="text-[10px] text-stone-500">Hitung kembalian</span>
                    </button>
                    <button type="button" onClick={() => { setPaymentMethod('qris'); setPaymentAmount(cartTotal); setPaymentInput(String(cartTotal)); }} className={`p-3 rounded-xl border text-left ${paymentMethod === 'qris' ? 'border-[#4A2E18] bg-amber-50' : 'border-stone-200 bg-white'}`}>
                      <QrCode className="w-4 h-4 mb-1" />
                      <span className="block text-xs font-black">QRIS</span><span className="text-[10px] text-stone-500">Pencatatan saja</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">
                    {paymentMethod === 'qris' ? 'Nominal QRIS (Rp)' : 'Jumlah Pembayaran Tunai (Rp)'}
                  </label>
                  <div className="relative">
                    <Banknote className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={paymentInput ? parseInt(paymentInput, 10).toLocaleString('id-ID') : ''}
                      onChange={(e) => handlePaymentInputChange(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm font-bold text-stone-900 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/20 focus:border-[#4A2E18]"
                    />
                  </div>
                </div>

                {paymentMethod === 'cash' && <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickPay(cartTotal)}
                    className="py-1 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-bold text-stone-700 text-center"
                  >
                    Uang Pas
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPay(20000)}
                    className="py-1 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-bold text-stone-700 text-center"
                  >
                    20.000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPay(50000)}
                    className="py-1 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-bold text-stone-700 text-center"
                  >
                    50.000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPay(100000)}
                    className="py-1 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-bold text-stone-700 text-center"
                  >
                    100.000
                  </button>
                </div>}

                {/* Kembalian Display */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700">Kembalian:</span>
                  <span
                    className={`font-black text-sm ${
                      paymentAmount < cartTotal && cartTotal > 0
                        ? 'text-stone-400'
                        : 'text-emerald-700'
                    }`}
                  >
                    {formatRupiah(changeAmount)}
                  </span>
                </div>

                {/* Error warning if insufficient */}
                {paymentMethod === 'cash' && paymentAmount < cartTotal && cartTotal > 0 && paymentAmount > 0 && (
                  <div className="p-2 rounded-lg bg-red-50 text-red-700 text-[11px] flex items-center gap-1.5 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    Uang kurang {formatRupiah(cartTotal - paymentAmount)}
                  </div>
                )}

                {checkoutError && (
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold">
                    {checkoutError}
                  </div>
                )}

                {/* Checkout Button */}
                <Button
                  type="button"
                  variant="primary"
                  className="w-full justify-center text-sm font-black py-3 shadow-md shadow-yellow-400/20"
                  disabled={!isPaymentSufficient || isCheckingOut}
                  isLoading={isCheckingOut}
                  onClick={handleCheckout}
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Bayar & Cetak Struk
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={scannerOpen} onClose={() => setScannerOpen(false)} title="Scan Barcode Produk" maxWidth="sm">
        <BarcodeScanner onDetected={handleBarcodeDetected} onClose={() => setScannerOpen(false)} />
      </Modal>

      {/* Post Checkout Struk Preview Modal */}
      <ReceiptPreview
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        transaction={completedTransaction}
        store={store}
      />
    </div>
  );
};
