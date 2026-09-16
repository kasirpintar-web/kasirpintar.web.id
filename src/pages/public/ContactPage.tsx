import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:kasirpintarwebid@gmail.com?subject=${encodeURIComponent(
      `[Kontak Kasir Pintar] ${subject || 'Pertanyaan'}`
    )}&body=${encodeURIComponent(
      `Nama: ${name}\nEmail: ${userEmail}\n\nPesan:\n${message}`
    )}`;
    window.location.href = mailto;
    setSent(true);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      'Halo Kasir Pintar, saya ingin bertanya mengenai aplikasi kasir UMKM di kasirpintar.web.id'
    );
    window.open(`https://wa.me/6282379474173?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE404]/30 border border-yellow-400 text-[#4A2E18] text-xs font-bold uppercase">
            Hubungi Kasir Pintar
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Kami Siap Membantu Anda
          </h1>
          <p className="text-base sm:text-lg text-stone-600">
            Punya pertanyaan seputar penggunaan aplikasi, saran fitur, atau butuh bantuan teknis?
            Tim kami siap merespons dengan cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
            <h2 className="text-xl font-bold text-stone-900">Saluran Resmi</h2>
            <div className="space-y-4 text-sm text-stone-700">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#4A2E18] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase">Email</p>
                  <a
                    href="mailto:kasirpintarwebid@gmail.com"
                    className="font-bold text-stone-900 hover:text-amber-800 transition-colors break-all"
                  >
                    kasirpintarwebid@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase">WhatsApp</p>
                  <a
                    href="https://wa.me/6282379474173"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    082379474173
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">Layanan chat cepat via WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#4A2E18] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase">Alamat</p>
                  <p className="font-bold text-stone-900">Indramayu, Jawa Barat</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Indonesia</p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              className="w-full justify-center gap-2 bg-[#FFE404] text-[#2E1A0C] font-bold"
              onClick={handleOpenWhatsApp}
            >
              <MessageCircle className="w-4 h-4" />
              Chat Langsung via WhatsApp
            </Button>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Kirimkan Pesan</h2>
            <p className="text-xs text-stone-500 mb-6">
              Isi formulir di bawah ini dan kami akan segera membalas email Anda.
            </p>

            {sent && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Aplikasi email Anda telah dibuka. Silakan kirimkan email tersebut.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nama Lengkap"
                placeholder="Contoh: Budi Santoso"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Alamat Email Anda"
                type="email"
                placeholder="nama@tokomu.com"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Input
                label="Subjek / Topik"
                placeholder="Pertanyaan seputar fitur kasir"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 tracking-wide">
                  Pesan Anda
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan atau kebutuhan toko Anda di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/20 focus:border-[#4A2E18]"
                />
              </div>
              <Button type="submit" variant="secondary" className="w-full justify-center gap-2">
                <Send className="w-4 h-4" />
                Kirimkan Pesan Sekarang
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
