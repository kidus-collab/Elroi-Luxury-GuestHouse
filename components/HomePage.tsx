/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSlideshow } from './QuantumScene';
import { GalleryGrid, AmenityList, LocationMap, VideoTour } from './Diagrams';
import { CardNav } from './CardNav';
import { Menu, X, Phone, MapPin, Star, ArrowRight, Instagram, Facebook, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated Text Component for Hero
const AnimatedText: React.FC = () => {
    const words = ['Luxury', 'Guest', 'House'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 3000); // Change word every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 90 }}
                transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="text-elroi-gold italic inline-block"
                style={{ transformOrigin: 'center center' }}
            >
                {words[currentIndex]}
            </motion.span>
        </AnimatePresence>
    );
};

export const HomePage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const handleBookNow = () => {
        navigate('/booking');
    };

    return (
        <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-elroi-gold selection:text-white font-sans">

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-serif font-bold text-2xl ${scrolled ? 'border-elroi-gold text-elroi-gold' : 'border-white text-white'}`}>E</div>
                        <div className="flex flex-col">
                            <span className={`font-serif font-bold text-xl tracking-widest leading-none ${scrolled ? 'text-stone-900' : 'text-white'}`}>
                                ELROI
                            </span>
                            <span className={`text-[0.6rem] uppercase tracking-[0.2em] ${scrolled ? 'text-stone-500' : 'text-white/80'}`}>
                                Luxury Guesthouse
                            </span>
                        </div>
                    </div>

                    <div className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wide ${scrolled ? 'text-stone-600' : 'text-white/90'}`}>
                        <a href="#about" onClick={scrollToSection('about')} className="hover:text-elroi-gold transition-colors cursor-pointer uppercase">About</a>
                        <a href="#video" onClick={scrollToSection('video')} className="hover:text-elroi-gold transition-colors cursor-pointer uppercase">Tour</a>
                        <a href="#gallery" onClick={scrollToSection('gallery')} className="hover:text-elroi-gold transition-colors cursor-pointer uppercase">Gallery</a>
                        <a href="#amenities" onClick={scrollToSection('amenities')} className="hover:text-elroi-gold transition-colors cursor-pointer uppercase">Features</a>
                        <a href="#location" onClick={scrollToSection('location')} className="hover:text-elroi-gold transition-colors cursor-pointer uppercase">Location</a>
                        <button
                            onClick={handleBookNow}
                            className={`px-6 py-2.5 rounded-lg transition-all duration-300 shadow-sm font-semibold uppercase tracking-wider text-xs ${scrolled ? 'bg-stone-900 text-white hover:bg-elroi-gold' : 'bg-white text-stone-900 hover:bg-elroi-gold hover:text-white'}`}
                        >
                            Book Now
                        </button>
                    </div>

                    <button className={`md:hidden p-2 ${scrolled ? 'text-stone-900' : 'text-white'}`} onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <CardNav
                    items={[
                        { label: 'About', href: '#about', color: '#292524', onClick: scrollToSection('about') },
                        { label: 'Video Tour', href: '#video', color: '#C5A059', onClick: scrollToSection('video') },
                        { label: 'Gallery', href: '#gallery', color: '#44403C', onClick: scrollToSection('gallery') },
                        { label: 'Features', href: '#amenities', color: '#57534E', onClick: scrollToSection('amenities') },
                        { label: 'Location', href: '#location', color: '#1C1917', onClick: scrollToSection('location') },
                        { label: 'Book Now', href: '/booking', color: '#C5A059', onClick: handleBookNow }
                    ]}
                    onClose={() => setMenuOpen(false)}
                />
            )}

            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
                <HeroSlideshow />

                {/* Dark Overlay with Gradient */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

                <div className="relative z-20 container mx-auto px-6 text-center text-white">
                    <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 border border-white/20 text-white/90 text-xs tracking-[0.25em] uppercase font-bold rounded-full backdrop-blur-md bg-black/10">
                        <Star size={10} className="text-elroi-gold fill-elroi-gold" />
                        <span>Addis Ababa, Megenagna</span>
                        <Star size={10} className="text-elroi-gold fill-elroi-gold" />
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight mb-8 drop-shadow-2xl">
                        Elroi <AnimatedText />
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/90 font-light leading-relaxed mb-12 font-serif italic border-l-2 border-elroi-gold pl-6 md:pl-0 md:border-none">
                        "Experience the comfort of a home with the elegance of a luxury hotel."
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <button onClick={handleBookNow} className="group min-w-[220px] px-8 py-4 bg-elroi-gold text-white font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 rounded-lg">
                            Reserve Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={scrollToSection('gallery')} className="min-w-[220px] px-8 py-4 border border-white/80 text-white font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-none rounded-lg">
                            View Gallery
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {/* About Section */}
                <section id="about" className="py-24 md:py-32 bg-white relative">
                    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl">
                                <img
                                    src="/images/living-room.jpg"
                                    alt="Elroi Living Room"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
                            </div>
                            {/* Overlapping Image Card */}
                            <div className="absolute -bottom-12 -right-8 md:-right-12 w-2/3 aspect-[4/3] bg-white p-3 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="w-full h-full overflow-hidden rounded-xl relative">
                                    <img
                                        src="/images/bathroom-sink.jpg"
                                        alt="Luxury Bathroom"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-elroi-gold/90 text-white px-4 py-1 text-xs uppercase tracking-widest font-bold">
                                        Premium Stay
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-elroi-gold"></div>
                                <span className="text-xs font-bold tracking-[0.2em] text-elroi-gold uppercase">About Elroi</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-[1.1] text-stone-900">
                                A Modern Sanctuary in <span className="italic text-stone-500">Megenagna</span>
                            </h2>
                            <div className="text-lg text-stone-600 leading-relaxed space-y-6 font-light">
                                <p>
                                    Situated near <strong>Admas University</strong> in the vibrant Megenagna district, <strong className="text-elroi-gold">Elroi Luxury Guest House</strong> redefines the standard for furnished apartments in Addis Ababa.
                                </p>
                                <p>
                                    We blend authentic Ethiopian hospitality with contemporary design. Our apartments feature sage green accents, warm wood finishes, and modern lighting—creating a calm, stylish retreat from the city's energy.
                                </p>

                                <div className="pt-8 grid grid-cols-2 gap-8 border-t border-stone-100">
                                    <div>
                                        <h4 className="font-serif text-2xl text-stone-900 mb-2">Ideally Located</h4>
                                        <p className="text-sm text-stone-500">Minutes from shopping, dining, and transport links.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-2xl text-stone-900 mb-2">Fully Serviced</h4>
                                        <p className="text-sm text-stone-500">Housekeeping, security, and concierge services.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Tour Section */}
                <section id="video" className="bg-stone-900 py-24">
                    <VideoTour />
                </section>

                {/* Gallery Section */}
                <section id="gallery" className="py-24 bg-[#F5F4F0]">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="text-xs font-bold tracking-[0.2em] text-elroi-gold uppercase">The Collection</span>
                            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-stone-900">Curated Living Spaces</h2>
                            <p className="text-stone-500 font-light text-lg">
                                Explore our thoughtfully designed interiors, featuring plush velvet seating, modern kitchenettes, and spa-inspired bathrooms with black and gold fixtures.
                            </p>
                        </div>
                        <GalleryGrid />
                    </div>
                </section>

                {/* Amenities */}
                <section id="amenities" className="py-24 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <div>
                                <span className="text-xs font-bold tracking-[0.2em] text-elroi-gold uppercase">Features</span>
                                <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-8 text-stone-900">Designed for Comfort</h2>
                                <p className="text-lg text-stone-600 mb-10 leading-relaxed font-light">
                                    Whether you are here for a short visit or a long-term stay, our amenities ensure you have everything you need. From cooking your favorite meals to staying connected with high-speed internet.
                                </p>
                                <AmenityList />
                            </div>
                            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
                                <img
                                    src="/images/kitchen.jpg"
                                    alt="Modern Kitchen"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-10 left-10 right-10">
                                    <h3 className="text-white font-serif text-3xl mb-2">Modern Kitchens</h3>
                                    <p className="text-white/80 font-light">Equipped with kettles, microwaves, and refrigerators.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location & Contact */}
                <section id="location" className="py-24 bg-[#F9F8F4] border-t border-stone-200">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-12 items-stretch rounded-2xl overflow-hidden shadow-xl bg-white">
                            <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                                <span className="text-xs font-bold tracking-[0.2em] text-elroi-gold uppercase mb-4">Contact Us</span>
                                <h2 className="font-serif text-4xl lg:text-5xl mb-8 text-stone-900">Plan Your Visit</h2>

                                <div className="space-y-10">
                                    <div className="group flex items-start gap-6 cursor-default">
                                        <div className="p-4 bg-[#F9F8F4] rounded-full text-elroi-gold group-hover:bg-elroi-gold group-hover:text-white transition-colors duration-300">
                                            <MapPin size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-elroi-gold transition-colors">Our Location</h3>
                                            <p className="text-stone-600 font-light">Megenagna, Near Admas University</p>
                                            <p className="text-stone-600 font-light">Addis Ababa, Ethiopia</p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-6">
                                        <div className="p-4 bg-[#F9F8F4] rounded-full text-elroi-gold group-hover:bg-elroi-gold group-hover:text-white transition-colors duration-300">
                                            <Phone size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-elroi-gold transition-colors">Reservations</h3>
                                            <div className="flex flex-col gap-1">
                                                <a href="tel:+2510939946590" className="text-stone-600 hover:text-elroi-gold transition-colors font-medium text-lg">+251 093 994 6590</a>
                                                <a href="tel:+2510717069797" className="text-stone-600 hover:text-elroi-gold transition-colors font-medium text-lg">+251 071 706 9797</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button onClick={handleBookNow} className="w-full md:w-auto px-10 py-4 bg-stone-900 text-white uppercase tracking-[0.15em] text-xs font-bold hover:bg-elroi-gold transition-colors duration-300 shadow-lg rounded-lg">
                                            Call to Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 min-h-[400px] bg-stone-100 relative">
                                <LocationMap />
                            </div>
                        </div>
                    </div>
                </section>
            </main>



            <footer id="contact" className="bg-stone-950 text-stone-400 py-20 border-t border-stone-900">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-lg border border-elroi-gold flex items-center justify-center font-serif font-bold text-elroi-gold text-xl">E</div>
                            <span className="font-serif font-bold text-2xl text-white tracking-widest">ELROI</span>
                        </div>
                        <p className="text-stone-400 leading-relaxed mb-8 max-w-sm font-light">
                            Your luxury home away from home. Elroi offers premium furnished apartments with top-tier amenities in the heart of Addis Ababa.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.tiktok.com/@elroiluxuryguesthouse" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-elroi-gold hover:border-elroi-gold hover:text-white transition-all duration-300 group">
                                {/* Custom TikTok SVG Icon */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 1 7.6 6.83 6.83 0 0 0 4.46-6.57v-5a8.25 8.25 0 0 0 3.77 1.26v-3z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-serif text-lg mb-8">Explore</h4>
                        <ul className="space-y-4 text-sm font-medium tracking-wide">
                            <li><a href="#about" className="hover:text-elroi-gold transition-colors block py-1">About Us</a></li>
                            <li><a href="#gallery" className="hover:text-elroi-gold transition-colors block py-1">Accommodations</a></li>
                            <li><a href="#video" className="hover:text-elroi-gold transition-colors block py-1">Video Tour</a></li>
                            <li><a href="#location" className="hover:text-elroi-gold transition-colors block py-1">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-serif text-lg mb-8">Visit Us</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li className="flex gap-3"><MapPin size={16} className="text-elroi-gold shrink-0 mt-1" /> Megenagna, Near Admas University<br />Addis Ababa, Ethiopia</li>
                            <li className="flex gap-3"><Phone size={16} className="text-elroi-gold shrink-0 mt-1" /> +251 093 994 6590</li>
                            <li className="flex gap-3"><Phone size={16} className="text-elroi-gold shrink-0 mt-1" /> +251 071 706 9797</li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-20 pt-8 border-t border-stone-900/50 text-center md:text-left text-xs text-stone-600 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Elroi Luxury Guest House. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 font-serif italic">Elevated Living.</p>
                </div>
            </footer >
        </div >
    );
};
