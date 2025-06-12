"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "./components/PageLayout";
import Link from "next/link";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsClient(true);    // Fetch message from Django backend
    console.log("Fetching message from backend...");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.fgpremiumfunds.com";
    fetch(`${apiUrl}/api/home/`)
      .then((response) => {
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setMessage(data.message);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <PageLayout>
      {/* Modified Hero Section */}
      <section
        className="relative flex bg-black/30 flex-col items-center justify-center min-h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/Hero.png')" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="p-6 lg:p-10 max-w-3xl mx-auto rounded-2xl">
            <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-white text-sm mb-4">
              THESIS
            </span>
            <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight sm:leading-snug lg:leading-snug mb-6">
              Crypto will create the largest one-time shift in wealth in the history of the internet
            </h1>
            <div className="flex flex-col items-center mt-8">
              <Link
                href="/register"
                className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white rounded-full group"
              >
                <span className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#308e87] group-hover:bg-gradient-to-br group-hover:from-[#308e87] group-hover:via-[#308e87] group-hover:to-[#308e87] transition-all duration-300"></span>
                <span className="relative">Get Started</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Now Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-8 lg:px-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center mb-16"
          >
            <div className="w-full lg:w-10/12">
              <span className="text-base font-semibold text-[#308e87] mb-4 block">WHY NOW?</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Three Powerful Cultural and Technological Forces are Colliding Simultaneously
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                text: "The erosion of consumer trust in governments and corporations"
              },
              {
                number: "02",
                text: "Crypto networks unlock novel ways to organize economic activity and incentivize human behavior using new programmatic systems"
              },
              {
                number: "03",
                text: "Software is eating finance, including the foundational concept of money"
              }
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group hover:scale-105 transition-transform duration-300 h-full"
              >
                <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#308e87] to-purple-600 bg-clip-text text-transparent mb-6">
                    {item.number}
                  </span>
                  <hr className="border-t border-gray-200 dark:border-gray-700 mb-6" />
                  <p className="text-gray-600 dark:text-gray-300 text-lg flex-grow">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Theses Sections */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="w-full lg:w-2/3 mx-auto">
              <div className="aspect-w-1 aspect-h-1">
                <img src="/images/finance-renaissance.webp" className="rounded shadow-lg object-cover" alt="Finance Renaissance" />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center">
              <div className="text-left">
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">Three Macro Investment Theses For Crypto</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">The Open Finance Renaissance</h2>
                <p className="mt-4 md:text-sm sm:text-sm lg:text-lg text-gray-600 dark:text-gray-300">By making all units of value—stocks, bonds, real estate, currencies, and so forth—interoperable, programmable, and composable on distributed ledgers, capital markets will become more efficient and accessible to everyone on the planet.</p>
                <p className="mt-4 text-gray-600 md:text-sm sm:text-sm lg:text-lg dark:text-gray-300">Just as the proliferation of capital markets over the last 100 years supported staggering levels of wealth creation, the permissionless, expansionary effect of open finance will pave the way for new services and applications that will deliver tremendous value.</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/blog"
                  className="mt-6 inline-flex items-center px-6 py-3 rounded-full 
                    border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                    dark:text-[#308e87] dark:hover:text-white
                    transition-all duration-300 font-semibold group"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="w-full lg:w-2/3 mx-auto order-1 md:order-2">
              <div className="aspect-w-1 aspect-h-1">
                <img src="/images/bank-note-cash-close-up-min.webp" className="rounded shadow-lg object-cover mb-4" alt="Bank Note" />
                <img src="/images/bank-note-cash-close-up-2-mini.webp" className="rounded shadow-lg object-cover" alt="Bank Note 2" />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center order-2 md:order-1">
              <div className="text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">The Web3 Vision</h2>
                <p className="mt-4 md:text-sm sm:text-sm lg:text-lg text-gray-600 dark:text-gray-300">Whereas the open finance thesis is based on the idea of programmable money, the Web3 thesis is based on the vision of self-sovereign data. The Web3 vision empowers consumers to own their own data.</p>
                <p className="mt-4 text-gray-600 md:text-sm sm:text-sm lg:text-lg dark:text-gray-300">When consumers own their own data, data monopolies will crumble. The second and third order effects of this will be profound, enabling the creation of new businesses and services that we can't yet imagine.</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 95 }}
                  href="/blog"
                  className="mt-6 inline-flex items-center px-6 py-3 rounded-full 
                    border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                    dark:text-[#308e87] dark:hover:text-white
                    transition-all duration-300 font-semibold group"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="w-full lg:w-2/3 mx-auto">
              <div className="aspect-w-1 aspect-h-1">
                <img src="/images/global-state-free-money.webp" className="rounded shadow-lg object-cover" alt="Global State Free Money" />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center">
              <div className="text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Global, State-Free Money</h2>
                <p className="mt-4 md:text-sm sm:text-sm lg:text-lg text-gray-600 dark:text-gray-300">Many think of this as just "Digital Gold." However we find that the digital gold framing is too narrow and substantially understates the opportunity. Global, state-free money is a superset of digital gold in terms of breadth and use cases, and it represents a dramatically larger market.</p>
                <p className="mt-4 text-gray-600 md:text-sm sm:text-sm lg:text-lg dark:text-gray-300">We expect the first digitally-native money to function as digital gold, but then also absorb some of the monetary premia of other non-gold stores of wealth.</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/blog"
                  className="mt-6 inline-flex items-center px-6 py-3 rounded-full 
                    border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                    dark:text-[#308e87] dark:hover:text-white
                    transition-all duration-300 font-semibold group"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center"
          >
            <div className="text-center max-w-3xl">
              <span className="block text-xl text-gray-700 dark:text-gray-300 mb-8 font-semibold">
                INTERESTED IN JOINING OUR TEAM, PARTNERING WITH US, OR BUILDING SOMETHING GREAT?
              </span>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="inline-flex items-center px-8 py-3 rounded-full 
                  border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                  dark:text-[#308e87] dark:hover:text-white
                  transition-all duration-300 font-semibold group"
              >
                Get in touch
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
