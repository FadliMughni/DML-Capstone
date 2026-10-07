import {
  Building2,
  Award,
  Target,
  TrendingUp,
} from "lucide-react"
import { auth } from "@/lib/auth"
import { getTentangPageContent } from "@/app/actions/cms"
import { CmsTentangEditorSheet } from "@/components/cms/cms-tentang-editor-sheet"
import { TentangHighlightsEditor } from "@/components/cms/tentang-highlights-editor"
import { TentangTeamEditor } from "@/components/cms/tentang-team-editor"

export default async function TentangPage() {
  const session = await auth()
  const isAdmin = session?.user?.role === "ADMIN"
  const cmsData = await getTentangPageContent()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <main className="flex-1 w-full">

        {/* ===================== HERO SECTION ===================== */}
        <section className="relative h-[380px] md:h-[460px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${cmsData.hero.backgroundImageUrl}')` }}
          ></div>
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1d50]/95 via-[#0f2461]/80 to-[#0c1d50]/70 z-10"></div>
          <div className="absolute inset-0 opacity-5 z-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          {/* Red accent bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 z-20"></div>

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Building2 className="w-4 h-4" /> {cmsData.hero.badgeText}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              {cmsData.hero.title}
            </h1>
            <p className="text-base text-blue-100/80 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
              {cmsData.hero.subtitle}
            </p>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none"></div>
        </section>

        {/* ===================== BREADCRUMB-LIKE STATS BAR ===================== */}
        <div className="bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
              {[
                { icon: TrendingUp, value: "15+", label: "Tahun Berpengalaman", color: "text-blue-950" },
                { icon: Award, value: "ISO 9001", label: "Bersertifikat", color: "text-red-600" },
                { icon: Building2, value: "500+", label: "Mitra Perusahaan", color: "text-blue-950" },
                { icon: Target, value: "1000+", label: "Jenis Produk", color: "text-red-600" },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex items-center gap-3 px-6 py-5 hover:bg-slate-50 transition-colors">
                  <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                  <div>
                    <p className={`text-lg font-extrabold ${color} leading-none`}>{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== SEJARAH PERUSAHAAN ===================== */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-[0.15em] mb-3">{cmsData.about.label}</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                  {cmsData.about.title}
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                  <p>{cmsData.about.paragraph1}</p>
                  <p>{cmsData.about.paragraph2}</p>
                  <p>{cmsData.about.paragraph3}</p>
                </div>
                
                {/* Trust indicators */}
                <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-950 to-blue-800 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        C{i}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-700">
                    Dipercaya oleh <span className="font-extrabold text-blue-950">500+</span> Perusahaan<br />
                    <span className="text-xs text-slate-500">di seluruh Indonesia</span>
                  </p>
                </div>
              </div>
              
              {/* Visual card */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/15 border border-slate-200 bg-gradient-to-br from-[#0f2461] to-[#0c1d50] flex items-center justify-center relative">
                  {/* Dot pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                  
                  <Building2 className="w-24 h-24 text-white/20" />
                  
                  {/* Floating stat */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{cmsData.about.statsLabel}</p>
                    <p className="text-2xl font-extrabold text-blue-950">
                      {cmsData.about.statsValue}{" "}
                      <span className="text-base font-medium text-slate-600">{cmsData.about.statsSubtext}</span>
                    </p>
                    <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Small accent cards */}
                <div className="absolute -top-4 -right-4 bg-red-600 text-white rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-wide">Sejak</p>
                  <p className="text-2xl font-extrabold leading-none">2009</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== HIGHLIGHT CARDS ===================== */}
        <TentangHighlightsEditor cmsData={cmsData} isAdmin={isAdmin} />

        {/* ===================== TIM / STRUKTUR MANAJEMEN ===================== */}
        <TentangTeamEditor cmsData={cmsData} isAdmin={isAdmin} />

      </main>

      {isAdmin && <CmsTentangEditorSheet initialData={cmsData} />}
    </div>
  )
}
