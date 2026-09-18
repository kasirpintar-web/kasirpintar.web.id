import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { contactData } from '../data/portfolioData';
import { PageSEO } from '../components/PageSEO';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    websiteType: 'Website Bisnis / UMKM',
    message: ''
  });

  const [copiedType, setCopiedType] = useState<'wa' | 'email' | null>(null);

  const handleCopy = (text: string, type: 'wa' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = `Halo Logis Denis,\nNama: ${formData.name || '-'}\nKontak: ${formData.contact || '-'}\nJenis Website: ${formData.websiteType}\nPesan: ${formData.message || '-'}`;
    const waUrl = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(fullMsg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleMailto = () => {
    const subject = encodeURIComponent(`Konsultasi Website - ${formData.name || 'Calon Klien'}`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nKontak: ${formData.contact}\nJenis Website: ${formData.websiteType}\n\nPesan:\n${formData.message}`
    );
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
  };

  const waDirectUrl = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(contactData.defaultWaMessage)}`;

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28 bg-black text-neutral-100">
      <PageSEO
        title="Kontak & Konsultasi"
        description="Hubungi Logis Denis Prabowo melalui WhatsApp, Email, atau formulir konsultasi untuk mendiskusikan pembuatan website dan aplikasi digital."
        path="/portofolio-ldp/kontak"
      />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400 text-black text-xs font-black uppercase tracking-wider mb-3">
          <Send className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Informasi Kontak</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Hubungi Saya
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
          Konsultasikan kebutuhan pembuatan website atau kerja sama digital Anda secara langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Contact Info & Maps */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Contact Card */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-850 shadow-xl space-y-5">
            <div>
              <h2 className="text-lg font-black text-white">
                {contactData.name}
              </h2>
              <p className="text-xs text-yellow-400 font-bold mt-0.5">
                {contactData.title}
              </p>
            </div>

            <div className="space-y-4 pt-2 text-xs">
              {/* WhatsApp Card */}
              <div className="p-4 rounded-xl bg-black border border-neutral-850 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(contactData.whatsappNumber, 'wa')}
                    className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-yellow-400 px-2 py-0.5 rounded-md hover:bg-neutral-900 transition-colors"
                  >
                    {copiedType === 'wa' ? (
                      <>
                        <Check className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-sm text-white font-bold">
                  {contactData.whatsappNumber}
                </p>
                <a
                  href={waDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Chat WhatsApp Sekarang</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-black border border-neutral-850 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(contactData.email, 'email')}
                    className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-yellow-400 px-2 py-0.5 rounded-md hover:bg-neutral-900 transition-colors"
                  >
                    {copiedType === 'email' ? (
                      <>
                        <Check className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-xs text-neutral-200 truncate">
                  {contactData.email}
                </p>
                <a
                  href={`mailto:${contactData.email}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 hover:text-yellow-400 font-bold text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Email</span>
                </a>
              </div>

              {/* Alamat & Maps Card */}
              <div className="p-4 rounded-xl bg-black border border-neutral-850 space-y-2.5">
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Alamat Domisili</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {contactData.address}
                </p>
                <a
                  href={contactData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 hover:text-yellow-400 font-bold text-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Lihat Lokasi di Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Real Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-850 shadow-xl space-y-5">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span>Formulir Konsultasi Proyek</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Isi form di bawah untuk mengirimkan detail rencana website Anda langsung ke WhatsApp atau Email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Nama */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block font-bold text-neutral-300">
                  Nama Lengkap / Nama Bisnis <span className="text-yellow-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Contoh: Toko Berkah Jaya / Denis"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              {/* Email / WhatsApp */}
              <div className="space-y-1.5">
                <label htmlFor="contact-sender" className="block font-bold text-neutral-300">
                  Nomor WhatsApp atau Email Anda <span className="text-yellow-400">*</span>
                </label>
                <input
                  id="contact-sender"
                  type="text"
                  required
                  placeholder="Contoh: 081234567890 atau email@domain.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              {/* Jenis Website */}
              <div className="space-y-1.5">
                <label htmlFor="contact-type" className="block font-bold text-neutral-300">
                  Jenis Website yang Diinginkan
                </label>
                <select
                  id="contact-type"
                  value={formData.websiteType}
                  onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                >
                  <option value="Website Bisnis / UMKM">Website Profil Bisnis / UMKM</option>
                  <option value="Website Kuliner / Resto">Website Menu / Restoran / Kuliner</option>
                  <option value="Website Portofolio Personal">Website Portofolio Personal</option>
                  <option value="Aplikasi Web / Sistem Kasir / Khusus">Aplikasi Web / Sistem POS / Khusus</option>
                  <option value="Lainnya">Lainnya / Konsultasi Dulu</option>
                </select>
              </div>

              {/* Pesan */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block font-bold text-neutral-300">
                  Kebutuhan atau Pesan Tambahan
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Ceritakan gambaran website yang Anda inginkan (misal: butuh domain apa, jumlah menu, atau fitur khusus)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Kirim Pesan ke WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleMailto}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black hover:bg-neutral-900 text-neutral-200 font-bold border border-neutral-700 hover:border-yellow-400 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-yellow-400" />
                  <span>Kirim via Email Client</span>
                </button>
              </div>
            </form>

            <div className="pt-3 border-t border-neutral-850 text-[11px] text-neutral-500 leading-relaxed">
              * Formulir langsung menghubungkan pesan ke aplikasi WhatsApp resmi atau client email tanpa perantara pihak ketiga yang rentan.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
