import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LauncherDock } from './components/LauncherDock';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** Portfolio is mounted by the main Kasir Pintar BrowserRouter at /portofolio-ldp/*. */
export default function PortfolioApp() {
  return (
    <div className="portfolio-ldp min-h-screen flex flex-col bg-black text-neutral-100 selection:bg-yellow-400 selection:text-black">
      <ScrollToTop />
      <Header />
      <main className="flex-1 w-full">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="tentang" element={<AboutPage />} />
          <Route path="project" element={<ProjectsPage />} />
          <Route path="project/:slug" element={<ProjectDetailPage />} />
          <Route path="skill" element={<SkillsPage />} />
          <Route path="jasa" element={<ServicesPage />} />
          <Route path="kontak" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <LauncherDock />
    </div>
  );
}
