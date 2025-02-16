"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/AuthContext'; // adjusted relative path

export default function Navbar() {
    const [theme, setTheme] = useState("light");
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();  // Add this

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        // Only close if clicking the menu background, not the links
        if ((e.target as HTMLElement).tagName !== 'A') {
            setIsOpen(false);
        }
    };

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Funds', href: '/funds' },
        { name: 'Team', href: '/team' },
        { name: 'Contact', href: '/contact' },
        // Methodology item removed
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 p-4 shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black dark:text-white h-8">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/fc1.png"
                            alt="Forbes Capital Logo"
                            width={32}
                            height={32}
                            className="dark:invert object-contain"
                        />
                    </Link>
                </div>
                <div className="hidden md:flex gap-4">
                    <Link href="/" className="text-black dark:text-white hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300 focus:outline-none">
                        Home
                    </Link>
                    <Link href="/funds" className="text-black dark:text-white hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300 focus:outline-none">
                        Funds
                    </Link>
                    <Link href="/portfolio" className="text-black dark:text-white hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300 focus:outline-none">
                        Portfolio
                    </Link>
                    <Link href="/team" className="text-black dark:text-white hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300 focus:outline-none">
                        Team
                    </Link>
                    <Link href="/contact" className="text-black dark:text-white hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300 focus:outline-none">
                        Contact
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href={isAuthenticated ? "/dashboard" : "/login"}
                        className="text-white bg-[#308e87] hover:bg-[#308e87]/90 px-4 py-2 rounded-full transition-colors duration-300 text-sm font-medium"
                    >
                        {isAuthenticated ? "Dashboard" : "Login"}
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="text-black dark:text-white hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
                    </button>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-black dark:text-white hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300 focus:outline-none"
                        >
                            <FontAwesomeIcon
                                icon={isOpen ? faXmark : faBars}
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`
                    fixed top-0 right-0 w-[70%] h-screen md:hidden 
                    transition-all duration-500 ease-in-out transform 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                    bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg
                    border-l border-gray-200 dark:border-gray-700
                `}
                onClick={handleMenuClick}
            >
                <div className="h-full overflow-y-auto bg-transparent pt-20">
                    <ul className="flex flex-col py-4">
                        {navigation.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="block px-6 py-3 text-black dark:text-white 
                                             hover:bg-[#308e87] hover:text-white
                                             dark:hover:bg-[#308e87] dark:hover:text-white 
                                             transition-colors duration-300 bg-transparent focus:outline-none"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className={`fixed inset-0 top-0 bg-black/5 dark:bg-black/20 z-[-1] 
                              transition-opacity duration-500 backdrop-blur-[1px]
                              ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu();
                    }}
                ></div>
            </div>
        </nav>
    );
}
