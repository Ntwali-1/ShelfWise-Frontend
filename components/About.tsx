"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
    return (
        <section id="about" className="pt-24 px-4 bg-white overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-4"
                >
                    <h2 className="text-5xl font-medium text-black mb-4 font-serif tracking-tighter leading-none">About ImenaPop</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 md:gap-32">
                    <div className="absolute top-7/6 -left-10">
                        <Image
                            src="/Eclipse.png"
                            width={180}
                            height={180}
                            alt="Eclipse"
                            className="object-contain"
                        />
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-[380px] h-[640px]"
                    >
                        <Image
                            src="/MobileImageFrame.png"
                            fill
                            alt="ImenaPop Mobile App"
                            className="object-contain"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="max-w-lg"
                    >
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="absolute -right-40 -top-40 rotate-0 md:block hidden"
                            >
                                <Image src="/UpArrow.png" width={240} height={240} alt="" />
                            </motion.div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6 font-serif">
                                Smart Invitations,<br /> Made Easy
                            </h3>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 font-sans">
                            ImenaPop is a simple web app that helps Imena family members generate polished, ready-to-share invitations. Consistent. Fast. Beautiful. Whether it's for family events, celebrations, or announcements, ImenaPop ensures every invitation is professional, personalized, and instantly shareable.
                        </p>

                        <Link href="/categories">
                            <button className="bg-primary rounded-md hover:bg-primary-dark text-white px-8 py-3 font-semibold transition-all cursor-pointer font-sans hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                                Create
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
