"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { Menu, ShieldAlert, LayoutDashboard, LogOut, User, Building2, Settings, ShoppingBag, Star, Phone, Mail, ChevronDown } from "lucide-react"
import Image from "next/image"
import logoImg from "../../public/logo.png"
import type { Session } from "next-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  session?: Session | null
  cartItemCount?: number
  cmsData?: {
    brandName: string
  }
}

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Katalog", href: "/katalog" },
  { name: "Tentang", href: "/tentang" },
  { name: "Kontak", href: "/kontak" },
]

function getInitials(name?: string | null): string {
  if (!name) return "U"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

function getDashboardLink(role?: string): { href: string; label: string } {
  switch (role) {
    case "ADMIN":
      return { href: "/admin/dashboard", label: "Panel Admin" }
    case "BUSINESS":
      return { href: "/business", label: "Dashboard Bisnis" }
    case "CUSTOMER":
    default:
      return { href: "/customer", label: "Dashboard Saya" }
  }
}

function UserMenu({ session }: { session: Session }) {
  const { user } = session
  const isBusinessPending = user.role === "BUSINESS" && (user as any).businessStatus === "PENDING"
  const initials = getInitials(user.name)
  const dashboard = getDashboardLink(user.role)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id="user-menu-trigger"
          className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-1"
        >
          {isBusinessPending && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          )}
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-blue-950 text-white text-[10px] font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-semibold text-slate-700 hidden sm:block max-w-[100px] truncate">
            {user.name?.split(" ")[0]}
          </span>
          <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="py-3">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <span className={`mt-1.5 inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              user.role === "ADMIN"
                ? "bg-red-100 text-red-700"
                : user.role === "BUSINESS"
                ? "bg-blue-100 text-blue-800"
                : "bg-slate-100 text-slate-600"
            }`}>
              {user.role === "ADMIN" ? "👑 Admin" : user.role === "BUSINESS" ? "🏢 Bisnis" : "👤 Pelanggan"}
            </span>
          </div>
        </DropdownMenuLabel>

        {isBusinessPending && (
          <>
            <DropdownMenuSeparator />
            <div className="mx-1 my-1 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 flex items-start gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] leading-relaxed text-amber-800 font-medium">
                Akun bisnis Anda sedang dalam proses verifikasi.
              </p>
            </div>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={dashboard.href} className="flex items-center gap-2 cursor-pointer" id="user-menu-dashboard">
            {user.role === "ADMIN" ? (
              <Settings className="w-4 h-4 text-slate-400" />
            ) : user.role === "BUSINESS" ? (
              <Building2 className="w-4 h-4 text-slate-400" />
            ) : (
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
            )}
            <span>{dashboard.label}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={user.role === "ADMIN" ? "/admin/dashboard" : `/${user.role.toLowerCase()}/profile`} className="flex items-center gap-2 cursor-pointer" id="user-menu-profile">
            <User className="w-4 h-4 text-slate-400" />
            <span>Profil Saya</span>
          </Link>
        </DropdownMenuItem>

        {user.role !== "ADMIN" && (
          <>
            <DropdownMenuItem asChild>
              <Link href={`/${user.role.toLowerCase()}/reviews`} className="flex items-center gap-2 cursor-pointer" id="user-menu-reviews">
                <Star className="w-4 h-4 text-slate-400" />
                <span>Ulasan Saya</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/customer/complaints`} className="flex items-center gap-2 cursor-pointer" id="user-menu-complaints">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
                <span>Komplain & Retur</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          id="user-menu-logout"
          className="flex items-center gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header({ session, cartItemCount = 0, cmsData }: HeaderProps) {
  const pathname = usePathname()
  const isLoggedIn = !!session?.user
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      {/* TOP BAR — Info kontak ala Excel Rubber */}
      <div className="bg-[#0f2461] text-slate-300 text-xs hidden md:block border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          {/* Left: contact info */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+622112345678"
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <Phone className="w-3 h-3 text-red-400 group-hover:text-red-300 flex-shrink-0" />
              <span>(021) 1234-5678</span>
            </a>
            <a
              href="mailto:info@dutarubbershop.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <Mail className="w-3 h-3 text-red-400 group-hover:text-red-300 flex-shrink-0" />
              <span>info@dutarubbershop.com</span>
            </a>
          </div>
          {/* Right: tagline */}
          <div className="hidden lg:block text-slate-400 italic text-[11px]">
            Distributor Material Karet Industri Terpercaya
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled ? "border-slate-200 shadow-md" : "border-slate-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" id="header-logo">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-950 flex items-center justify-center shadow-md overflow-hidden p-1 shrink-0">
              <Image src={logoImg} alt="Duta Rubber Shop Logo" width={44} height={44} className="object-contain w-full h-full" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-extrabold text-blue-950 tracking-tight leading-none">
                {cmsData?.brandName?.split(" ")[0] || "Duta"}
              </span>
              <span className="text-[10px] font-semibold text-red-600 uppercase tracking-widest leading-none mt-0.5">
                {cmsData?.brandName?.split(" ").slice(1).join(" ") || "Rubber Shop"}
              </span>
            </div>
            <span className="sm:hidden text-sm font-extrabold text-blue-950 tracking-tight truncate max-w-[120px]">
              {cmsData?.brandName || "Duta Rubber"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" id="header-nav">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-blue-950 bg-blue-50"
                      : "text-slate-600 hover:text-blue-950 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-500 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-2" id="header-auth">
            {isLoggedIn ? (
              <>
                {session.user.role !== "ADMIN" && (
                  <Link
                    href="/customer/cart"
                    className="relative p-2 text-slate-500 hover:text-blue-950 hover:bg-slate-50 rounded-lg transition-colors"
                    title="Keranjang Belanja"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-0.5 text-[9px] font-bold text-white bg-red-600 rounded-full border border-white">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </Link>
                )}
                <UserMenu session={session} />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  id="header-login-btn"
                  className="px-4 py-2 text-sm font-semibold text-blue-950 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  id="header-register-btn"
                  className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-600/30 transition-all"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Hamburger + optional avatar */}
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn && (
              <>
                {session.user.role !== "ADMIN" && (
                  <Link
                    href="/customer/cart"
                    className="relative p-2 text-slate-500 hover:text-blue-950 transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-0.5 text-[9px] font-bold text-white bg-red-600 rounded-full border border-white">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </Link>
                )}
                <UserMenu session={session} />
              </>
            )}
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button 
                  className="relative flex flex-col justify-center items-center w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-1 transition-colors" 
                  id="header-mobile-menu" 
                  aria-label="Menu"
                >
                  <span className={`block w-4 h-[2px] bg-slate-600 rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : '-translate-y-[3px]'}`}></span>
                  <span className={`block w-4 h-[2px] bg-slate-600 rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-4 h-[2px] bg-slate-600 rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : 'translate-y-[3px]'}`}></span>
                </button>
              </SheetTrigger>
              
              <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col border-r-0 shadow-2xl">
                <SheetHeader className="p-5 border-b border-slate-100 text-left bg-gradient-to-br from-blue-950 to-blue-900">
                  <SheetTitle asChild>
                    <Link href="/" className="flex items-center gap-2.5 w-fit" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden p-1 shrink-0 border border-white/20">
                        <Image src={logoImg} alt="Duta Rubber Shop Logo" width={36} height={36} className="object-contain w-full h-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-white tracking-tight">{cmsData?.brandName || "Duta Rubber Shop"}</span>
                        <span className="text-[10px] text-blue-200">Material Karet Industri</span>
                      </div>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto py-4 px-3">
                  {/* Contact info mini */}
                  <div className="mb-4 px-2 py-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <a href="tel:+622112345678" className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-950 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span>(021) 1234-5678</span>
                    </a>
                    <a href="mailto:info@dutarubbershop.com" className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-950 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span>info@dutarubbershop.com</span>
                    </a>
                  </div>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive = (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-blue-950 text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-50 hover:text-blue-950"
                          }`}
                        >
                          {isActive && <span className="w-1 h-4 bg-red-500 rounded-full mr-3 shrink-0"></span>}
                          {link.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-blue-950 text-white font-bold text-sm">
                            {getInitials(session.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{session.user.name}</span>
                          <span className="text-xs text-slate-500 truncate">{session.user.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold text-blue-950 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all"
                      >
                        Masuk
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all"
                      >
                        Daftar Sekarang
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  )
}
