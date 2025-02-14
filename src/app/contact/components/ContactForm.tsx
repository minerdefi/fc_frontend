"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

interface FormData {
    first_name: string;
    last_name: string;
    email_address: string;
    phone: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        email_address: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await axios.post(
                'http://localhost:8000/api/contact/submit/',  // Updated endpoint
                formData
            );

            setSubmitStatus({
                type: 'success',
                message: response.data.message
            });

            // Clear form
            setFormData({
                first_name: '',
                last_name: '',
                email_address: '',
                phone: '',
                message: ''
            });

        } catch (error: any) {
            setSubmitStatus({
                type: 'error',
                message: error.response?.data?.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = `
        appearance-none block w-full 
        bg-white/80 dark:bg-gray-800/80
        text-gray-800 dark:text-gray-200
        border border-gray-200/50 dark:border-gray-700/50
        rounded-xl
        py-4 px-5 
        leading-tight 
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#308e87]/20
        focus:border-[#308e87]
        transition-all duration-300
        hover:border-[#308e87]/70
        backdrop-blur-sm
    `;

    const labelClasses = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg p-8 lg:p-10"
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            >
                Send us a message
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className={labelClasses}>First Name*</label>
                        <input
                            className={inputClasses}
                            type="text"
                            name="first_name"
                            placeholder="Enter your first name"
                            required
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className={labelClasses}>Last Name*</label>
                        <input
                            className={inputClasses}
                            type="text"
                            name="last_name"
                            placeholder="Enter your last name"
                            required
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className={labelClasses}>Email*</label>
                        <input
                            className={inputClasses}
                            type="email"
                            name="email_address"
                            placeholder="Enter your email"
                            required
                            value={formData.email_address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className={labelClasses}>Phone Number*</label>
                        <input
                            className={inputClasses}
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={labelClasses}>Message*</label>
                        <textarea
                            className={`${inputClasses} min-h-[160px] resize-none`}
                            name="message"
                            placeholder="How can we help you?"
                            required
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {submitStatus.message && (
                    <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}>
                        {submitStatus.message}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="flex justify-end"
                >
                    <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 rounded-full border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white dark:hover:text-white transition-all duration-300 text-sm font-medium w-28 text-center flex items-center justify-center shadow hover:shadow-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </motion.button>
                </motion.div>
            </form>
        </motion.div>
    );
}
