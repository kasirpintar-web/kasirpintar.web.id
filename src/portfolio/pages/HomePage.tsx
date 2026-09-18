import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Zap,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import {
  aboutData,
  contactData,
  projectsData,
  serviceData,
  portfolioImages
} from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { PageSEO } from '../components/PageSEO';

export const HomePage: React.FC = () => {
  const waLink = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(contactData.defaultWaMessage)}`;

  return (
    <div className="w-full min-h-screen pb-16 bg-black text-neutral-100">
      <PageSEO
        title="AI-Assisted Web Developer"
        description="Portfolio Logis Denis Prabowo, AI-Assisted Web Developer yang membangun website dan aplikasi web untuk bisnis, UMKM, dan kebutuhan digital."
        path="/portofolio-ldp"
        image={portfolioImages.profile}
      />

      {/* Hero Section with Unconstrained Photo & Yellow Backdrop */}
      <section className="relative overflow-visible pt-8 sm:pt-14 pb-12 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col items-start space-y-5 z-10"
          >
            {/* Status Pill Badge - Black & Yellow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-yellow-400/40 text-xs text-yellow-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="font-semibold tracking-wide">Menerima Jasa Pembuatan Website</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-sm font-bold tracking-wider text-yellow-400 uppercase">
                {contactData.name}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Building Digital Products with{' '}
                <span className="text-yellow-400">
                  AI-Assisted
                </span>{' '}
                Development.
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              {aboutData.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-black shadow-lg shadow-yellow-400/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Konsultasi WhatsApp</span>
              </a>

              <Link
                to="/portofolio-ldp/jasa"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-yellow-400/50 text-yellow-400 text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap className="w-4 h-4" />
                <span>Jasa Website (Mulai Rp759rb)</span>
              </Link>

              <Link
                to="/portofolio-ldp/project"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-sm font-semibold transition-all hover:scale-[1.02]"
              >
                <span>Lihat Project</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* Quick highlight points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 w-full text-xs text-neutral-300">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="font-medium">AI-Assisted Coding</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="font-medium">Vercel Deployment</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="font-medium">Fokus UMKM & Bisnis</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visual: Unconstrained Photo with Yellow Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center items-end relative overflow-visible pt-6 sm:pt-10"
          >
            {/* The Photo Container has NO card border or bounding box constraints */}
            <div className="relative flex items-end justify-center w-full max-w-[340px] sm:max-w-[400px]">
              {/* Background di belakang foto berwarna kuning murni */}
              <div className="absolute inset-x-3 bottom-0 h-[84%] bg-yellow-400 rounded-t-[3.5rem] rounded-b-3xl -z-10 shadow-2xl shadow-yellow-500/20" />
              <div className="absolute inset-x-6 bottom-0 h-[88%] bg-yellow-300/30 rounded-t-[4rem] -z-20 blur-md" />

              {/* Foto berdiri bebas, tidak dibatasi card/kontainer, meluap melewati bagian atas latar kuning */}
              <img
                src={portfolioImages.profile}
                alt="Logis Denis Prabowo"
                referrerPolicy="no-referrer"
                className="relative z-10 w-full max-h-[440px] sm:max-h-[500px] object-contain drop-shadow-2xl select-none"
              />

              {/* Floating label badge below photo */}
              <div className="absolute -bottom-4 z-20 px-4 py-2 bg-black border border-yellow-400 rounded-xl shadow-xl text-center">
                <p className="text-xs font-black text-yellow-400 tracking-tight">{contactData.name}</p>
                <p className="text-[10px] text-neutral-300 font-medium">AI-Assisted Web Developer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: Launcher Quick App Grid - Black & Yellow */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-6 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Launcher Navigation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Akses Cepat Halaman & Project
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-md">
            Pilih tile navigasi untuk menjelajahi detail karya nyata, keahlian, dan paket pembuatan website.
          </p>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Project Kasir Pintar */}
          <Link
            to="/portofolio-ldp/project/kasir-pintar"
            className="group relative flex flex-col p-4 rounded-2xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-yellow-400/80 transition-all duration-200 shadow-md hover:-translate-y-1"
          >
            <div className="w-full h-32 rounded-xl overflow-hidden bg-black border border-neutral-850 mb-3 relative">
              <SafeImage
                src={projectsData[0].screenshotUrl}
                alt="Kasir Pintar Project Screenshot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                fallbackTitle="Kasir Pintar"
                fallbackSubtitle="Sistem POS Bisnis"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black text-[10px] font-bold text-yellow-400 border border-yellow-400/50">
                POS App
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
                Kasir Pintar
              </h3>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
              {projectsData[0].shortDescription}
            </p>
          </Link>

          {/* Tile 2: Project D'Celup Ayam Crispy */}
          <Link
            to="/portofolio-ldp/project/dicelup-ayam-crispy"
            className="group relative flex flex-col p-4 rounded-2xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-yellow-400/80 transition-all duration-200 shadow-md hover:-translate-y-1"
          >
            <div className="w-full h-32 rounded-xl overflow-hidden bg-black border border-neutral-850 mb-3 relative">
              <SafeImage
                src={projectsData[1].screenshotUrl}
                alt="D'Celup Ayam Crispy Project Screenshot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                fallbackTitle="D'Celup Ayam Crispy"
                fallbackSubtitle="Food Ordering Web"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black text-[10px] font-bold text-yellow-400 border border-yellow-400/50">
                Food Ordering
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
                D'Celup Ayam Crispy
              </h3>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
              {projectsData[1].shortDescription}
            </p>
          </Link>

          {/* Tile 3: Jasa Pembuatan Website Banner Tile */}
          <Link
            to="/portofolio-ldp/jasa"
            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-neutral-950 hover:bg-neutral-900 border border-yellow-400/60 hover:border-yellow-400 transition-all duration-200 shadow-md hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-yellow-400 text-black text-[10px] font-black">
                  Mulai Rp759.000
                </span>
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-yellow-400 transition-colors">
                Jasa Pembuatan Website
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Free domain .com/.id + hosting 1 tahun. Siap online dan responsive untuk bisnis & UMKM.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between text-xs font-bold text-yellow-400">
              <span>Lihat Rincian Paket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 4: Keahlian & Teknologi Tile */}
          <Link
            to="/portofolio-ldp/skill"
            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-yellow-400/80 transition-all duration-200 shadow-md hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-yellow-400 text-[10px] font-bold border border-neutral-800">
                  Tech Stack
                </span>
                <Cpu className="w-4 h-4 text-yellow-400" />
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-yellow-400 transition-colors">
                Keahlian & Tools
              </h3>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                HTML5, CSS3, JavaScript, AI-assisted development, GitHub, Vercel, Firebase, dan Cloudinary.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between text-xs font-bold text-neutral-300 group-hover:text-yellow-400">
              <span>Buka Daftar Skill</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Section: Featured Projects Showcase with Live Links */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto my-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-850">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-850">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
                <Code2 className="w-3.5 h-3.5" />
                <span>Portofolio Unggulan</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                Project Aplikasi Web Nyata
              </h2>
            </div>
            <Link
              to="/portofolio-ldp/project"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <span>Lihat semua project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="flex flex-col rounded-2xl bg-black border border-neutral-800 overflow-hidden shadow-md"
              >
                <div className="relative aspect-video bg-neutral-950 overflow-hidden">
                  <SafeImage
                    src={project.screenshotUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    fallbackTitle={project.title}
                    fallbackSubtitle={project.category}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black text-[11px] font-bold text-yellow-400 border border-yellow-400/50">
                    {project.badge}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs text-yellow-400 font-medium mt-0.5">
                      {project.category}
                    </p>
                    <p className="text-xs text-neutral-400 mt-2.5 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-neutral-850 flex items-center justify-between gap-3">
                    <Link
                      to={`/portofolio-ldp/project/${project.slug}`}
                      className="text-xs font-bold text-neutral-200 hover:text-yellow-400 transition-colors flex items-center gap-1"
                    >
                      <span>Detail Project</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-xs font-black text-black transition-all hover:scale-[1.02]"
                    >
                      <span>Lihat Website</span>
                      <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Penawaran Jasa Pembuatan Website Banner - Black & Yellow with Unconstrained Photo */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto my-12">
        <div className="rounded-3xl p-6 sm:p-10 bg-neutral-950 border-2 border-yellow-400/50 shadow-xl relative overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-400 text-black text-xs font-black">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Solusi Website Profesional</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {serviceData.title} — <span className="text-yellow-400">{serviceData.startingPrice}</span>
              </h2>
              <p className="text-sm font-bold text-yellow-400">
                {serviceData.highlight}
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                Dapatkan website representatif untuk usaha atau profil personal Anda. Kami bantu mulai dari perancangan konsep, penyiapan domain, hingga website aktif dan siap diakses secara online.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-black shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Pesan Website / Tanya Dulu</span>
                </a>
                <Link
                  to="/portofolio-ldp/jasa"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-neutral-200 text-xs sm:text-sm font-bold border border-neutral-700 hover:border-yellow-400 transition-all"
                >
                  <span>Lihat Alur Kerja</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Photo Visual on Jasa Offer - Unconstrained with Yellow Backdrop */}
            <div className="lg:col-span-4 flex justify-center items-end relative overflow-visible pt-4">
              <div className="relative flex items-end justify-center w-48 sm:w-56">
                {/* Yellow background behind photo */}
                <div className="absolute inset-x-2 bottom-0 h-[85%] bg-yellow-400 rounded-2xl -z-10 shadow-lg shadow-yellow-400/20" />
                
                {/* Unconstrained photo */}
                <img
                  src={portfolioImages.services}
                  alt="Penawaran Jasa Pembuatan Website"
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-full max-h-56 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
