import React from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  CheckCircle2,
  Users,
  Clock,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { serviceData, contactData, portfolioImages } from '../data/portfolioData';
import { PageSEO } from '../components/PageSEO';

export const ServicesPage: React.FC = () => {
  const defaultWaUrl = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(contactData.defaultWaMessage)}`;

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28 bg-black text-neutral-100">
      <PageSEO
        title="Jasa Pembuatan Website — Mulai Rp759.000"
        description="Layanan pembuatan website profesional mulai Rp759.000. Sudah termasuk free domain .com/.id, hosting 1 tahun, responsive design, dan deployment siap online."
        path="/portofolio-ldp/jasa"
        image={portfolioImages.services}
      />

      {/* Header Banner */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-yellow-400 text-black text-xs font-black uppercase tracking-wider mb-3">
          <Zap className="w-3.5 h-3.5 fill-black stroke-black" />
          <span>Layanan Resmi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Jasa Pembuatan Website — <span className="text-yellow-400">{serviceData.startingPrice}</span>
        </h1>
        <p className="text-base text-yellow-400 font-bold mt-2">
          {serviceData.highlight}
        </p>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          Bangun kehadiran online bisnis atau profil Anda dengan website yang responsif, cepat diakses, dan langsung aktif dengan domain pilihan Anda.
        </p>
      </div>

      {/* Main Pricing Package Card - Black & Yellow with Unconstrained Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl p-6 sm:p-10 bg-neutral-950 border-2 border-yellow-400 shadow-2xl relative overflow-visible mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-850">
              <div>
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                  Paket Solusi Lengkap
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  Paket Website Starter
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-400">Harga Mulai Dari</span>
                <p className="text-2xl sm:text-3xl font-black text-yellow-400">
                  {serviceData.startingPrice}
                </p>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-neutral-200">
                Apa Saja yang Anda Dapatkan:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceData.inclusions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-black border border-neutral-850"
                  >
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-200 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-black shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Pesan Website Sekarang</span>
              </a>

              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-black hover:bg-neutral-900 text-neutral-200 text-xs sm:text-sm font-bold border border-neutral-700 hover:border-yellow-400 transition-all"
              >
                <HelpCircle className="w-4 h-4 text-yellow-400" />
                <span>Konsultasi Gratis</span>
              </a>
            </div>
          </div>

          {/* Photo Visual Section - Unconstrained with Yellow Backdrop */}
          <div className="lg:col-span-4 flex justify-center items-end relative overflow-visible pt-4">
            <div className="relative flex items-end justify-center w-full max-w-[260px]">
              {/* Yellow background behind photo */}
              <div className="absolute inset-x-2 bottom-0 h-[86%] bg-yellow-400 rounded-2xl -z-10 shadow-xl shadow-yellow-500/20" />
              
              {/* Free-standing unconstrained photo */}
              <img
                src={portfolioImages.services}
                alt="Penawaran Jasa Pembuatan Website Logis Denis Prabowo"
                referrerPolicy="no-referrer"
                className="relative z-10 w-full max-h-72 object-contain drop-shadow-xl"
              />

              <div className="absolute -bottom-3 inset-x-4 py-1.5 px-2 bg-black rounded-lg text-center border border-yellow-400 shadow-md">
                <span className="text-[10px] text-yellow-400 font-black flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3 text-yellow-400" />
                  Domain + Hosting 1 Tahun
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Target Audience Section */}
      <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-850">
        <div className="flex items-center gap-2 mb-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Target Pengguna</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mb-4">
          Siapa yang Cocok Menggunakan Jasa Ini?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {serviceData.targetAudience.map((audience, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-black border border-neutral-850"
            >
              <div className="w-5 h-5 rounded-md bg-yellow-400 text-black flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                {audience}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Step Process Section */}
      <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-850">
        <div className="flex items-center gap-2 mb-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Alur Kerja Terstruktur</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mb-6">
          Proses Pengerjaan Website
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceData.processSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-5 rounded-xl bg-black border border-neutral-850 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center text-xs font-black">
                  0{step.stepNumber}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  Tahap {step.stepNumber}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Box */}
      <div className="p-8 rounded-2xl bg-neutral-950 border border-yellow-400 text-center space-y-4">
        <ShieldCheck className="w-8 h-8 text-yellow-400 mx-auto" />
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Siap Memulai Proyek Website Anda?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
          Hubungi saya langsung via WhatsApp untuk berkonsultasi mengenai kebutuhan domain, struktur halaman, dan konsep tampilan website yang Anda inginkan.
        </p>
        <div className="pt-2">
          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-black shadow-lg transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Hubungi Saya via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
