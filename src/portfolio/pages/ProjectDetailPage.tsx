import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Cpu,
  Target,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { projectsData, contactData } from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { PageSEO } from '../components/PageSEO';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/portofolio-ldp/project" replace />;
  }

  const waConsultMsg = `Halo Logis Denis, saya melihat project "${project.title}" di portofolio Anda. Saya tertarik ingin membuat website serupa.`;
  const waLink = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(waConsultMsg)}`;

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28 bg-black text-neutral-100">
      <PageSEO
        title={`${project.title} — Detail Project`}
        description={project.shortDescription}
        path={`/portofolio-ldp/project/${project.slug}`}
        image={project.screenshotUrl}
      />

      {/* Back to Projects link */}
      <div className="mb-6">
        <Link
          to="/portofolio-ldp/project"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Project</span>
        </Link>
      </div>

      {/* Main Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400 text-black text-xs font-black">
          <span>{project.category}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          {project.title}
        </h1>
        <p className="text-base text-neutral-300 max-w-3xl leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Action button header */}
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-black shadow-lg transition-all hover:scale-[1.02]"
          >
            <span>Buka Website Live</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-yellow-400 text-neutral-200 text-xs sm:text-sm font-bold transition-all"
          >
            <MessageCircle className="w-4 h-4 text-yellow-400" />
            <span>Pesan Website Serupa</span>
          </a>
        </div>
      </div>

      {/* Screenshot Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl mb-10"
      >
        <div className="p-3 bg-black border-b border-neutral-850 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="ml-2 text-[11px] text-neutral-300 font-mono truncate">
              {project.liveUrl}
            </span>
          </div>
          <span className="text-[10px] text-yellow-400 font-bold hidden sm:inline">
            Pratinjau Live Interface
          </span>
        </div>

        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black">
          <SafeImage
            src={project.screenshotUrl}
            alt={`Tampilan Lengkap ${project.title}`}
            className="w-full h-full object-cover sm:object-contain bg-black"
            fallbackTitle={project.title}
            fallbackSubtitle={project.category}
          />
        </div>
      </motion.div>

      {/* Information Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Description, Objective, Features */}
        <div className="md:col-span-8 space-y-8">
          {/* Deskripsi Lengkap */}
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span>Tentang Aplikasi</span>
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Tujuan Project */}
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-yellow-400" />
              <span>Tujuan & Sasaran Project</span>
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.targetObjective}
            </p>
          </div>

          {/* Fitur-Fitur Utama */}
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-yellow-400" />
              <span>Fitur Utama yang Diimplementasikan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-black border border-neutral-850"
                >
                  <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Role, Tech Stack, CTA */}
        <div className="md:col-span-4 space-y-6">
          {/* Peran Saya (Strictly honest as specified) */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-yellow-400">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="text-sm font-black uppercase tracking-wider">Peran Saya</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {project.myRole}
            </p>
          </div>

          {/* Teknologi */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3">
            <div className="flex items-center gap-2 text-yellow-400">
              <Cpu className="w-4 h-4" />
              <h3 className="text-sm font-black uppercase tracking-wider">Teknologi</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-black border border-neutral-800 text-xs text-neutral-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Call to action Card */}
          <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-yellow-400 space-y-3">
            <h3 className="text-sm font-black text-white">
              Ingin website seperti ini?
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Saya siap membantu Anda membangun website bisnis atau aplikasi web kustom dengan paket mulai Rp759.000.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Diskusi Kebutuhan Anda</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
