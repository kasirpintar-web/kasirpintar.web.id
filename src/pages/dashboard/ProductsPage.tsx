import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
} from '../../firebase/db';
import { Product, Category } from '../../types';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { Badge } from '../../components/ui/Badge';
import { Loading } from '../../components/ui/Loading';
import { EmptyState } from '../../components/ui/EmptyState';
import { FirestorePermissionBanner } from '../../components/common/FirestorePermissionBanner';
import { isFirestorePermissionError } from '../../firebase/errors';
import { ensureEan13, generateBarcodeValue } from '../../utils/barcode';
import { BarcodeLabel } from '../../components/BarcodeLabel';
import { formatRupiah } from '../../utils/format';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  Upload,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { store, currentUser, ensureStoreProvisioned } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Add / Edit Product Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formName, setFormName] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCostPrice, setFormCostPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formBarcode, setFormBarcode] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Add Category Modal
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [catSubmitting, setCatSubmitting] = useState(false);

  // Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [barcodeProduct, setBarcodeProduct] = useState<Product | null>(null);

  const loadData = async () => {
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
      const [prodList, catList] = await Promise.all([
        getProducts(currentStore.id),
        getCategories(currentStore.id),
      ]);
      setProducts(prodList);
      setCategories(catList);
    } catch (err: any) {
      console.error('Failed to load products:', err);
      if (isFirestorePermissionError(err)) {
        setPermissionError('Missing or insufficient permissions');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [store, currentUser]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategoryId(categories[0]?.id || '');
    setFormPrice('');
    setFormCostPrice('');
    setFormStock('10');
    setFormBarcode('');
    setFormImageUrl('');
    setFormError(null);
    setProductModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategoryId(p.categoryId || '');
    setFormPrice(p.price.toString());
    setFormCostPrice(p.costPrice ? p.costPrice.toString() : '');
    setFormStock(p.stock.toString());
    setFormBarcode(p.barcode || '');
    setFormImageUrl(p.imageUrl || '');
    setFormError(null);
    setProductModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const url = await uploadImageToCloudinary(file, 'product');
      setFormImageUrl(url);
    } catch (err: any) {
      alert(err.message || 'Gagal mengunggah foto ke Cloudinary');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    let currentStore = store;
    if (!currentStore && currentUser) {
      currentStore = await ensureStoreProvisioned();
    }
    if (!currentStore) {
      setFormError('Data toko belum siap. Silakan tunggu sebentar atau muat ulang.');
      return;
    }

    if (!formName.trim() || !formPrice) {
      setFormError('Nama produk dan harga jual wajib diisi.');
      return;
    }

    const priceNum = parseInt(formPrice, 10);
    const costPriceNum = formCostPrice ? parseInt(formCostPrice, 10) : 0;
    const stockNum = parseInt(formStock, 10) || 0;

    if (isNaN(priceNum) || priceNum < 0) {
      setFormError('Harga jual tidak valid.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      const catObj = categories.find((c) => c.id === formCategoryId);
      let cleanBarcode = formBarcode.trim();
      if (!editingProduct && !cleanBarcode) cleanBarcode = generateBarcodeValue();
      else if (/^\d{12}$/.test(cleanBarcode)) cleanBarcode = ensureEan13(cleanBarcode);
      const cleanImageUrl = formImageUrl.trim();

      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          name: formName.trim(),
          categoryId: formCategoryId || '',
          categoryName: catObj?.name || '',
          price: priceNum,
          costPrice: costPriceNum,
          stock: stockNum,
          barcode: cleanBarcode,
          imageUrl: cleanImageUrl,
        });
      } else {
        const productPayload: Partial<Product> = {
          name: formName.trim(),
          price: priceNum,
          costPrice: costPriceNum,
          stock: stockNum,
          isActive: true,
        };

        if (formCategoryId && formCategoryId.trim()) {
          productPayload.categoryId = formCategoryId.trim();
          if (catObj?.name) {
            productPayload.categoryName = catObj.name;
          }
        }

        if (cleanBarcode) {
          productPayload.barcode = cleanBarcode;
        }

        if (cleanImageUrl) {
          productPayload.imageUrl = cleanImageUrl;
        }

        const createdProduct = await addProduct(currentStore.id, productPayload);
        await loadData();
        setProductModalOpen(false);
        setBarcodeProduct(createdProduct);
        return;
      }

      await loadData();
      setProductModalOpen(false);
    } catch (err: any) {
      let raw = err?.message || 'Gagal menyimpan produk.';
      try {
        const parsed = JSON.parse(raw);
        if (parsed.error) raw = parsed.error;
      } catch (_) {}
      setFormError(raw);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    let currentStore = store;
    if (!currentStore && currentUser) {
      currentStore = await ensureStoreProvisioned();
    }
    if (!currentStore || !newCatName.trim()) return;

    try {
      setCatSubmitting(true);
      await addCategory(currentStore.id, newCatName.trim());
      await loadData();
      setNewCatName('');
      setCatModalOpen(false);
    } catch (err: any) {
      let raw = err?.message || 'Gagal menambahkan kategori.';
      try {
        const parsed = JSON.parse(raw);
        if (parsed.error) raw = parsed.error;
      } catch (_) {}
      alert(raw);
    } finally {
      setCatSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!store || !productToDelete) return;
    try {
      setIsDeleting(true);
      await deleteProduct(store.id, productToDelete.id);
      await loadData();
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus produk');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loading message="Memuat daftar produk & stok..." />;
  }

  return (
    <div className="space-y-6">
      {/* Permission Error Banner */}
      {permissionError && (
        <FirestorePermissionBanner
          errorDetails={permissionError}
          onRetry={loadData}
        />
      )}

      {/* Header with Title and Add Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Katalog Produk & Stok</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Total {products.length} item terdaftar dalam sistem toko
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCatModalOpen(true)}>
            <Layers className="w-4 h-4 mr-1.5" />
            + Kategori
          </Button>
          <Button variant="primary" size="sm" onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/20 focus:border-[#4A2E18]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 font-semibold whitespace-nowrap">Filter Kategori:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto text-xs py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-800 focus:outline-none"
          >
            <option value="all">Semua Kategori ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({products.filter((p) => p.categoryId === c.id).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table / Cards */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={<Package className="w-8 h-8" />}
          title="Belum ada produk"
          description={
            searchQuery
              ? `Tidak ditemukan produk yang cocok dengan "${searchQuery}".`
              : 'Mulai buat produk tokomu sekarang agar kasir bisa mencatat penjualan.'
          }
          actionLabel="Tambah Produk Sekarang"
          onAction={openAddModal}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Produk</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga Modal (HPP)</th>
                  <th className="py-3 px-4">Harga Jual</th>
                  <th className="py-3 px-4">Stok</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50/60 transition-colors">
                    {/* Name & Thumb */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 overflow-hidden flex items-center justify-center shrink-0 border border-stone-200">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-stone-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 text-sm leading-tight">
                            {product.name}
                          </p>
                          {product.barcode && (
                            <p className="text-[10px] text-stone-400 font-mono">
                              Barcode: {product.barcode}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-stone-600 font-medium">
                      {product.categoryName || 'Tanpa Kategori'}
                    </td>

                    {/* Cost */}
                    <td className="py-3 px-4 text-stone-500">
                      {product.costPrice ? formatRupiah(product.costPrice) : '-'}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-stone-900">
                      {formatRupiah(product.price)}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-xs ${
                          product.stock <= 0
                            ? 'bg-red-100 text-red-800'
                            : product.stock <= 5
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {product.stock}
                        {product.stock <= 0 && ' (Habis)'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                        title="Edit Produk"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {product.barcode && (
                        <button
                          type="button"
                          onClick={() => setBarcodeProduct(product)}
                          className="px-2 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-[11px] font-bold"
                          title="Lihat & cetak barcode"
                        >
                          Barcode
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setProductToDelete(product);
                          setDeleteDialogOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        title={editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
        maxWidth="md"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
              {formError}
            </div>
          )}

          {/* Photo Upload to Cloudinary */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Foto Produk (Cloudinary)
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center shrink-0">
                {formImageUrl ? (
                  <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-6 h-6 text-stone-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="product-image-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="product-image-input"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {isUploadingImage ? 'Mengunggah...' : 'Pilih Foto'}
                </label>
                <p className="text-[10px] text-stone-400 mt-1">
                  Format JPG, PNG, atau WebP. Maksimal 5MB.
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Nama Produk"
            placeholder="Contoh: Es Teh Manis Jumbo"
            required
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Kategori</label>
              <select
                value={formCategoryId}
                onChange={(e) => setFormCategoryId(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-800 focus:outline-none"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Stok Awal"
              type="number"
              min="0"
              placeholder="0"
              required
              value={formStock}
              onChange={(e) => setFormStock(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Harga Jual (Rp)"
              type="number"
              min="0"
              placeholder="10000"
              required
              value={formPrice}
              onChange={(e) => setFormPrice(e.target.value)}
            />
            <Input
              label="Harga Modal / HPP (Rp) - Opsional"
              type="number"
              min="0"
              placeholder="7000"
              value={formCostPrice}
              onChange={(e) => setFormCostPrice(e.target.value)}
            />
          </div>

          <Input
            label="Barcode / SKU (Opsional)"
            placeholder="Contoh: 89912345678"
            value={formBarcode}
            onChange={(e) => setFormBarcode(e.target.value)}
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setProductModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              isLoading={formSubmitting}
            >
              {editingProduct ? 'Perbarui Produk' : 'Simpan Produk'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!barcodeProduct}
        onClose={() => setBarcodeProduct(null)}
        title="Barcode Produk"
        maxWidth="sm"
      >
        <BarcodeLabel product={barcodeProduct} onClose={() => setBarcodeProduct(null)} />
      </Modal>

      {/* Add Category Modal */}
      <Modal
        isOpen={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        title="Tambah Kategori Produk"
        maxWidth="sm"
      >
        <form onSubmit={handleSaveCategory} className="space-y-4">
          <Input
            label="Nama Kategori Baru"
            placeholder="Contoh: Makanan, Minuman, Snack"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setCatModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              isLoading={catSubmitting}
            >
              Simpan Kategori
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteProduct}
        title="Hapus Produk"
        message={`Apakah Anda yakin ingin menghapus produk "${productToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        isLoading={isDeleting}
      />
    </div>
  );
};
