import Link from "next/link"
import Image from "next/image"
import logoImg from "../../public/logo.png"
import { TwitterLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer({ cmsData }: { cmsData?: {
  brandName: string
  description: string
  socialLinks: {
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  newsletterTitle: string
  newsletterDescription: string
  copyrightText: string
} }) {
  return (
    <footer className="bg-[#0c1d50] pt-0 pb-0 mt-auto">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

      {/* CTA Banner */}
      <div className="bg-[#0f2461] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-white mb-1">Butuh Material Karet Khusus?</h3>
            <p className="text-sm text-blue-200">Konsultasikan kebutuhan industri Anda dengan tim ahli kami.</p>
          </div>
          <Link
            href="/kontak"
            className="shrink-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
          >
            Hubungi Kami →
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Brand & About */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden p-1 border border-white/10 shrink-0">
                <Image src={logoImg} alt="Duta Rubber Shop Logo" width={40} height={40} className="object-contain w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-tight leading-none">
                  {cmsData?.brandName?.split(" ")[0] || "Duta"}
                </span>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest leading-none mt-0.5">
                  {cmsData?.brandName?.split(" ").slice(1).join(" ") || "Rubber Shop"}
                </span>
              </div>
            </div>
            <p className="text-sm text-blue-200/80 leading-relaxed max-w-xs mb-6 whitespace-pre-wrap">
              {cmsData?.description || "Platform B2B dan Retail terpercaya untuk produk material karet, gasket, seal, dan perlengkapan industri lainnya."}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {(!cmsData?.socialLinks || cmsData.socialLinks.twitter) && (
                <Link href={cmsData?.socialLinks?.twitter || "#"} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">
                  <TwitterLogoIcon className="w-4 h-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              )}
              {(!cmsData?.socialLinks || cmsData.socialLinks.instagram) && (
                <Link href={cmsData?.socialLinks?.instagram || "#"} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">
                  <InstagramLogoIcon className="w-4 h-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              )}
              {(!cmsData?.socialLinks || cmsData.socialLinks.linkedin) && (
                <Link href={cmsData?.socialLinks?.linkedin || "#"} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">
                  <LinkedInLogoIcon className="w-4 h-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
            </div>
          </div>

          {/* Navigasi */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500 rounded-full inline-block"></span>
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Beranda", href: "/" },
                { label: "Katalog Produk", href: "/katalog" },
                { label: "Tentang Kami", href: "/tentang" },
                { label: "Kontak", href: "/kontak" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-blue-200/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all group">
                    <span className="w-1 h-1 rounded-full bg-red-500/50 group-hover:bg-red-400 transition-colors"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500 rounded-full inline-block"></span>
              Layanan
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Pembelian Eceran", href: "/katalog" },
                { label: "Pembelian B2B", href: "/register" },
                { label: "Pengajuan RFQ", href: "/kontak" },
                { label: "Konsultasi Teknis", href: "/kontak" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-blue-200/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all group">
                    <span className="w-1 h-1 rounded-full bg-red-500/50 group-hover:bg-red-400 transition-colors"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500 rounded-full inline-block"></span>
              Kontak Kami
            </h4>
            <ul className="space-y-4 mb-6">
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-sm text-blue-200/70 leading-relaxed">
                  Jl. Industri Raya No. 45<br />
                  Jakarta Barat, 11440<br />
                  DKI Jakarta, Indonesia
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-blue-200/70">(021) 1234-5678</p>
                  <p className="text-sm text-blue-200/70">+62 812-3456-7890 (WA)</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-red-400" />
                </div>
                <a href="mailto:info@dutarubbershop.com" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  info@dutarubbershop.com
                </a>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-blue-200/70">Senin – Jumat: 08.00 – 17.00</p>
                  <p className="text-sm text-blue-200/70">Sabtu: 08.00 – 13.00</p>
                </div>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Email untuk info penawaran..."
                className="w-full bg-white/5 border border-white/10 text-blue-100 text-xs rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-blue-300/40"
              />
              <button
                type="button"
                className="absolute right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Berlangganan"
              >
                <PaperPlaneIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-300/50">
            © {new Date().getFullYear()} {cmsData?.copyrightText || "Duta Rubber Shop. Hak Cipta Dilindungi."}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="#" className="text-xs text-blue-300/50 hover:text-blue-200 transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="text-xs text-blue-300/50 hover:text-blue-200 transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="text-xs text-blue-300/50 hover:text-blue-200 transition-colors">Sertifikasi</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
