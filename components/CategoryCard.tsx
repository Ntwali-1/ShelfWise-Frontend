"use client";

import { Check, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
    id: string;
    title: string;
    description: string;
    index: string;
    isActive?: boolean;
    onClick?: () => void;
    Icon: LucideIcon;
}

export default function CategoryCard({ title, description, index, isActive, onClick, Icon }: CategoryCardProps) {
    return (
        <motion.div
            layout
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`relative group cursor-pointer w-full max-w-[320px] h-full`}
        >
            <div className={`absolute -inset-0.5 bg-linear-to-r from-primary to-blue-400 rounded-3xl blur opacity-0 transition-opacity duration-500 ${isActive ? "opacity-30" : "group-hover:opacity-20"}`}></div>

            <div className={`relative flex flex-col h-full bg-white border-2 rounded-3xl p-4 transition-all duration-300 ease-out overflow-hidden ${isActive ? 'border-primary shadow-2xl shadow-primary/20 scale-[1.02]' : 'border-gray-100 shadow-xl shadow-black/5 hover:border-primary/50'}`}>


                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                        <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-primary text-white" : "bg-gray-50 text-primary group-hover:bg-primary/5"}`}>
                            {isActive ? <Check size={24} strokeWidth={3} /> : <Icon size={20} className="opacity-40 group-hover:opacity-100" />}
                        </div>
                    </div>
                </div>

                <div className="grow relative z-10">
                    <h3 className={`text-2xl font-bold font-serif mb-3 transition-colors duration-300 ${isActive ? "text-primary" : "text-gray-900"}`}>
                        {title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-sans line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Bottom Decor */}
                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2">
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${isActive ? "w-12 bg-primary" : "w-6 bg-gray-200 group-hover:w-12 group-hover:bg-primary/30"}`}></div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest font-sans transition-opacity duration-300 ${isActive ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-100 text-gray-400"}`}>
                        Selected
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
