"use client";

import { motion, Variants } from "framer-motion";
import { Copy, PenTool, Share2 } from "lucide-react";

const steps = [
    {
        title: "Fill & Create",
        description:
            "Enter your event details—title, date, time, and agenda. Our smart system organizes everything into a polished, professional format instantly.",
        step: "01",
        icon: PenTool,
    },
    {
        title: "Generate Invite",
        description:
            "ImenaPop automatically crafts a stunning invitation featuring your family branding. No design skills needed—just pure elegance.",
        step: "02",
        icon: Copy,
    },
    {
        title: "Download & Share",
        description:
            "Get your invitation as a high-quality image or PDF. Share it instantly with friends and family across any platform with a single click.",
        step: "03",
        icon: Share2,
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="py-20 md:py-32 px-4 bg-white relative overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="container mx-auto relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-black mb-6 font-serif tracking-tighter">
                        How It Works
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            className="relative group "
                        >
                            <div className="relative z-10 h-full bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col items-start overflow-hidden cursor-pointer">
                                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-blue-50/80 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="flex items-center justify-between w-full mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <step.icon size={26} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-6xl font-serif text-gray-100 font-bold group-hover:text-blue-50 transition-colors duration-300 select-none">
                                        {step.step}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-semibold text-black mb-4 font-serif group-hover:text-primary transition-colors duration-300">
                                    {step.title}
                                </h3>

                                <p className="text-gray-500 leading-relaxed relative z-10">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}