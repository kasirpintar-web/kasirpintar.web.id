import { ProjectItem, SkillCategory, ServicePackage, ContactInfo } from '../types';

/*
=============================================================================
KOLOM PLACEHOLDER GAMBAR & FOTO YANG MUDAH DIGANTI
Anda dapat mengganti nilai URL di bawah ini kapan saja dengan URL gambar asli Anda.
=============================================================================
*/

// A. SCREENSHOT WEBSITE 1
export const SCREENSHOT_WEBSITE_1 = "https://cdn.phototourl.com/member/2026-09-18-ce9e79d6-e483-4413-8d28-307c172a522e.jpg";

// B. SCREENSHOT WEBSITE 2
export const SCREENSHOT_WEBSITE_2 = "https://cdn.phototourl.com/member/2026-09-18-17bf2666-3b31-4588-b8db-a4a7fd4069d2.jpg";

// C. FOTO PROFIL PNG (HERO & ABOUT)
export const FOTO_PROFIL_PNG = "https://cdn.phototourl.com/member/2026-09-18-974e55b1-67b8-401c-9f0e-6eef12c4b785.png";

// FOTO PENAWARAN JASA WEBSITE
export const FOTO_JASA_PNG = "https://cdn.phototourl.com/member/2026-09-18-4703a5f6-5d57-411d-8d7f-c4292f5c5249.png";

export const portfolioImages = {
  profile: FOTO_PROFIL_PNG,
  services: FOTO_JASA_PNG,
  project1: SCREENSHOT_WEBSITE_1,
  project2: SCREENSHOT_WEBSITE_2,
};

export const contactData: ContactInfo = {
  name: "Logis Denis Prabowo",
  title: "AI-Assisted Web Developer | Website Builder | Digital Creator",
  address: "Lamarantarung, Kecamatan Cantigi, Kabupaten Indramayu, Jawa Barat 45258",
  whatsappNumber: "082379474173",
  whatsappInternational: "6282379474173",
  email: "logisdenisprabowo08022008@gmail.com",
  domain: "https://kasirpintar.web.id/portofolio-ldp",
  googleMapsUrl: "https://maps.app.goo.gl/Z6AKBUnGZ5QFcfvg9",
  defaultWaMessage: "Halo Logis Denis, saya tertarik dengan jasa pembuatan website mulai Rp759.000. Saya ingin berkonsultasi mengenai kebutuhan website saya.",
};

export const aboutData = {
  name: "Logis Denis Prabowo",
  headline: "Building Digital Products with AI-Assisted Development",
  subheadline: "Saya membangun website dan aplikasi web untuk kebutuhan bisnis, personal, dan UMKM dengan memanfaatkan AI sebagai bagian dari proses development.",
  bioParagraphs: [
    "Saya adalah Logis Denis Prabowo, seorang Web Developer yang berfokus pada pembuatan website dan aplikasi web dengan memanfaatkan Artificial Intelligence (AI) sebagai bagian dari proses pengembangan.",
    "Saya mampu membangun aplikasi web dari tahap perencanaan hingga menjadi aplikasi yang dapat digunakan secara nyata, termasuk pengembangan frontend, backend, database, integrasi layanan, deployment, serta pengelolaan hosting.",
    "Dalam proses coding, saya memanfaatkan AI sebagai development assistant untuk membantu menghasilkan, mengembangkan, memperbaiki, dan menyempurnakan kode full-stack. Untuk proses deployment dan pengelolaan layanan web, saya dapat mengerjakannya secara mandiri menggunakan Vercel, Firebase, GitHub, dan Cloudinary.",
    "Saya memiliki ketertarikan pada pengembangan produk digital yang dapat digunakan untuk menyelesaikan kebutuhan nyata, terutama untuk bisnis dan UMKM."
  ],
  education: {
    school: "SMK Mitra Maritim Indramayu",
    major: "Nautika Kapal Penangkap Ikan (NKPI)",
    description: "Lulusan kejuruan maritim yang memiliki kedisiplinan, ketelitian, dan daya adaptasi teknologi tinggi, kini mendedikasikan keahlian dalam rekayasa web modern dan pembangunan produk digital nyata."
  },
  workMethod: [
    {
      title: "Perencanaan Terarah",
      desc: "Menelaah kebutuhan pengguna atau pemilik usaha untuk merumuskan arsitektur fungsional yang tepat sasaran."
    },
    {
      title: "AI-Assisted Engineering",
      desc: "Mengakselerasi penyusunan logika dan antarmuka dengan AI, lalu menguji secara teliti dan menyempurnakannya secara mandiri."
    },
    {
      title: "Integrasi & Deployment Nyata",
      desc: "Menghubungkan layanan cloud, database, dan hosting (Vercel, Firebase, GitHub) hingga website siap diakses publik."
    }
  ]
};

export const projectsData: ProjectItem[] = [
  {
    id: "kasir-pintar",
    slug: "kasir-pintar",
    title: "Kasir Pintar",
    category: "Point of Sale (POS) / Sistem Kasir dan Manajemen Bisnis",
    badge: "POS Web App",
    shortDescription: "Aplikasi POS berbasis web untuk membantu pengelolaan transaksi bisnis, produk, stok, dan laporan keuangan.",
    fullDescription: "Kasir Pintar adalah aplikasi POS berbasis web yang dirancang khusus untuk membantu pemilik bisnis dan UMKM dalam mengelola transaksi harian, mengawasi ketersediaan stok produk, mencatat histori penjualan, hingga menghasilkan laporan finansial yang rapi.",
    targetObjective: "Digitalisasi sistem kasir toko dan UMKM agar pencatatan penjualan dan stok barang tidak lagi dilakukan manual, meminimalisir selisih stok, serta mempercepat proses cetak struk transaksi bagi pelanggan.",
    features: [
      "Sistem kasir / Point of Sale",
      "Manajemen produk",
      "Manajemen stok",
      "Pencatatan transaksi",
      "Laporan keuangan",
      "Pembuatan struk / bill transaksi",
      "Dashboard pengelolaan bisnis",
      "Berbasis web yang responsif"
    ],
    technologies: ["Web App", "Responsive Design", "AI-Assisted Coding", "Database Integration", "Vercel / Cloud Deployment"],
    myRole: "Pengembangan website dan aplikasi dengan bantuan AI, termasuk proses implementasi, pengujian, troubleshooting, dan deployment.",
    liveUrl: "https://www.kasirpintar.web.id",
    screenshotUrl: SCREENSHOT_WEBSITE_1,
  },
  {
    id: "dicelup-ayam-crispy",
    slug: "dicelup-ayam-crispy",
    title: "D'Celup Ayam Crispy",
    category: "Online Food Ordering Application",
    badge: "Food Ordering Web",
    shortDescription: "Aplikasi berbasis web untuk kebutuhan pemesanan makanan secara online dengan alur transaksi praktis.",
    fullDescription: "D'Celup Ayam Crispy adalah aplikasi berbasis web untuk kebutuhan pemesanan makanan secara online. Website dirancang agar pelanggan dapat melihat katalog menu lezat, mengecek rincian harga porsi, dan melakukan proses pemesanan dengan cepat dan mudah langsung dari browser ponsel atau komputer.",
    targetObjective: "Memudahkan pelanggan memesan menu favorit D'Celup Ayam Crispy secara mandiri tanpa harus antre lama, sekaligus menjadi etalase online profesional bagi pemilik usaha kuliner.",
    features: [
      "Sistem pemesanan makanan",
      "Tampilan produk & katalog menu",
      "Informasi detail produk dan varian",
      "Alur pemesanan terstruktur",
      "Responsive interface (mobile-friendly)",
      "Digitalisasi proses pemesanan bisnis"
    ],
    technologies: ["Web Application", "Mobile-First UI", "Order Flow Logic", "AI-Assisted Development", "Online Hosting"],
    myRole: "Pengembangan website dan aplikasi dengan bantuan AI, termasuk proses implementasi, pengujian, troubleshooting, dan deployment.",
    liveUrl: "https://www.dicelupayamcrispy.store",
    screenshotUrl: SCREENSHOT_WEBSITE_2,
  }
];

export const skillCategories: SkillCategory[] = [
  {
    categoryName: "Web Development",
    description: "Fondasi inti pengembangan website yang terstruktur, semantik, dan responsif di berbagai perangkat.",
    iconName: "Code",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "HTTP/HTTPS",
      "Responsive Web Design",
      "Full-Stack Web Development dengan bantuan AI"
    ]
  },
  {
    categoryName: "AI-Assisted Development",
    description: "Pemanfaatan model AI sebagai asisten teknis untuk akselerasi coding, pengujian, dan pemecahan masalah.",
    iconName: "Cpu",
    skills: [
      "AI-Assisted Development",
      "AI-assisted coding",
      "Debugging / troubleshooting dengan bantuan AI",
      "Feature development dengan AI"
    ]
  },
  {
    categoryName: "Deployment & Tools",
    description: "Pengelolaan repositori kode, aset cloud, database, dan platform hosting production mandiri.",
    iconName: "Cloud",
    skills: [
      "GitHub",
      "Vercel",
      "Firebase",
      "Cloudinary",
      "Deployment dan hosting website"
    ]
  },
  {
    categoryName: "Other Skills",
    description: "Kemampuan pendukung profesional untuk kolaborasi, dokumentasi, dan penyelesaian masalah.",
    iconName: "Sparkles",
    skills: [
      "Microsoft Word",
      "Desain Grafis",
      "Komunikasi",
      "Kerja sama tim",
      "Problem solving",
      "Adaptasi teknologi",
      "Belajar mandiri",
      "Manajemen waktu",
      "Ketelitian"
    ]
  }
];

export const serviceData: ServicePackage = {
  title: "Jasa Pembuatan Website",
  startingPrice: "Rp759.000",
  startingPriceRaw: 759000,
  highlight: "Free domain .com atau .id + hosting 1 tahun",
  inclusions: [
    "Pembuatan website sesuai kebutuhan Anda",
    "Free domain .com atau .id pilihan Anda",
    "Hosting aktif selama 1 tahun penuh",
    "Website responsive (tampil rapi di HP, tablet, dan laptop)",
    "Deployment dan konfigurasi hingga website online dan siap diakses"
  ],
  targetAudience: [
    "Pelaku UMKM yang ingin usahanya memiliki kredibilitas online tinggi",
    "Bisnis kuliner, jasa, atau retail yang memerlukan katalog atau form pemesanan",
    "Profesional yang membutuhkan website profil atau portofolio pribadi",
    "Toko atau brand lokal yang ingin menjangkau pelanggan lebih luas"
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: "Konsultasi Kebutuhan",
      description: "Mendiskusikan tujuan website, target audiens, preferensi nama domain, dan fitur yang dibutuhkan."
    },
    {
      stepNumber: 2,
      title: "Penentuan Konsep",
      description: "Menyusun skema halaman, struktur navigasi, serta menyiapkan materi teks dan gambar pendukung."
    },
    {
      stepNumber: 3,
      title: "Development",
      description: "Membangun tampilan antarmuka interaktif dan fungsionalitas website dengan bantuan AI."
    },
    {
      stepNumber: 4,
      title: "Review & Testing",
      description: "Menguji kompatibilitas di berbagai ukuran layar smartphone maupun desktop serta memeriksa alur interaksi."
    },
    {
      stepNumber: 5,
      title: "Deployment & Setup Domain",
      description: "Mengunggah project ke hosting, menghubungkan domain .com / .id resmi, dan mengonfigurasi SSL aman."
    },
    {
      stepNumber: 6,
      title: "Website Online",
      description: "Website resmi online dan siap dibagikan ke calon pelanggan atau mitra bisnis Anda."
    }
  ]
};
