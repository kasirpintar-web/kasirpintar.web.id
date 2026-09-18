import React from 'react';
import { motion } from 'motion/react';
import { Award, Code2, Cpu, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { PageSEO } from '../components/PageSEO';

export const SkillsPage: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code2 className="w-5 h-5 text-yellow-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-yellow-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-yellow-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28 bg-black text-neutral-100">
      <PageSEO
        title="Keahlian & Teknologi"
        description="Daftar keahlian teknis dan kemampuan profesional Logis Denis Prabowo dalam Web Development, AI-Assisted Development, dan Deployment Tools."
        path="/portofolio-ldp/skill"
      />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400 text-black text-xs font-black uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Kompetensi Teknis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Keahlian & Kemampuan
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
          Kompetensi yang saya kuasai dan aplikasikan secara nyata dalam perancangan, pengembangan, serta deployment aplikasi web modern.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, index) => (
          <motion.div
            key={cat.categoryName}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
            className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-850 hover:border-yellow-400 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">
                    {cat.categoryName}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skill items chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
                {cat.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black border border-neutral-850 hover:border-yellow-400/60 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span className="text-xs text-neutral-200 font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="text-yellow-400 font-bold">Status: Aktif digunakan</span>
              <span>{cat.skills.length} Komponen</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Note on Skill Evaluation */}
      <div className="mt-10 p-5 rounded-2xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-400 leading-relaxed">
        <p className="font-bold text-white mb-1">Pendekatan Profesional:</p>
        <p>
          Keahlian disajikan berdasarkan kapabilitas kerja nyata tanpa persentase angka yang dibuat-buat. Seluruh alat dan teknologi di atas telah diuji dan diterapkan langsung pada proyek-proyek yang dapat diakses secara online.
        </p>
      </div>
    </div>
  );
};
