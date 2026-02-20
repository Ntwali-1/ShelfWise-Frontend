"use client";

import { useState, use, useRef } from "react";
import SimpleHeader from "@/components/SimpleHeader";
import {
    Calendar,
    Tag,
    ChevronDown,
    Download,
    ArrowRightCircle,
    MapPin,
} from "lucide-react";
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

interface CreateInvitationPageProps {
    params: Promise<{ type: string }>;
}

export default function CreateInvitationPage({ params }: CreateInvitationPageProps) {
    const { type } = use(params);
    const isAnnouncement = type === "announcements";
    const cardRef = useRef<HTMLDivElement>(null);
    const template1Ref = useRef<HTMLDivElement>(null);
    const template2Ref = useRef<HTMLDivElement>(null);

    // Template selection state: 1 = Announcement style, 2 = Event Details style
    const [selectedTemplate, setSelectedTemplate] = useState<1 | 2>(isAnnouncement ? 1 : 2);
    const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

    const [formData, setFormData] = useState({
        title: isAnnouncement ? "SATURDAY GATHERING" : "",
        tagline: isAnnouncement ? "Come and Join us for the" : "",
        subfamily: "Imena Family",
        date: "JAN 01 2026",
        time: "9AM | SATURDAY",
        location: "RCA - NYABIHU",
        host: "",
        agenda: isAnnouncement
            ? "Lorem ipsum is simply dummy text of the printing and typesetting industry."
            : "1. Kwakira abashyitsi\n2. Ijambo rishingiye ku muhango\n3. Gusangira"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [isGenerating, setIsGenerating] = useState(false);

    // Cache for color conversions to boost performance
    const colorCache: { [key: string]: string } = {};

    // Helper function to convert any color to rgba
    const convertColorToRgba = (color: string): string => {
        if (!color || color === 'transparent' || color === 'none') return color;
        if (colorCache[color]) return colorCache[color];

        // If it's already rgba/rgb, return as is (and doesn't contain modern functions)
        if (color.startsWith('rgb(') || color.startsWith('rgba(')) return color;

        // If it's a hex color, it's also safe
        if (color.startsWith('#')) return color;

        // Create a temporary element to get computed RGB value
        try {
            const tempDiv = document.createElement('div');
            tempDiv.style.color = color;
            document.body.appendChild(tempDiv);
            const computedColor = window.getComputedStyle(tempDiv).color;
            document.body.removeChild(tempDiv);
            const result = computedColor || 'rgba(0,0,0,0)';
            colorCache[color] = result;
            return result;
        } catch {
            return 'rgba(0,0,0,0)';
        }
    };

    const handleDownloadImage = async () => {
        const targetRef = selectedTemplate === 1 ? template1Ref : template2Ref;
        if (!targetRef.current || isGenerating) return;

        const toastId = toast.loading('Generating your invitation...');

        try {
            setIsGenerating(true);

            // Small delay to ensure rendering is complete
            await new Promise(resolve => setTimeout(resolve, 100));

            const dataUrl = await toPng(targetRef.current, {
                cacheBust: true,
                pixelRatio: 2, // Better quality than default, less memory than 3
                backgroundColor: 'transparent',
            });

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${formData.title.trim() || 'Invitation'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success('Invitation image downloaded successfully!', { id: toastId });
        } catch (error) {
            console.error("Capture Error:", error);
            toast.error('Could not generate the image. Please try again.', { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <SimpleHeader />

            <div className="px-8 py-8 flex flex-row gap-6 min-h-[calc(100vh-120px)]">
                <div className="w-[500px] shrink-0 border border-primary/40 rounded-2xl p-8 bg-[#F4F8FF] shadow-sm flex flex-col font-sans min-h-0">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full border border-primary/20 bg-white flex items-center justify-center p-2">
                            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                                {isAnnouncement ? <Tag className="text-white" size={16} /> : <Calendar className="text-white" size={16} />}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-black font-serif tracking-tight leading-none">
                                {isAnnouncement ? "Announcement" : "Event"}
                            </h2>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Fill in your invitation</p>
                        </div>
                    </div>

                    <div className="space-y-6 grow">
                        {isAnnouncement ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black font-sans">Tagline</label>
                                    <input
                                        type="text"
                                        name="tagline"
                                        value={formData.tagline}
                                        onChange={handleChange}
                                        className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black font-sans ">Event Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black font-sans">Event Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black font-sans">Date</label>
                                <input
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black font-sans">Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-black font-sans">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none"
                            />
                        </div>

                        {!isAnnouncement && (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black font-sans">Host</label>
                                <input
                                    type="text"
                                    name="host"
                                    value={formData.host}
                                    onChange={handleChange}
                                    placeholder="ImenaFamily"
                                    className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-black font-sans">{isAnnouncement ? "Description" : "Agenda/Activities"}</label>
                            <textarea
                                rows={7}
                                name="agenda"
                                value={formData.agenda}
                                onChange={handleChange}
                                className="w-full bg-[#D9E6FF] border border-black/5 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none resize-none"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/20 cursor-pointer font-sans">
                            Done
                            <ArrowRightCircle size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center p-2">
                                <div className="w-full h-full rounded-full bg-primary"></div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-black font-serif leading-none">Live Preview</h2>
                                <p className="text-[8px] font-sans text-gray-400 mt-1 uppercase tracking-wider font-semibold">See your announcement in real time.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative font-sans">
                                <button
                                    onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                                    className="flex items-center justify-between gap-4 border border-black bg-white px-4 py-3 rounded-lg text-[14px] font-bold text-black transition-colors cursor-pointer hover:bg-gray-50"
                                >
                                    Template {selectedTemplate}
                                    <ChevronDown size={14} className="text-gray-900" />
                                </button>
                                {showTemplateDropdown && (
                                    <div className="absolute top-full mt-2 left-0 w-full min-w-[200px] bg-white rounded-lg shadow-lg overflow-hidden z-50">
                                        <button
                                            onClick={() => {
                                                setSelectedTemplate(1);
                                                setShowTemplateDropdown(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left  text-black text-[14px] font-semibold hover:bg-black/5 transition-colors ${selectedTemplate === 1 ? 'bg-black/10' : ''}`}
                                        >
                                            Template 1
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedTemplate(2);
                                                setShowTemplateDropdown(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left text-black text-[14px] font-semibold hover:bg-black/5 transition-colors ${selectedTemplate === 2 ? 'bg-black/10' : ''}`}
                                        >
                                            Template 2
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleDownloadImage}
                                disabled={isGenerating}
                                className={`bg-primary text-white p-3 px-6 rounded-lg font-bold flex items-center gap-3 text-[14px] transition-all cursor-pointer font-sans ${isGenerating ? 'opacity-70 cursor-wait' : 'hover:opacity-90'}`}
                            >
                                {isGenerating ? "Generating..." : "Download Image"}
                                {!isGenerating && <Download size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 border border-primary/40 rounded-2xl bg-[#EAF2FF] relative flex justify-center items-center   overflow-auto">
                        <div ref={cardRef} className="relative inline-block">
                            {selectedTemplate === 1 ? (
                                <>
                                    <div ref={template1Ref} className="w-full">
                                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[460px] aspect-3/4 border border-black/60 bg-white rotate-8 pointer-events-none"></div>
                                        <div className="max-w-[600px] aspect-3/4 bg-[#000E2B] shadow-2xl relative p-8 flex flex-col text-white">
                                            <div className="text-center mb-6 font-serif flex flex-col items-center">
                                                <div className="mb-4 relative w-16 h-16">
                                                    <img src="/Logo.png" alt="Imena Logo" className="object-contain w-full h-full" />
                                                </div>
                                                <h3 className="text-3xl font-black tracking-tighter mb-0.5 uppercase text-[#FFFFFF]">
                                                    Imena<span className="text-[#60A5FA]"> Family</span>
                                                </h3>
                                                <p className="text-[8px] font-medium text-[#9CA3AF] my-2 uppercase tracking-widest leading-none font-sans">Kubw&apos; umurava n&apos; ikizere, imbere hacu heza, ntituzazima</p>
                                            </div>

                                            <div className="relative border-t-3 border-r-3 border-[#FFFFFF] p-4 flex flex-col justify-between m-1 grow">
                                                <div className="absolute top-0 left-0 w-[3px] h-12 bg-[#FFFFFF]"></div>
                                                <div className="relative -left-8 top-12 space-y-6">
                                                    <div className="z-10 relative">
                                                        <p className="text-[12px] font-medium text-[#E5E7EB] mb-2 font-sans">{formData.tagline || "Come and Join us for the"}</p>
                                                        <h2 className="text-[46px] font-black font-serif tracking-tight leading-[1.2] uppercase wrap-break-words text-[#FFFFFF]">
                                                            {formData.title || "SATURDAY GATHERING"}
                                                        </h2>
                                                    </div>

                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#D1D5DB] leading-relaxed max-w-[300px] font-sans font-medium whitespace-pre-wrap">
                                                            {formData.agenda}
                                                        </p>
                                                    </div>

                                                    <div className="mt-2 flex flex-col gap-1 text-[#FFFFFF]">
                                                        <p className="text-2xl font-bold font-serif tracking-tight leading-none uppercase">{formData.time}</p>
                                                        <p className="text-2xl font-bold font-serif tracking-tight leading-none uppercase">{formData.date}</p>
                                                    </div>

                                                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                                        <MapPin size={12} className="text-[#FFFFFF]" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFFFFF] font-sans">{formData.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div ref={template2Ref} className="w-full max-w-[760px] aspect-4/3 relative flex items-center justify-center">
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
                                        <img
                                            src="/BackgroundFrame.png"
                                            alt="Hexagon Frame"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="relative w-full h-full flex overflow-hidden shadow-2xl z-10">
                                        <div className="w-[40%] bg-[#000E2B] relative flex flex-col items-start px-8 py-10">
                                            <div className="w-full mb-8">
                                                <div className="bg-[#000E2B] bg-opacity-25 rounded-2xl p-8 mb-4 border border-[#60A5FA] border-opacity-20 shadow-lg">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 shrink-0">
                                                            <img src="/Logo.png" alt="Imena Logo" className="w-full h-full object-contain drop-shadow-lg" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <h3 className="text-xl font-black text-white font-serif leading-tight tracking-tight">
                                                                <span className="text-white">IMENA</span>
                                                                <span className="text-[#60A5FA]"> FAMILY</span>
                                                            </h3>
                                                            <p className="text-[8px] text-[#9CA3AF] font-sans uppercase tracking-widest mt-1 leading-tight">
                                                                Kubw&apos; umurava n&apos; ikizere, imbere hacu heza, ntituzazima
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute left-[50%] top-[29%] bottom-0 w-[3px] bg-white bg-opacity-90 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                                            <div className="absolute left-1/2 -translate-x-1/2 top-[58%] -translate-y-1/2 w-24 h-24 rounded-full bg-[#000E2B] border-2 border-white border-opacity-40 flex items-center justify-center p-2.5 z-20 shadow-xl">
                                                <img src="/Logo.png" alt="Icon" className="w-full h-full object-contain" />
                                            </div>

                                            <div className="mt-auto w-full text-left opacity-90">
                                                <p className="text-[10px] text-white text-opacity-80 font-sans uppercase font-bold tracking-widest mb-1.5">Hosted by:</p>
                                                <p className="text-base text-white font-serif font-bold">{formData.host || "Imena Family"}</p>
                                            </div>
                                        </div>

                                        <div className="flex-1 bg-white relative flex flex-col px-12 py-12 overflow-hidden">
                                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#000E2B] transform rotate-45 translate-x-14 -translate-y-14"></div>
                                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#000E2B] transform rotate-45 translate-x-12 translate-y-12"></div>

                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="mb-7">
                                                    <h2 className="text-[44px] font-black font-serif text-[#000E2B] leading-[1.1] uppercase tracking-tight">
                                                        {formData.title || "SATURDAY GATHERING"}
                                                    </h2>
                                                </div>

                                                <div className="flex items-center gap-2.5 mb-10">
                                                    <MapPin size={20} className="text-[#000E2B]" />
                                                    <span className="text-sm font-bold text-[#000E2B] font-sans uppercase tracking-wider">
                                                        {formData.location || "RCA - NYABIHU"}
                                                    </span>
                                                </div>

                                                <div className="mb-10">
                                                    <h4 className="text-lg font-bold text-[#000E2B] font-sans mb-5">Agenda/ Activities</h4>
                                                    <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
                                                        {formData.agenda.split('\n').filter(line => line.trim() !== '').map((item, index) => (
                                                            <li key={index} className="flex gap-2.5 items-start">
                                                                <span className="text-xs font-bold text-[#000E2B] font-sans not-italic min-w-[20px]">{index + 1}.</span>
                                                                <span className="text-xs text-[#000E2B] font-sans italic leading-relaxed flex-1">
                                                                    {item.replace(/^\d+\.\s*/, '').trim()}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="mb-auto">
                                                    <p className="text-sm font-bold text-[#000E2B] font-sans mb-2.5">{formData.tagline || "Come and Join us for the"}</p>
                                                    <div className="text-4xl font-black text-[#000E2B] font-serif uppercase tracking-tight">
                                                        {formData.time || "9AM | SATURDAY"}
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-6">
                                                    <div className="bg-[#000E2B] text-white text-base font-bold px-10 py-3.5 rounded-md text-center font-sans uppercase tracking-wider shadow-xl">
                                                        {formData.date || "AUGUST-25-2026"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}