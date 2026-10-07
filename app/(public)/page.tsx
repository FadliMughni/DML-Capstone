import Link from "next/link"
import {
  ArrowRight,
  Factory,
  ShieldCheck,
  ShoppingBag,
  Star,
  Settings,
  Plus,
  Award,
  Truck,
  Headphones,
  CheckCircle2,
  Users,
  Package,
  BarChart3,
  Building2,
} from "lucide-react"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getLandingPageContent } from "@/app/actions/cms"
import { CmsEditorSheet } from "@/components/cms/cms-editor-sheet"
import { ValuePropsEditor } from "@/components/cms/value-props-editor"
import { AddToCartIconBtn } from "@/components/shared/AddToCartIconBtn"
import { toPublicImageUrl } from "@/lib/blob"

export default async function LandingPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const userRole = session?.user?.role
  const dashboardHref =
    userRole === "ADMIN"
      ? "/admin/dashboard"
      : userRole === "BUSINESS"
        ? "/business"
        : "/customer"

  const cmsData = await getLandingPageContent()

  // Fetch featured products dynamically
  const featuredProducts = await prisma.product.findMany({
    where: { isActive: true },
    take: 4,
    include: {
      images: {
        take: 1,
        orderBy: { displayOrder: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <main className="flex-1 flex flex-col">

        {/* ===================== HERO SECTION ===================== */}
        <section className="relative min-h-[88vh] md:min-h-[82vh] flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${cmsData.hero.backgroundImageUrl}')` }}
          ></div>
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1d50]/95 via-[#0f2461]/80 to-[#0c1d50]/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d50]/60 via-transparent to-transparent"></div>
          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/40 text-red-200 text-xs sm:text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-red-400" /> {cmsData.hero.badgeText}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-5xl drop-shadow-lg">
              {cmsData.hero.titlePart1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">
                {cmsData.hero.titlePart2Gradient}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              {cmsData.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
              <Link
                href="/register"
                id="hero-catalog-btn"
                className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-[0_0_40px_-8px_rgba(220,38,38,0.7)] hover:shadow-[0_0_60px_-10px_rgba(220,38,38,0.9)] transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                {cmsData.hero.ctaPrimaryText} <ArrowRight className="w-5 h-5" />
              </Link>

              {isLoggedIn ? (
                <Link
                  href={dashboardHref}
                  id="hero-dashboard-btn"
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  {cmsData.hero.ctaSecondaryLoggedInText} <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  id="hero-b2b-btn"
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-0.5"
                >
                  {cmsData.hero.ctaSecondaryLoggedOutText}
                </Link>
              )}
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm w-full max-w-3xl">
              {[
                { value: "500+", label: "Perusahaan Mitra" },
                { value: "1000+", label: "Jenis Produk" },
                { value: "15+", label: "Tahun Pengalaman" },
                { value: "24/7", label: "Dukungan Pelanggan" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 px-4 py-5 text-center hover:bg-white/10 transition-colors">
                  <p className="text-2xl font-extrabold text-white mb-0.5">{stat.value}</p>
                  <p className="text-xs text-blue-200/70 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div>
        </section>

        {/* ===================== VALUE PROPOSITIONS ===================== */}
        <ValuePropsEditor cmsData={cmsData} isAdmin={userRole === "ADMIN"} />

        {/* ===================== KENAPA PILIH KAMI ===================== */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-[0.15em] mb-3">Keunggulan Kami</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                  Mengapa Memilih{" "}
                  <span className="text-blue-950">Duta Rubber Shop?</span>
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8 max-w-lg">
                  Kami adalah mitra industri terpercaya yang menyediakan material karet berkualitas tinggi dengan standar internasional untuk berbagai sektor industri di Indonesia.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      icon: Award,
                      title: "Bersertifikat SNI & ISO",
                      desc: "Produk kami memenuhi standar kualitas nasional dan internasional.",
                    },
                    {
                      icon: Truck,
                      title: "Pengiriman Cepat",
                      desc: "Jaringan distribusi ke seluruh wilayah Indonesia.",
                    },
                    {
                      icon: Headphones,
                      title: "Konsultasi Teknis",
                      desc: "Tim ahli siap membantu menentukan spesifikasi produk terbaik.",
                    },
                    {
                      icon: Package,
                      title: "Stok Lengkap",
                      desc: "Ribuan SKU produk karet siap kirim dari gudang kami.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-950 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors shadow-sm">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/tentang"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-950 hover:text-red-600 transition-colors group"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right: visual card */}
              <div className="relative">
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-[#0f2461] to-[#0c1d50] rounded-3xl p-8 text-white overflow-hidden shadow-2xl shadow-blue-900/30">
                  {/* Decorative */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full translate-y-10 -translate-x-10"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center mb-6 shadow-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-3 leading-tight">
                      Platform B2B & Retail
                      <br />
                      <span className="text-red-300">Terintegrasi</span>
                    </h3>
                    <p className="text-blue-200/80 text-sm leading-relaxed mb-6">
                      Daftar sebagai pelanggan bisnis dan nikmati harga khusus, kredit terms, dan layanan priority untuk pembelian dalam jumlah besar.
                    </p>

                    <div className="space-y-3 mb-6">
                      {[
                        "Harga B2B spesial untuk mitra bisnis",
                        "Kemudahan pengajuan Purchase Order",
                        "Faktur & dokumen resmi tersedia",
                        "Dukungan teknis prioritas",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <span className="text-sm text-blue-100/80">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg"
                    >
                      Daftar Akun Bisnis <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Floating stat cards */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900 leading-none">500+</p>
                    <p className="text-xs text-slate-500 mt-0.5">Perusahaan Terdaftar</p>
                  </div>
                </div>
                <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-950" />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900 leading-none">1000+</p>
                    <p className="text-xs text-slate-500 mt-0.5">SKU Produk Aktif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== FEATURED PRODUCTS ===================== */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-[0.15em] mb-2">— Produk Unggulan</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Jelajahi Pilihan Terbaik Kami</h2>
            </div>
            <Link href="/katalog" className="text-sm font-semibold text-blue-950 hover:text-red-600 flex items-center gap-1 transition-colors group" id="see-all-products-link">
              Lihat Semua Produk <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${userRole === "ADMIN" ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
            {userRole === "ADMIN" && (
              <Link href="/admin/products/new" className="group bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-950 hover:bg-blue-50/30 transition-all duration-300 flex flex-col items-center justify-center min-h-[380px] p-6 text-center cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-950 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300 mb-4 border border-slate-200">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-700 group-hover:text-blue-950 transition-colors">Tambah Produk Baru</h3>
                <p className="text-xs text-slate-500 mt-2">Tambahkan produk baru ke dalam katalog langsung dari halaman ini.</p>
              </Link>
            )}

            {featuredProducts.map((product) => {
              const avgRating = '0.0'
              const priceDisplay = product.price
                ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(product.price))
                : "Hubungi Kami"
              const imageUrl = toPublicImageUrl(product.images[0]?.url)

              return (
                <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <Link href={`/katalog/${product.slug}`} className="block aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-950/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0" />
                    ) : (
                      <Factory className="w-16 h-16 text-slate-300 group-hover:scale-110 transition-transform duration-500 relative z-0" />
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm z-20 border border-slate-100">
                      {product.sku}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-950/50 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-slate-600">{avgRating === '0.0' ? 'Baru' : avgRating}</span>
                    </div>
                    <Link href={`/katalog/${product.slug}`} className="block mb-1 group-hover:text-blue-950 transition-colors">
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 min-h-[32px] leading-relaxed">{product.description || "Tidak ada deskripsi tersedia untuk produk ini."}</p>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-base font-extrabold text-blue-950">{priceDisplay}</span>
                      {isLoggedIn ? (
                        userRole === "ADMIN" ? (
                          <Link
                            href={`/admin/products?productId=${product.id}`}
                            className="w-8 h-8 rounded-xl bg-slate-100 text-blue-950 flex items-center justify-center hover:bg-blue-950 hover:text-white transition-colors shrink-0"
                            title="Kelola Produk di Admin"
                          >
                            <Settings className="w-4 h-4" />
                          </Link>
                        ) : (
                          <AddToCartIconBtn productId={product.id} />
                        )
                      ) : (
                        <Link
                          href={`/login?callbackUrl=/katalog/${product.slug}`}
                          id={`product-login-${product.id}`}
                          className="w-8 h-8 rounded-xl bg-blue-50 text-blue-950 flex items-center justify-center hover:bg-blue-950 hover:text-white transition-colors shrink-0"
                          title="Masuk untuk membeli"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {featuredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-semibold">Belum ada produk unggulan saat ini.</p>
                <p className="text-sm text-slate-400 mt-1">Produk akan muncul di sini setelah ditambahkan.</p>
              </div>
            )}
          </div>
        </section>

        {/* ===================== INDUSTRI YANG DILAYANI ===================== */}
        <section className="py-20 bg-[#0f2461] relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-red-400 uppercase tracking-[0.15em] mb-3">Sektor Industri</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Melayani Berbagai Sektor Industri
              </h2>
              <p className="text-blue-200/70 max-w-2xl mx-auto text-sm leading-relaxed">
                Produk kami digunakan oleh berbagai industri besar di Indonesia untuk memastikan operasional yang andal dan efisien.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Manufaktur", icon: "🏭" },
                { name: "Otomotif", icon: "🚗" },
                { name: "Migas & Petrokimia", icon: "⚙️" },
                { name: "Konstruksi", icon: "🏗️" },
                { name: "Pertambangan", icon: "⛏️" },
                { name: "Farmasi", icon: "💊" },
              ].map((sector) => (
                <div
                  key={sector.name}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:border-red-500/30 transition-all group cursor-default"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{sector.icon}</div>
                  <p className="text-xs font-semibold text-blue-100/80 leading-tight">{sector.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/30 hover:-translate-y-0.5 text-sm"
              >
                Diskusikan Kebutuhan Anda <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {userRole === "ADMIN" && (
          <CmsEditorSheet initialData={cmsData} />
        )}
      </main>
    </div>
  )
}
