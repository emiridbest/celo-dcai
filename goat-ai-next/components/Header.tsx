"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                            Fun Stream
                        </a>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <a href="/" className="text-gray-900 dark:text-white hover:text-blue-500">
                            Home
                        </a>
                        <a href="/about" className="text-gray-900 dark:text-white hover:text-blue-500">
                            About
                        </a>
                        <a href="/contact" className="text-gray-900 dark:text-white hover:text-blue-500">
                            Contact
                        </a>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-900 dark:text-white focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/" className="block text-gray-900 dark:text-white hover:text-blue-500">
                            Home
                        </a>
                        <a href="/about" className="block text-gray-900 dark:text-white hover:text-blue-500">
                            About
                        </a>
                        <a href="/contact" className="block text-gray-900 dark:text-white hover:text-blue-500">
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}