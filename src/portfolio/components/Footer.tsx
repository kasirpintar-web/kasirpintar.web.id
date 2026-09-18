import React from 'react';
import { Link } from 'react-router-dom';
import { contactData } from '../data/portfolioData';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const waLink = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(contactData.defaultWaMessage)}`;

  return (
    <footer id="app-footer" className="w-full bg-black border-t border-neutral-850 pt-12 pb-28 text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-neutral-850">
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-xs shadow-sm">
                LP
              </div>
              <h3 className="text-base font-bold text-white">Logis Denis Prabowo</h3>
            </div>
            <p className="text-xs text-yellow-400 font-semibold tracking-wide">
              AI-Assisted Web Developer | Website Builder | Digital Creator
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Membangun website dan aplikasi web fungsional untuk kebutuhan bisnis, personal, dan UMKM dengan bantuan AI dan teknologi web modern.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Navigasi Halaman
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link to="/portofolio-ldp" className="hover:text-yellow-400 transition-colors py-0.5">
                Home
              </Link>
              <Link to="/portofolio-ldp/tentang" className="hover:text-yellow-400 transition-colors py-0.5">
                Tentang
              </Link>
              <Link to="/portofolio-ldp/project" className="hover:text-yellow-400 transition-colors py-0.5">
                Project
              </Link>
              <Link to="/portofolio-ldp/skill" className="hover:text-yellow-400 transition-colors py-0.5">
                Skill
              </Link>
              <Link to="/portofolio-ldp/jasa" className="hover:text-yellow-400 transition-colors py-0.5">
                Jasa
              </Link>
              <Link to="/portofolio-ldp/kontak" className="hover:text-yellow-400 transition-colors py-0.5">
                Kontak
              </Link>
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Hubungi Saya
            </h4>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs hover:text-yellow-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>WhatsApp: {contactData.whatsappNumber}</span>
            </a>
            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-2 text-xs hover:text-yellow-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="truncate">{contactData.email}</span>
            </a>
            <div className="flex items-start gap-2 text-xs text-neutral-400 pt-1">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <span>{contactData.address}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <p>© {currentYear} Logis Denis Prabowo. All rights reserved.</p>
          <p className="text-[11px] text-neutral-500">
            Dibuat secara mandiri & didukung teknologi web modern.
          </p>
        </div>
      </div>
    </footer>
  );
};
