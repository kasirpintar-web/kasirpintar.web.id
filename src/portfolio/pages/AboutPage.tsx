import React from 'react';
import { motion } from 'motion/react';
import { Compass, CheckCircle2, ShieldCheck, MessageCircle, MapPin, Mail } from 'lucide-react';
import { aboutData, contactData, portfolioImages } from '../data/portfolioData';
import { PageSEO } from '../components/PageSEO';

export const AboutPage: React.FC = () => {
  const waLink = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(contactData.defaultWaMessage)}`;

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28 bg-black text-neutral-100">
      <PageSEO
        title="Tentang Saya"
        description="Pelajari latar belakang Logis Denis Prabowo, AI-Assisted Web Developer lulusan SMK Mitra Maritim Indramayu yang fokus membangun produk digital nyata."
        path="/portofolio-ldp/tentang"
        image={portfolioImages.profile}
      />

      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400 text-black text-xs font-black uppercase tracking-wider mb-3">
          <span>Biografi & Profil</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Tentang Logis Denis Prabowo
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
          AI-Assisted Web Developer, Website Builder, dan Digital Creator berbasis di Indramayu, Jawa Barat.
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Unconstrained Photo with Bold Yellow Backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Unconstrained Photo Section - NOT wrapped in a card */}
          <div className="relative flex items-end justify-center w-full max-w-[340px] mx-auto pt-6 overflow-visible">
            {/* Background di belakang foto berwarna kuning */}
            <div className="absolute inset-x-2 bottom-0 h-[86%] bg-yellow-400 rounded-t-[3.5rem] rounded-b-2xl -z-10 shadow-2xl shadow-yellow-500/20" />
            <div className="absolute inset-x-5 bottom-0 h-[89%] bg-yellow-300/30 rounded-t-[4rem] -z-20 blur-md" />

            {/* Foto berdiri bebas, tidak dibatasi card/kontainer kotak */}
            <img
              src={portfolioImages.profile}
              alt="Foto Profil Logis Denis Prabowo"
              referrerPolicy="no-referrer"
              className="relative z-10 w-full max-h-[420px] object-contain drop-shadow-2xl select-none"
            />
          </div>

          {/* Identity details box */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3">
            <div>
              <h2 className="text-base font-black text-white">{contactData.name}</h2>
              <p className="text-xs text-yellow-400 font-bold mt-0.5">{contactData.title}</p>
            </div>
            <div className="pt-3 border-t border-neutral-850 space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>{contactData.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="truncate">{contactData.email}</span>
              </div>
            </div>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-black shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Hubungi via WhatsApp</span>
          </a>
        </motion.div>

        {/* Right: Bio & Background details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Bio Paragraphs */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-4 shadow-sm">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span>Latar Belakang & Pendekatan</span>
            </h2>
            <div className="space-y-3.5 text-sm text-neutral-300 leading-relaxed">
              {aboutData.bioParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          {/* Pendidikan */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3 shadow-sm">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-yellow-400" />
              <span>Riwayat Pendidikan</span>
            </h2>
            <div className="p-4 rounded-xl bg-black border border-neutral-850">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-white">
                  {aboutData.education.school}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-neutral-900 text-yellow-400 font-bold border border-neutral-800 max-w-fit">
                  Pendidikan Kejuruan
                </span>
              </div>
              <p className="text-xs font-semibold text-yellow-400 mt-1">
                Jurusan: {aboutData.education.major}
              </p>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {aboutData.education.description}
              </p>
            </div>
          </div>

          {/* Prinsip & Cara Kerja Saya */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-4 shadow-sm">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>Prinsip & Cara Saya Bekerja</span>
            </h2>

            <div className="space-y-3">
              {aboutData.workMethod.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-black border border-neutral-850"
                >
                  <div className="w-6 h-6 rounded-md bg-yellow-400 flex items-center justify-center text-xs font-black text-black shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fokus Saat Ini */}
          <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-yellow-400/60">
            <h2 className="text-sm font-black text-yellow-400 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>Fokus Saat Ini</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Membantu bisnis lokal, pelaku UMKM, dan profesional memiliki kehadiran web resmi yang fungsional, cepat, dan siap dipakai melalui layanan pembuatan website mulai Rp759.000 (termasuk free domain .com/.id dan hosting 1 tahun).
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
