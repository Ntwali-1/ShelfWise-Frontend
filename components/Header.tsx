"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRightCircle } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
                : "bg-transparent py-6 md:py-8"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3 relative z-50">
                    <div className="flex flex-col items-start leading-none gap-0.5">
                        <span className="text-2xl md:text-3xl font-black font-serif text-black tracking-tighter">
                            Imena<span className="text-primary italic">Pop</span>
                        </span>
                        <span className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] font-sans">
                            One Click • Invite Sent
                        </span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-8 px-12 py-3 border-[1.5px] border-primary/40 rounded-md shadow-sm bg-white font-sans">
                    <Link href="#home" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        Home
                    </Link>
                    <Link href="#about" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        About us
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        How It Works
                    </Link>
                </nav>

                <div className="hidden md:block">
                    <Link href="/categories">
                        <button className="flex items-center gap-2 px-6 py-2.5 border-[1.5px] border-primary/40 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-all cursor-pointer font-sans">
                            Get Started
                            <ArrowRightCircle size={20} className="text-primary" />
                        </button>
                    </Link>
                </div>

                <button
                    className="md:hidden relative z-50 p-2 text-black"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="flex flex-col gap-1.5 w-6">
                        <span className={`block w-full h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                        <span className={`block w-full h-0.5 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
                        <span className={`block w-full h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                    </div>
                </button>

                <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center pt-40 gap-8 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                    <nav className="flex flex-col items-center gap-6 font-sans text-black/70 font-semibold text-lg">
                        <Link href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>About us</Link>
                        <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
                    </nav>
                    <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-md text-lg font-medium shadow-lg shadow-primary/30">
                            Get Started
                            <ArrowRightCircle size={24} />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
