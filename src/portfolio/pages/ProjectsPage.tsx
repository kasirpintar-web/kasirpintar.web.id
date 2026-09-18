import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Briefcase, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { PageSEO } from '../components/PageSEO';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 max-w-6xl mx-auto pb-28 bg-black text-neutral-100">
      <PageSEO
        title="Daftar Project Portofolio"
        description="Jelajahi aplikasi web nyata yang dibangun oleh Logis Denis Prabowo, seperti Kasir Pintar (POS) dan D'Celup Ayam Crispy."
        path="/portofolio-ldp/project"
      />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400 text-black text-xs font-black uppercase tracking-wider mb-3">
          <Briefcase className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Koleksi Karya</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Project Aplikasi Web
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
          Berikut adalah aplikasi web fungsional yang telah saya kembangkan dengan bantuan AI dan siap digunakan secara langsung.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col rounded-2xl bg-neutral-950 border border-neutral-850 overflow-hidden shadow-xl hover:border-yellow-400 transition-all group"
          >
            {/* Screenshot Container */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden border-b border-neutral-850">
              <SafeImage
                src={project.screenshotUrl}
                alt={`Screenshot ${project.title}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackTitle={project.title}
                fallbackSubtitle={project.category}
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black text-xs font-black text-yellow-400 border border-yellow-400/60 shadow-md">
                {project.badge}
              </div>
            </div>

            {/* Content info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold text-yellow-400">
                  {project.category}
                </span>
                <h2 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
                  {project.shortDescription}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Teknologi & Fokus:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-black border border-neutral-800 text-[11px] text-neutral-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Peran Saya preview */}
              <div className="p-3.5 rounded-xl bg-black border border-neutral-850 text-xs text-neutral-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <p className="line-clamp-2">
                  <span className="font-bold text-white">Peran:</span> {project.myRole}
                </p>
              </div>

              {/* Actions: Live Demo + Detail */}
              <div className="pt-3 border-t border-neutral-850 flex items-center justify-between gap-3">
                <Link
                  to={`/portofolio-ldp/project/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-neutral-200 hover:text-yellow-400 text-xs font-bold transition-all border border-neutral-700 hover:border-yellow-400"
                >
                  <span>Detail Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Lihat Website</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
