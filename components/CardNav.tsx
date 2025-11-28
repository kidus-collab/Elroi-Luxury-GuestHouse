import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, ArrowRight } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    onClick?: () => void;
    color: string;
    image?: string;
}

interface CardNavProps {
    items: NavItem[];
    onClose: () => void;
}

export const CardNav: React.FC<CardNavProps> = ({ items, onClose }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial animation
            gsap.from('.nav-card', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleCardClick = (index: number, item: NavItem) => {
        setActiveCard(index);

        if (item.onClick) {
            item.onClick();
        } else if (item.href) {
            const element = document.querySelector(item.href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Close after a short delay to allow animation
        setTimeout(() => {
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col">
            {/* Header */}
            <div className="p-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border border-elroi-gold flex items-center justify-center font-serif font-bold text-elroi-gold text-xl">E</div>
                    <span className="font-serif font-bold text-xl text-white tracking-widest">ELROI</span>
                </div>
                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-elroi-gold transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Cards Container */}
            <div ref={containerRef} className="flex-1 flex flex-col p-4 gap-2 overflow-hidden">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`nav-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out group ${activeCard === index ? 'flex-[3]' : 'flex-1'
                            }`}
                        style={{ backgroundColor: item.color }}
                        onClick={() => handleCardClick(index, item)}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        {/* Background Image/Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">0{index + 1}</span>
                                <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white transform transition-transform duration-500 ${activeCard === index ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'}`}>
                                    <ArrowRight size={14} />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 transform transition-transform duration-500 origin-left group-hover:scale-105">
                                    {item.label}
                                </h3>
                                <div className={`overflow-hidden transition-all duration-500 ${activeCard === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-white/80 text-sm font-light">
                                        Tap to explore
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
