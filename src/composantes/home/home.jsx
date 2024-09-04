import React from 'react';
import { motion } from 'framer-motion';
import getStarted from './background.png';

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-white">
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    className="p-4 mt-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Your Personalized
                        <br />
                        Library Experience
                    </h1>
                </motion.div>

                <motion.div
                    className="p-4 mt-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        delay: 0.2,
                    }}
                >
                    <p className="text-lg sm:text-xl md:text-2xl mb-6">
                        Discover Books Curated Just For You Using AI-Powered Insights
                    </p>
                </motion.div>

                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        delay: 0.4,
                    }}
                >
                    <img
                        src={getStarted}
                        alt="Get Started"
                        style={{ width: "900px", marginBottom: "40px" }}
                    />
                </motion.div>
            </main>

            <section className="w-full py-12 bg-[#FFFFFF] text-[#c75e46]">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <motion.h2
                        className="text-3xl font-bold mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                        }}
                    >
                        Explore a World of Knowledge with Our AI-Powered Library
                    </motion.h2>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            delay: 0.2,
                        }}
                    >
                        Dive into a vast collection of books, expertly recommended based on your reading history and preferences. Our AI technology ensures that each suggestion is tailored to your unique taste, helping you discover new favorites effortlessly. Connect with our library today and start your journey through a world of personalized literary exploration.
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            delay: 0.4,
                        }}
                    >
                        <div className="flex flex-col items-center p-6 bg-[#5dc1b6] text-white rounded-lg shadow-md">
                            <div className="text-xl font-semibold mb-2">AI Recommendations</div>
                            <p className="text-sm">
                                Let our AI algorithms analyze your borrow history and suggest books that match your interests, enhancing your reading experience.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-[#5dc1b6] text-white rounded-lg shadow-md">
                            <div className="text-xl font-semibold mb-2">Personalized Shelves</div>
                            <p className="text-sm">
                                Access custom shelves filled with books you'll love, selected based on your past readings and genres you enjoy.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-[#5dc1b6] text-white rounded-lg shadow-md">
                            <div className="text-xl font-semibold mb-2">Global Book Access</div>
                            <p className="text-sm">
                                Browse and borrow from an expansive global collection, ensuring you never run out of new and exciting reads.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="w-full py-12 bg-[#FFFFFF] text-[#c75e46]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl font-bold mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                        }}
                    >
                        Why Choose Our Library?
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            delay: 0.2,
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-4 bg-[#5dc1b6] text-white rounded-full flex items-center justify-center">
                                📚
                            </div>
                            <h3 className="text-xl font-semibold">Extensive Collection</h3>
                            <p className="mt-2">
                                Explore a wide range of books across various genres, ensuring there's something for every reader.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-4 bg-[#5dc1b6] text-white rounded-full flex items-center justify-center">
                                🤖
                            </div>
                            <h3 className="text-xl font-semibold">AI-Driven Suggestions</h3>
                            <p className="mt-2">
                                Benefit from AI that learns your preferences and consistently recommends books tailored to your tastes.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-4 bg-[#5dc1b6] text-white rounded-full flex items-center justify-center">
                                🌍
                            </div>
                            <h3 className="text-xl font-semibold">Global Access</h3>
                            <p className="mt-2">
                                Get access to books from around the world, making your library experience truly expansive and diverse.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="w-full py-8 bg-[#28201e] text-center text-sm">
                <p>&copy; 2024 AI Library Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}
