"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMemberType } from '../data/teamData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp, faChevronDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface TeamMemberProps {
    member: TeamMemberType;
    index: number;
}

export default function TeamMember({ member, index }: TeamMemberProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="p-8 lg:p-10 flex flex-col lg:flex-row gap-8 items-start">
                    {member.image && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-xl overflow-hidden shadow-2xl mx-auto lg:mx-0"
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </motion.div>
                    )}

                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {member.name}
                            </h3>
                            <p className="text-lg text-[#308e87] font-medium">
                                {member.title}
                            </p>
                        </div>

                        <div className="hidden lg:block space-y-4 text-gray-600 dark:text-gray-300">
                            {member.bio.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {Object.entries(member.social).map(([platform, url]) => (
                                <motion.a
                                    key={platform}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={url}
                                    target={platform === 'email' ? undefined : "_blank"}
                                    rel={platform === 'email' ? undefined : "noopener noreferrer"}
                                    className="text-gray-400 hover:text-[#308e87] transition-colors"
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            platform === 'twitter' ? faTwitter :
                                                platform === 'linkedin' ? faLinkedin :
                                                    platform === 'github' ? faGithub :
                                                        platform === 'instagram' ? faInstagram :
                                                            platform === 'facebook' ? faFacebook :
                                                                faEnvelope
                                        }
                                        className="text-2xl"
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="lg:hidden text-[#308e87] hover:text-[#308e87]/80"
                    >
                        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="text-xl" />
                    </button>
                </div>

                {/* Mobile Bio */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden border-t border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-8 space-y-4 text-gray-600 dark:text-gray-300">
                                {member.bio.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
