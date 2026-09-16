import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';
import {
  UserProfile,
  Store,
  Category,
  Product,
  Transaction,
  TransactionItem,
  CartItem,
} from '../types';

// ================= SANITIZE FIRESTORE PAYLOAD ================= //

/**
 * Membersihkan objek dari semua nilai `undefined` secara rekursif.
 * Firestore akan menolak dokumen dengan error jika terdapat field yang bernilai `undefined`.
 */
export function sanitizeFirestoreData<T extends Record<string, any>>(obj: T): any {
  if (obj === null || obj === undefined) {
    return null;
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeFirestoreData(item)).filter((item) => item !== undefined);
  }
  // Jangan sentuh FieldValue seperti serverTimestamp() atau Timestamp
  if (typeof (obj as any).toMillis === 'function' || (obj as any)._methodName) {
    return obj;
  }

  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      // Abaikan / buang properti bernilai undefined agar tidak meledakkan setDoc/updateDoc
      continue;
    }
    if (value !== null && typeof value === 'object' && !(value instanceof Date) && typeof (value as any).toMillis !== 'function' && !(value as any)._methodName) {
      cleaned[key] = sanitizeFirestoreData(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

// ================= USER & STORE INITIALIZATION ================= //

export async function createUserWithStore(
  uid: string,
  name: string,
  email: string,
  storeName: string
): Promise<{ userProfile: UserProfile; store: Store }> {
  try {
    const storeRef = doc(collection(db, 'stores'));
    const storeId = storeRef.id;

    const storeData: Store = {
      id: storeId,
      ownerId: uid,
      name: storeName.trim() || 'Toko Kasir Pintar',
      logoUrl: '',
      logoPublicId: '',
      address: '',
      phone: '',
      email: email,
      receiptFooter: 'Terima kasih telah berbelanja di toko kami.',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const userProfile: UserProfile = {
      uid,
      name: name.trim() || email.split('@')[0],
      email,
      storeId,
      role: 'owner',
      createdAt: serverTimestamp(),
    };

    // 1. Save store document
    await setDoc(storeRef, sanitizeFirestoreData(storeData));

    // 2. Save user profile document in users/{uid}
    await setDoc(doc(db, 'users', uid), sanitizeFirestoreData(userProfile));

    // 3. Seed default starter categories for new store (non-blocking if error)
    try {
      const defaultCategories = ['Makanan', 'Minuman', 'Sembako', 'Elektronik', 'Lainnya'];
      for (const catName of defaultCategories) {
        const catRef = doc(collection(db, 'categories'));
        await setDoc(catRef, {
          storeId,
          name: catName,
          active: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (catErr) {
      console.warn('Warning: Could not seed starter categories:', catErr);
    }

    return { userProfile, store: storeData };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'users/stores');
  }
}

/**
 * Otomatis memastikan user profile dan dokumen toko ada di Firestore.
 * Jika belum ada (misal akun baru daftar atau dibuat di Firebase Console),
 * dokumen toko dan profil akan OTOMATIS dibuatkan tanpa perlu admin manual.
 */
export async function ensureUserAndStoreExist(
  uid: string,
  email: string,
  displayName?: string | null
): Promise<{ userProfile: UserProfile; store: Store }> {
  try {
    // 1. Cek profil pengguna
    let profile = await getUserProfile(uid);
    let storeData: Store | null = null;

    if (profile?.storeId) {
      storeData = await getStore(profile.storeId);
    }

    // Jika keduanya sudah lengkap, langsung kembalikan
    if (profile && storeData) {
      return { userProfile: profile, store: storeData };
    }

    const cleanName = displayName?.trim() || email.split('@')[0] || 'Pemilik Toko';
    const storeName = `Toko ${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)}`;

    // 2. Jika toko belum ada, buat dokumen toko baru
    if (!storeData) {
      const storeRef = doc(collection(db, 'stores'));
      const storeId = profile?.storeId || storeRef.id;

      storeData = {
        id: storeId,
        ownerId: uid,
        name: storeName,
        logoUrl: '',
        logoPublicId: '',
        address: '',
        phone: '',
        email: email,
        receiptFooter: 'Terima kasih telah berbelanja di toko kami.',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'stores', storeId), sanitizeFirestoreData(storeData));

      // Otomatis buatkan kategori default untuk toko baru
      const defaultCategories = ['Makanan', 'Minuman', 'Sembako', 'Elektronik', 'Lainnya'];
      for (const catName of defaultCategories) {
        try {
          const catRef = doc(collection(db, 'categories'));
          await setDoc(catRef, {
            storeId,
            name: catName,
            active: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (catErr) {
          console.warn('Could not seed category:', catErr);
        }
      }
    }

    // 3. Jika profil belum ada, buat dokumen users/{uid}
    if (!profile) {
      profile = {
        uid,
        name: cleanName,
        email,
        storeId: storeData.id,
        role: 'owner',
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, 'users', uid), sanitizeFirestoreData(profile));
    } else if (!profile.storeId) {
      // Jika profile ada tapi storeId kosong, update storeId
      profile.storeId = storeData.id;
      await updateDoc(doc(db, 'users', uid), {
        storeId: storeData.id,
        updatedAt: serverTimestamp(),
      });
    }

    return { userProfile: profile, store: storeData };
  } catch (error) {
    console.error('Error in ensureUserAndStoreExist:', error);
    handleFirestoreError(error, OperationType.CREATE, 'users/stores');
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return null;
    return { uid, ...(userDoc.data() as Omit<UserProfile, 'uid'>) };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${uid}`);
  }
}

export async function getStore(storeId: string): Promise<Store | null> {
  try {
    const storeDoc = await getDoc(doc(db, 'stores', storeId));
    if (!storeDoc.exists()) return null;
    return { id: storeDoc.id, ...(storeDoc.data() as Omit<Store, 'id'>) };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `stores/${storeId}`);
  }
}

export async function updateStore(storeId: string, data: Partial<Store>): Promise<void> {
  try {
    const updateData = sanitizeFirestoreData({
      ...data,
      updatedAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'stores', storeId), updateData);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `stores/${storeId}`);
  }
}

// ================= CATEGORIES ================= //

export async function getCategories(storeId: string): Promise<Category[]> {
  try {
    const q = query(
      collection(db, 'categories'),
      where('storeId', '==', storeId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Omit<Category, 'id'>) }))
      .filter((c) => c.active !== false);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'categories');
  }
}

export async function addCategory(
  storeIdOrData: string | { storeId: string; name: string },
  maybeName?: string
): Promise<Category> {
  try {
    const storeId = typeof storeIdOrData === 'string' ? storeIdOrData : storeIdOrData.storeId;
    const name = typeof storeIdOrData === 'string' ? (maybeName || '') : storeIdOrData.name;
    const catRef = doc(collection(db, 'categories'));
    const newCat: Omit<Category, 'id'> = {
      storeId,
      name: name.trim(),
      active: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(catRef, newCat);
    return { id: catRef.id, ...newCat };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'categories');
  }
}

export async function updateCategory(categoryId: string, name: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'categories', categoryId), {
      name: name.trim(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `categories/${categoryId}`);
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'categories', categoryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `categories/${categoryId}`);
  }
}

// ================= PRODUCTS ================= //

export async function getProducts(storeId: string): Promise<Product[]> {
  try {
    const q = query(
      collection(db, 'products'),
      where('storeId', '==', storeId)
    );
    const snap = await getDocs(q);
    const products: Product[] = snap.docs.map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        storeId: data.storeId || storeId,
        name: data.name || '',
        price: data.price || 0,
        cost: data.cost ?? data.costPrice ?? 0,
        costPrice: data.costPrice ?? data.cost ?? 0,
        stock: data.stock ?? 0,
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        barcode: data.barcode,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
        active: data.active ?? data.isActive ?? true,
        isActive: data.isActive ?? data.active ?? true,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
    return products.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'products');
  }
}

export async function getProduct(productId: string): Promise<Product | null> {
  try {
    const pDoc = await getDoc(doc(db, 'products', productId));
    if (!pDoc.exists()) return null;
    const data = pDoc.data() as any;
    return {
      id: pDoc.id,
      ...data,
      costPrice: data.costPrice ?? data.cost,
      isActive: data.isActive ?? data.active ?? true,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `products/${productId}`);
  }
}

export const getProductById = getProduct;

export async function addProduct(
  storeId: string,
  data: Partial<Product>
): Promise<Product> {
  try {
    const pRef = doc(collection(db, 'products'));

    const costVal = data.costPrice !== undefined ? Number(data.costPrice) : (data.cost !== undefined ? Number(data.cost) : 0);
    const activeVal = data.isActive ?? data.active ?? true;

    const rawProduct: Record<string, any> = {
      storeId,
      name: (data.name || '').trim(),
      price: Number(data.price) || 0,
      costPrice: isNaN(costVal) ? 0 : costVal,
      cost: isNaN(costVal) ? 0 : costVal,
      stock: isNaN(Number(data.stock)) ? 0 : Number(data.stock),
      active: activeVal,
      isActive: activeVal,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Hanya masukkan field opsional jika ada nilai string valid
    if (data.categoryId && typeof data.categoryId === 'string' && data.categoryId.trim() !== '') {
      rawProduct.categoryId = data.categoryId.trim();
    }
    if (data.categoryName && typeof data.categoryName === 'string' && data.categoryName.trim() !== '') {
      rawProduct.categoryName = data.categoryName.trim();
    }
    if (data.barcode && typeof data.barcode === 'string' && data.barcode.trim() !== '') {
      rawProduct.barcode = data.barcode.trim();
    }
    if (data.imageUrl && typeof data.imageUrl === 'string' && data.imageUrl.trim() !== '') {
      rawProduct.imageUrl = data.imageUrl.trim();
    }
    if (data.imagePublicId && typeof data.imagePublicId === 'string' && data.imagePublicId.trim() !== '') {
      rawProduct.imagePublicId = data.imagePublicId.trim();
    }

    const cleanProduct = sanitizeFirestoreData(rawProduct);
    await setDoc(pRef, cleanProduct);
    return { id: pRef.id, ...cleanProduct } as Product;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'products');
  }
}

export async function updateProduct(
  productId: string,
  data: Partial<Product>
): Promise<void> {
  try {
    const updateData: Record<string, any> = {
      updatedAt: serverTimestamp(),
    };

    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.price !== undefined) updateData.price = Number(data.price) || 0;
    if (data.costPrice !== undefined) {
      const c = Number(data.costPrice) || 0;
      updateData.costPrice = c;
      updateData.cost = c;
    }
    if (data.cost !== undefined) {
      const c = Number(data.cost) || 0;
      updateData.cost = c;
      updateData.costPrice = c;
    }
    if (data.stock !== undefined) updateData.stock = Number(data.stock) || 0;
    if (data.isActive !== undefined) {
      updateData.isActive = Boolean(data.isActive);
      updateData.active = Boolean(data.isActive);
    }
    if (data.active !== undefined) {
      updateData.active = Boolean(data.active);
      updateData.isActive = Boolean(data.active);
    }

    if (data.barcode !== undefined) {
      updateData.barcode = data.barcode ? data.barcode.trim() : '';
    }
    if (data.categoryId !== undefined) {
      updateData.categoryId = data.categoryId ? data.categoryId.trim() : '';
    }
    if (data.categoryName !== undefined) {
      updateData.categoryName = data.categoryName ? data.categoryName.trim() : '';
    }
    if (data.imageUrl !== undefined) {
      updateData.imageUrl = data.imageUrl ? data.imageUrl.trim() : '';
    }
    if (data.imagePublicId !== undefined) {
      updateData.imagePublicId = data.imagePublicId ? data.imagePublicId.trim() : '';
    }

    const cleaned = sanitizeFirestoreData(updateData);
    await updateDoc(doc(db, 'products', productId), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `products/${productId}`);
  }
}

export async function deleteProduct(productId: string, storeId?: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `products/${productId}`);
  }
}

// ================= TRANSACTIONS ================= //

export interface CheckoutPayload {
  storeId: string;
  cashierId?: string;
  cashierUid?: string;
  cashierName?: string;
  invoiceNumber?: string;
  items: (TransactionItem | CartItem)[];
  subtotal: number;
  discount?: number;
  total: number;
  payment: number;
  change: number;
  paymentMethod?: string;
  notes?: string;
}

function generateInvoiceNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `INV-${y}${m}${d}-${r}`;
}

export async function executeCheckoutTransaction(
  payload: CheckoutPayload
): Promise<Transaction> {
  const transRef = doc(collection(db, 'transactions'));
  const invoiceNumber = payload.invoiceNumber || generateInvoiceNumber();

  return await runTransaction(db, async (transaction) => {
    // 1. Read product docs & validate stock
    const productUpdates: { ref: any; currentStock: number; requestedQty: number; name: string }[] = [];
    const normalizedItems: TransactionItem[] = [];

    for (const item of payload.items) {
      const pRef = doc(db, 'products', item.productId);
      const pSnap = await transaction.get(pRef);
      if (!pSnap.exists()) {
        throw new Error(`Produk "${item.name}" tidak ditemukan di database.`);
      }
      const pData = pSnap.data() as any;
      const isActive = pData.isActive ?? pData.active ?? true;
      if (!isActive) {
        throw new Error(`Produk "${pData.name}" saat ini tidak aktif.`);
      }
      if (pData.stock < item.quantity) {
        throw new Error(
          `Stok produk "${pData.name}" tidak mencukupi (Tersedia: ${pData.stock}, Diminta: ${item.quantity}).`
        );
      }
      productUpdates.push({
        ref: pRef,
        currentStock: pData.stock,
        requestedQty: item.quantity,
        name: pData.name,
      });

      normalizedItems.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        costPrice: item.costPrice ?? (item as any).cost ?? pData.costPrice ?? pData.cost ?? 0,
        cost: item.costPrice ?? (item as any).cost ?? pData.costPrice ?? pData.cost ?? 0,
        quantity: item.quantity,
        subtotal: item.subtotal,
      });
    }

    // 2. Decrement stock atomically
    for (const update of productUpdates) {
      transaction.update(update.ref, {
        stock: update.currentStock - update.requestedQty,
        updatedAt: serverTimestamp(),
      });
    }

    // 3. Create transaction document
    const newTransactionData: Omit<Transaction, 'id'> = {
      storeId: payload.storeId,
      cashierId: payload.cashierId || payload.cashierUid || '',
      cashierUid: payload.cashierUid || payload.cashierId || '',
      cashierName: payload.cashierName || 'Kasir',
      invoiceNumber,
      items: normalizedItems,
      subtotal: payload.subtotal,
      discount: payload.discount || 0,
      total: payload.total,
      payment: payload.payment,
      change: payload.change,
      paymentMethod: payload.paymentMethod || 'cash',
      notes: payload.notes || '',
      status: 'completed',
      createdAt: serverTimestamp(),
    };

    transaction.set(transRef, newTransactionData);

    return {
      id: transRef.id,
      ...newTransactionData,
      createdAt: {
        toDate: () => new Date(),
        seconds: Math.floor(Date.now() / 1000),
      },
    };
  });
}

export async function createTransaction(
  storeId: string,
  payload: Omit<CheckoutPayload, 'storeId'>
): Promise<Transaction> {
  return executeCheckoutTransaction({ ...payload, storeId });
}

export async function getTransactions(
  storeId: string,
  limitCount?: number
): Promise<Transaction[]> {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('storeId', '==', storeId)
    );
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Transaction, 'id'>),
    }));

    list.sort((a, b) => {
      const timeA = a.createdAt?.seconds ? a.createdAt.seconds : new Date(a.createdAt || 0).getTime();
      const timeB = b.createdAt?.seconds ? b.createdAt.seconds : new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });

    if (limitCount && limitCount > 0) {
      return list.slice(0, limitCount);
    }
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'transactions');
  }
}

export async function cancelTransaction(
  storeIdOrTxId: string,
  txIdOrUid: string,
  reasonOrMaybeReason?: string
): Promise<void> {
  // Can be called as cancelTransaction(txId, userId, reason) OR cancelTransaction(storeId, txId, reason)
  const txId = txIdOrUid.startsWith('INV-') || txIdOrUid.length > 15 ? txIdOrUid : storeIdOrTxId;
  const transRef = doc(db, 'transactions', txId);

  await runTransaction(db, async (transaction) => {
    const transSnap = await transaction.get(transRef);
    if (!transSnap.exists()) {
      throw new Error('Transaksi tidak ditemukan.');
    }
    const transData = transSnap.data() as Transaction;
    if (transData.status === 'cancelled') {
      throw new Error('Transaksi sudah pernah dibatalkan.');
    }

    // Restore stock for all items
    for (const item of transData.items) {
      const pRef = doc(db, 'products', item.productId);
      const pSnap = await transaction.get(pRef);
      if (pSnap.exists()) {
        const pData = pSnap.data() as any;
        transaction.update(pRef, {
          stock: (pData.stock || 0) + item.quantity,
          updatedAt: serverTimestamp(),
        });
      }
    }

    // Mark transaction as cancelled
    transaction.update(transRef, {
      status: 'cancelled',
      cancelledAt: serverTimestamp(),
      cancelledBy: txIdOrUid,
      cancelReason: reasonOrMaybeReason || 'Dibatalkan oleh kasir',
    });
  });
}
