import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';
import { Loading } from '../components/ui/Loading';
import { Badge } from '../components/ui/Badge';
import {
  LayoutDashboard,
  Store as StoreIcon,
  Calculator,
  Package,
  ReceiptText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { currentUser, userProfile, store, loading, logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <Loading fullScreen message="Menyiapkan data toko..." />;
  }

  if (!currentUser) {
    navigate('/login', { replace: true });
    return null;
  }

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
      setLogoutModalOpen(false);
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Kasir POS', path: '/dashboard/kasir', icon: Calculator },
    { label: 'Produk & Stok', path: '/dashboard/products', icon: Package },
    { label: 'Transaksi', path: '/dashboard/transactions', icon: ReceiptText },
    { label: 'Laporan', path: '/dashboard/reports', icon: BarChart3 },
    { label: 'Pengaturan', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="kasir-app min-h-screen bg-stone-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-200/90 shadow-2xs h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo & Store Info */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <img
              src="https://cdn.phototourl.com/member/2026-09-15-fdac8264-8204-4be8-b302-30fb9cb8827d.png"
              alt="Kasir Pintar"
              className="h-8 w-auto hidden sm:block"
            />
            <div className="h-6 w-px bg-stone-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-[#4A2E18] font-bold text-sm overflow-hidden">
                {store?.logoUrl ? (
                  <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
                ) : (
                  <StoreIcon className="w-4 h-4" />
                )}
              </div>
              <div>
                <h1 className="text-sm font-bold text-stone-900 leading-tight truncate max-w-[160px] sm:max-w-xs">
                  {store?.name || 'Toko Saya'}
                </h1>
                <p className="text-[11px] text-stone-500 flex items-center gap-1">
                  <span>{userProfile?.name || 'Pengguna'}</span>
                  <span>•</span>
                  <span className="capitalize font-medium text-amber-800">{userProfile?.role || 'Owner'}</span>
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Header actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/product"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Website Publik
          </Link>

          <Link
            to="/dashboard/kasir"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFE404] text-[#2E1A0C] font-bold text-xs sm:text-sm hover:bg-[#F2D800] shadow-xs transition-colors"
          >
            <Calculator className="w-4 h-4" />
            <span>Kasir</span>
          </Link>

          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors"
            title="Keluar dari Akun"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-stone-200/90 py-5 px-3 shrink-0">
          <div className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#FFE404]/25 text-[#4A2E18] font-bold shadow-2xs'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0 text-[#4A2E18]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* User & Store Status Card */}
          <div className="pt-4 border-t border-stone-100">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-stone-500 uppercase">Status Akun</span>
                <Badge variant="brand" size="sm">Gratis Aktif</Badge>
              </div>
              <p className="text-xs text-stone-600 truncate">{currentUser.email}</p>
            </div>

            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-stone-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-stone-400" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (1-hand UX) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#4A2E18] font-bold' : 'text-stone-500'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/dashboard/kasir"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'bg-[#FFE404] text-[#2E1A0C] shadow-xs' : 'text-[#4A2E18] bg-yellow-100/80'
            }`
          }
        >
          <Calculator className="w-5 h-5 mb-0.5" />
          <span>Kasir</span>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#4A2E18] font-bold' : 'text-stone-500'
            }`
          }
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span>Produk</span>
        </NavLink>
        <NavLink
          to="/dashboard/transactions"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#4A2E18] font-bold' : 'text-stone-500'
            }`
          }
        >
          <ReceiptText className="w-5 h-5 mb-0.5" />
          <span>Transaksi</span>
        </NavLink>
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold text-stone-500 hover:text-stone-900"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Drawer (Modal/Slide-over) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full p-5 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src="https://cdn.phototourl.com/member/2026-09-15-fdac8264-8204-4be8-b302-30fb9cb8827d.png"
                    alt="Kasir Pintar"
                    className="h-7 w-auto"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active =
                    item.path === '/dashboard'
                      ? location.pathname === '/dashboard'
                      : location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                        active
                          ? 'bg-[#FFE404]/30 text-[#4A2E18] font-bold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#4A2E18]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="px-3 py-2 bg-stone-50 rounded-xl text-xs text-stone-600">
                <p className="font-bold text-stone-900 truncate">{store?.name}</p>
                <p className="truncate text-[11px] text-stone-500">{currentUser.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  setLogoutModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari akun Kasir Pintar Anda?"
        confirmLabel="Ya, Keluar"
        cancelLabel="Batal"
        isLoading={isLoggingOut}
      />
    </div>
  );
};
