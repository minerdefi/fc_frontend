"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import TeamMember from './TeamMember';
import { teamMembers, TeamMemberType } from '../data/teamData';

export default function TeamSection() {
    return (
        <section className="py-24 bg-gradient-to-t from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <div className="container mx-auto px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                        >
                            The Team
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            The blockchain space is evolving at breakneck speed. Our team hails from diverse backgrounds, giving us a competitive edge in staying ahead.
                        </motion.p>
                    </motion.div>

                    <div className="grid gap-12">
                        {teamMembers.map((member, index) => (
                            <TeamMember key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

