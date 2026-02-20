"use client";

import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { motion } from "framer-motion";



export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #0043FF 1px, transparent 1px), linear-gradient(to bottom, #0043FF 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                ></div>

                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#0043FF0a,transparent)]"></div>

                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #0043FF 2px, transparent 2px), linear-gradient(to bottom, #0043FF 2px, transparent 2px)`,
                        backgroundSize: '200px 200px',
                    }}
                ></div>
            </div>

            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-10 top-2/5 -translate-y-1/3 w-[300px] h-[300px] rotate-20 z-0 hidden lg:block"
            >
                <Image src="/Rectangle-Frame.png" fill alt="bg" className="object-contain" />
            </motion.div>

            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-6 top-3/5 -translate-y-1/2 w-[300px] h-[300px] rotate-0 z-0 hidden lg:block"
            >
                <Image src="/Rectangle-Frame.png" fill alt="bg" className="object-contain" />
            </motion.div>

            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-10 top-1/2 -translate-y-1/2 w-[300px] h-[300px] -rotate-4 z-0 hidden lg:block"
            >
                <Image src="/Rectangle-Frame.png" fill alt="bg" className="object-contain" />
            </motion.div>

            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [12, -12, 12] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-10 top-4/6 -translate-y-1/2 w-[300px] h-[300px] rotate-30 z-0 hidden lg:block"
            >
                <Image src="/Rectangle-Frame.png" fill alt="bg" className="object-contain" />
            </motion.div>


            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
                className="container mx-auto text-center relative z-10 flex flex-col items-center justify-center"
            >
                <div className="inline-block relative mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="absolute -left-40 -top-12 hidden lg:block"
                    >
                        <Image src="/LeftArrow.png" width={70} height={70} alt="" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="absolute -right-40 -top-12 hidden lg:block"
                    >
                        <Image src="/RightArrow.png" width={70} height={70} alt="" />
                    </motion.div>

                    <motion.h1


                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-4xl md:text-5xl lg:text-7xl font-serif text-gray-900 mb-4 tracking-tighter leading-none"
                    >
                        Create Beautiful Invitations
                    </motion.h1>
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-4xl md:text-5xl lg:text-7xl font-serif text-primary leading-none tracking-tighter"
                    >
                        Every <span className="italic">Imena</span> Moment
                    </motion.h2>
                </div>

                <motion.p
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="max-w-2xl mx-auto mt-4 text-black/90 text-sm leading-relaxed font-sans font-normal opacity-80"
                >
                    A simple web app that helps Imena family members generate polished, ready-to-share invitations. Consistent. Fast. Beautiful.
                </motion.p>

                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="mt-14 flex flex-col items-center gap-6"
                >
                    <Link href="/categories">
                        <button className="bg-primary hover:bg-white text-white hover:text-primary px-6 py-3 rounded-md font-medium font-sans transition-all border border-primary shadow-[0_0_35px_rgba(0,67,255,0.5)] hover:shadow-[0_0_35px_rgba(0,67,255,0.5)] text-sm hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2">
                            <Send size={16} />
                            Create an Invitation
                        </button>
                    </Link>
                    <span className="text-xs text-gray-400 font-medium tracking-wide flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></span>
                        Free for all Imena members
                    </span>
                </motion.div>
            </motion.div>

            <div className="absolute inset-0 bottom-10 top-160 blur-[80px] bg-primary/40 h-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
        </section>
    );
}
