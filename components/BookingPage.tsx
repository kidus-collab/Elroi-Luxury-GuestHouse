/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Mail, Phone, User, MessageSquare, ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Toast: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
            className="fixed top-24 right-6 z-50 w-80 backdrop-blur-xl bg-white/80 border border-white/60 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/50"
        >
            <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check size={20} className="text-green-600" />
                </div>
                <div>
                    <h4 className="font-serif text-stone-900 font-bold">Request Submitted</h4>
                    <p className="text-xs text-stone-500">We'll contact you shortly.</p>
                </div>
                <button onClick={onClose} className="ml-auto text-stone-400 hover:text-stone-600">
                    <X size={18} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-stone-100">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-elroi-gold"
                />
            </div>
        </motion.div>
    );
};

export const BookingPage: React.FC = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '1',
        specialRequests: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setShowToast(true);

        // Here you would typically send the data to your backend
        console.log('Booking submitted:', formData);

        // Reset form after 5 seconds and show success message
        setTimeout(() => {
            setSubmitted(false);
            setShowToast(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                checkIn: '',
                checkOut: '',
                guests: '1',
                specialRequests: ''
            });
        }, 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 relative overflow-hidden">
            <AnimatePresence>
                {showToast && <Toast onClose={() => setShowToast(false)} />}
            </AnimatePresence>

            {/* Background decorative elements - Enhanced for better glass effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-10 w-72 h-72 bg-elroi-gold/30 rounded-full blur-3xl mix-blend-multiply"></div>
                <div className="absolute bottom-20 -right-10 w-96 h-96 bg-stone-400/30 rounded-full blur-3xl mix-blend-multiply"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-elroi-gold/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-stone-600 hover:text-elroi-gold transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </motion.button>

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-12"
                    >
                        <h1 className="font-serif text-5xl md:text-6xl font-medium mb-4 text-stone-900">
                            Reserve Your <span className="text-elroi-gold italic">Stay</span>
                        </h1>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                            Experience luxury and comfort at Elroi Guest House. Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </motion.div>

                    {/* Glassmorphic Form Container - Enhanced Visibility */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="backdrop-blur-2xl bg-white/30 border border-white/50 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden ring-1 ring-white/40"
                    >
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-elroi-gold to-transparent opacity-80"></div>

                        {submitted ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={40} className="text-green-600" />
                                </div>
                                <h3 className="font-serif text-3xl text-stone-900 mb-3">Booking Request Sent!</h3>
                                <p className="text-stone-600 text-lg">We'll contact you shortly to confirm your reservation.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                                            <User size={16} className="text-elroi-gold" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 focus:border-elroi-gold focus:ring-2 focus:ring-elroi-gold/20 outline-none transition-all duration-300 text-stone-900 placeholder:text-stone-500"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                                            <Mail size={16} className="text-elroi-gold" />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 focus:border-elroi-gold focus:ring-2 focus:ring-elroi-gold/20 outline-none transition-all duration-300 text-stone-900 placeholder:text-stone-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                                        <Phone size={16} className="text-elroi-gold" />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 focus:border-elroi-gold focus:ring-2 focus:ring-elroi-gold/20 outline-none transition-all duration-300 text-stone-900 placeholder:text-stone-500"
                                        placeholder="+251 912 345 678"
                                    />
                                </div>

                                {/* Dates and Guests */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Check-in */}
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                                            <Calendar size={16} className="text-elroi-gold" />
                                            Check-in *
                                        </label>
                                        <input
                                            type="date"
                                            name="checkIn"
                                            value={formData.checkIn}
                                            onChange={handleChange}
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 focus:border-elroi-gold focus:ring-2 focus:ring-elroi-gold/20 outline-none transition-all duration-300 text-stone-900"
                                        />
                                    </div>

                                    {/* Check-out */}
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                                            <Calendar size={16} className="text-elroi-gold" />
                                            Check-out *
                                        </label>
                                        <input
                                            type="date"
                                            name="checkOut"
                                            value={formData.checkOut}
                                            onChange={handleChange}
                                            required
                                            min={formData.checkIn || new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 focus:border-elroi-gold focus:ring-2 focus:ring-elroi-gold/20 outline-none transition-all duration-300 text-stone-900"
                                        />
                                    </div>

                                    {/* Number of Guests */}
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                                            <Users size={16} className="text-elroi-gold" />
                                            Guests *
                                        </label>
                                        <select
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 focus:border-elroi-gold focus:ring-2 focus:ring-elroi-gold/20 outline-none transition-all duration-300 text-stone-900"
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Special Requests */}
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                                        <MessageSquare size={16} className="text-elroi-gold" />
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 focus:border-elroi-gold focus:ring-2 focus:ring-elroi-gold/20 outline-none transition-all duration-300 text-stone-900 resize-none placeholder:text-stone-500"
                                        placeholder="Any special requests or requirements..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-elroi-gold to-yellow-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wider"
                                >
                                    Submit Booking Request
                                </motion.button>

                                <p className="text-sm text-stone-500 text-center">
                                    By submitting this form, you agree to our terms and conditions.
                                </p>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-center text-stone-600"
                    >
                        <p className="mb-2">Need immediate assistance?</p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <a href="tel:+2510939946590" className="hover:text-elroi-gold transition-colors font-medium">
                                +251 093 994 6590
                            </a>
                            <span>•</span>
                            <a href="tel:+2510717069797" className="hover:text-elroi-gold transition-colors font-medium">
                                +251 071 706 9797
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
