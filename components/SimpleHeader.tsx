"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function SimpleHeader() {
    return (
        <div className="w-full">
            <header className="flex items-center justify-between px-16 py-8">
                <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="text-3xl font-black font-serif text-black tracking-tighter">
                        Imena<span className="text-primary italic">Pop</span>
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] font-sans">
                        One Click • Invite Sent
                    </span>
                </div>
            </header>
            <div className="px-16 py-2">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer font-sans"
                >
                    <MoveLeft size={18} />
                    Goback
                </Link>
            </div>
        </div>
    );
}
