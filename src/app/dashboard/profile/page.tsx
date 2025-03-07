'use client';

import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const { profile } = useAuth();

    return (
        <div className="container mx-auto px-2 py-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6"> {/* adjusted padding for very small screens */}
                    <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
                                {profile?.username?.[0]?.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                {profile?.first_name} {profile?.last_name}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{profile?.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 space-y-4 md:space-y-0">
                        <div>
                            <h2 className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-white mb-2 sm:mb-4">Account Information</h2>
                            <div className="space-y-2 sm:space-y-3">
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Username</label>
                                    <p className="text-gray-900 dark:text-white">{profile?.username}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Phone Number</label>
                                    <p className="text-gray-900 dark:text-white">{profile?.phone_number || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Member Since</label>
                                    <p className="text-gray-900 dark:text-white">
                                        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Not available'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-white mb-2 sm:mb-4">Account Summary</h2>
                            <div className="space-y-2 sm:space-y-3">
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Total Deposits</label>
                                    <p className="text-gray-900 dark:text-white">${profile?.total_deposits}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Total Withdrawals</label>
                                    <p className="text-gray-900 dark:text-white">${profile?.total_withdrawals}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Account Status</label>
                                    <p className="text-green-600 dark:text-green-400">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Link
                            href="/dashboard/settings"
                            className="inline-flex w-full sm:w-auto items-center justify-center px-3 sm:px-4 py-2 bg-[#308e87] text-white rounded-md hover:bg-[#277771]"
                        >
                            Edit Profile Settings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
