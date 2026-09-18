import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Briefcase, Award, Zap, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/tentang', label: 'Tentang', icon: User },
  { to: '/project', label: 'Project', icon: Briefcase },
  { to: '/skill', label: 'Skill', icon: Award },
  { to: '/jasa', label: 'Jasa Web', icon: Zap, badge: 'Rp759rb' },
  { to: '/kontak', label: 'Kontak', icon: Send },
];

export const LauncherDock: React.FC = () => {
  return (
    <nav
      id="launcher-dock"
      aria-label="Navigasi Utama Launcher"
      className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-3 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/80 ring-1 ring-yellow-400/20 max-w-fit mx-auto transition-all">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-400 text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-yellow-300 hover:bg-neutral-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-black stroke-[2.5]' : 'text-neutral-300'}`} />
                    {item.badge && (
                      <span className={`hidden sm:block absolute -top-1.5 -right-2 text-[9px] px-1.5 py-0.2 font-black rounded-full shadow-xs ${
                        isActive
                          ? 'bg-black text-yellow-400 border border-black'
                          : 'bg-yellow-400 text-black'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] sm:text-xs tracking-tight mt-0.5 whitespace-nowrap ${isActive ? 'text-black font-bold' : ''}`}>
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeDockDot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
