"use client";

import Link from "next/link";
import { MoveLeft, Sparkles, Rocket, Bell } from "lucide-react";

export default function ComingSoonPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="max-w-2xl w-full text-center z-10">
                <div className="relative mb-12 inline-block">
                    <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary animate-bounce shadow-primary/20">
                        <Rocket size={48} />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-tight">
                    Coming <span className="text-primary italic">Soon</span>
                </h1>
                <p className="text-md text-gray-500 font-sans mb-12 max-w-lg mx-auto leading-relaxed">
                    We're building something special to make your family moments even more memorable. This feature is currently in the works.
                </p>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/categories"
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-md font-semibold font-sans transition-all hover:bg-primary/80 hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
                    >
                        <MoveLeft size={20} />
                        Back to Categories
                    </Link>

                    <button
                        className="flex items-center gap-3 px-8 py-4 border-2 border-primary text-primary rounded-md font-bold font-sans transition-all hover:bg-primary/5 hover:scale-105 active:scale-95 shadow-lg shadow-primary/5 cursor-pointer"
                    >
                        <Bell size={20} />
                        Notify Me
                    </button>
                </div>
            </div>
        </main>
    );
}
