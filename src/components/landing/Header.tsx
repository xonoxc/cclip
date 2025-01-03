"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Logo from "@/components/Logo"
import { useRouter } from "next/navigation"

const navItems = [
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "#pricing" },
    { title: "Resources", href: "#resources" },
    { title: "Contact", href: "#contact" },
]

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const router = useRouter()

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

    return (
        <motion.header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-black bg-opacity-25 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                                <Logo />
                            </span>
                        </Link>
                    </motion.div>

                    <nav className="hidden md:block">
                        <motion.div
                            className="flex items-center space-x-1 rounded-3xl border border-gray-700 bg-[#161617] bg-opacity-15 px-2 py-1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </motion.div>
                    </nav>

                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                className="text-black  transition-colors duration-200 bg-white rounded-xl"
                                onClick={() => router.push("/sign-in")}
                            >
                                Log in
                            </Button>
                        </div>
                    </motion.div>

                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle navigation menu"
                            className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <nav className="bg-gray-900/95 backdrop-blur-md px-4 py-2">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between py-3 text-gray-300 hover:text-white transition-colors duration-200"
                                    onClick={toggleMobileMenu}
                                >
                                    <span>{item.title}</span>
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            className="mt-4 flex flex-col space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: navItems.length * 0.1,
                            }}
                        >
                            <Button
                                variant="outline"
                                className="w-full justify-center text-gray-300 hover:text-white hover:bg-white/10 border-gray-700 transition-colors duration-200"
                            >
                                Log in
                            </Button>
                        </motion.div>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    )
}
