
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Coffee, Bath, Tv, Car, Utensils, Shirt, ShieldCheck, MapPin, Play, Pause } from 'lucide-react';

// --- VIDEO TOUR COMPONENT ---
export const VideoTour: React.FC = () => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-elroi-gold uppercase">Experience</span>
                    <h2 className="font-serif text-4xl md:text-5xl mt-3 text-white">Video Tour</h2>
                </div>
                <p className="text-stone-400 max-w-md text-right md:text-right mt-4 md:mt-0 font-light">
                    Take a virtual walk through our furnished apartments.
                </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-stone-800">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover opacity-80"
                    loop
                    playsInline
                    poster="/images/hero-4.jpg"
                    src="/videos/tour.mp4"
                ></video>

                {/* Custom Overlay Controls */}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white hover:scale-110 hover:bg-elroi-gold hover:border-elroi-gold transition-all duration-300 group"
                    >
                        {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-2" />}
                    </button>
                </div>

                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-sm text-white text-xs tracking-wider uppercase border-l-2 border-elroi-gold">
                    Elroi Guest House • Megenagna
                </div>
            </div>
        </div>
    );
};

// --- GALLERY GRID (Updated Assets) ---
// Using images that closely match the user's provided photos:
// 1. Sage Green Sofa / Living Room
// 2. White Building Exterior
// 3. Black Sink Bathroom
// 4. White Bedroom
const galleryItems = [
    {
        id: 1,
        type: 'large',
        title: "Executive Living Room",
        desc: "Spacious living area with green velvet sofa and modern entertainment.",
        img: "/images/living-room.jpg"
    },
    {
        id: 2,
        type: 'tall',
        title: "Modern Kitchen",
        desc: "Fully equipped with appliances and warm LED lighting.",
        img: "/images/kitchen.jpg"
    },
    {
        id: 3,
        type: 'standard',
        title: "Luxury Bathroom Sink",
        desc: "Designer black and gold marble sink with premium fixtures.",
        img: "/images/bathroom-sink.jpg"
    },
    {
        id: 4,
        type: 'standard',
        title: "Rainfall Shower",
        desc: "Modern shower system with overhead rainfall feature.",
        img: "/images/shower.jpg"
    },
    {
        id: 5,
        type: 'wide',
        title: "Living & Dining Space",
        desc: "Open concept design with dining table and entertainment center.",
        img: "/images/living-room.jpg"
    },
    {
        id: 6,
        type: 'standard',
        title: "Laundry Facilities",
        desc: "In-unit washer with ample storage space.",
        img: "/images/laundry.jpg"
    },
    {
        id: 7,
        type: 'standard',
        title: "Kitchen Amenities",
        desc: "Kettle, microwave, and cooking essentials provided.",
        img: "/images/kitchen.jpg"
    },
    {
        id: 8,
        type: 'tall',
        title: "Spa-Like Bathroom",
        desc: "Premium black fixtures with gold accents.",
        img: "/images/bathroom-sink.jpg"
    },
    {
        id: 9,
        type: 'standard',
        title: "Refreshing Shower",
        desc: "Modern tiling with high-pressure shower system.",
        img: "/images/shower.jpg"
    }
];

export const GalleryGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {galleryItems.map((item) => (
                <div
                    key={item.id}
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md 
                        ${item.type === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                        ${item.type === 'wide' ? 'md:col-span-2' : ''}
                        ${item.type === 'tall' ? 'md:row-span-2' : ''}
                    `}
                >
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-white font-serif text-2xl mb-2">{item.title}</h3>
                            <div className="w-10 h-0.5 bg-elroi-gold mx-auto mb-3"></div>
                            <p className="text-white/80 text-sm font-light">{item.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- AMENITY LIST ---
export const AmenityList: React.FC = () => {
    const amenities = [
        { icon: Wifi, label: "High-Speed Wi-Fi" },
        { icon: Coffee, label: "Tea & Coffee Maker" },
        { icon: Bath, label: "Hot Water Shower" },
        { icon: Tv, label: "Smart TV (Netflix)" },
        { icon: Utensils, label: "Full Kitchen" },
        { icon: Shirt, label: "Laundry Service" },
        { icon: Car, label: "Secure Parking" },
        { icon: ShieldCheck, label: "24/7 Security" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            {amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[#F9F8F4] flex items-center justify-center text-stone-400 group-hover:bg-elroi-gold group-hover:text-white transition-all duration-300">
                        <item.icon size={20} />
                    </div>
                    <span className="text-stone-600 text-sm font-medium tracking-wide group-hover:text-stone-900 transition-colors">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

// --- LOCATION MAP PLACEHOLDER ---
export const LocationMap: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#E5E5E5] text-stone-500 p-8 text-center relative overflow-hidden group">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-30 grayscale mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20"
                style={{
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/Addis_Ababa_map.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-2xl mb-6 relative">
                    <MapPin size={40} className="text-elroi-gold animate-bounce" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/20 blur-sm rounded-full"></div>
                </div>
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-xs border-t-4 border-elroi-gold">
                    <h3 className="font-serif text-xl text-stone-900 mb-2 font-bold">Elroi Guest House</h3>
                    <p className="text-sm text-stone-600 mb-1">Megenagna Area</p>
                    <p className="text-xs text-stone-500">Next to Admas University</p>
                    <a href="https://www.google.com/maps/@9.0186027,38.7996666,18.25z?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="inline-block mt-4 text-xs font-bold text-elroi-gold uppercase tracking-wider hover:underline">
                        Get Directions
                    </a>
                </div>
            </div>
        </div>
    );
};
