"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    GitlabIcon as GitHub,
} from "lucide-react"
import Logo from "@/components/Logo"

const footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "FAQ"] },
    { title: "Company", links: ["About Us", "Careers", "Press", "News"] },
    {
        title: "Resources",
        links: ["Blog", "Newsletter", "Events", "Help center"],
    },
    { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Licenses"] },
]

const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: GitHub, href: "#" },
]

export default function Footer() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Signed up with:", email)
        setEmail("")
    }

    return (
        <footer className="bg-gradient-to-b from-[#161617] to-black text-gray-300">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 mb-4"
                        >
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                                <Logo />
                            </span>
                        </Link>
                        <p className="text-sm mb-4">
                            Empowering your digital journey with cutting-edge
                            SaaS solutions.
                        </p>
                    </div>
                    {footerLinks.map(column => (
                        <div key={column.title}>
                            <h3 className="font-semibold text-white mb-4">
                                {column.title}
                            </h3>
                            <ul className="space-y-2">
                                {column.links.map(link => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-sm hover:text-white transition-colors duration-200"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Separator className="bg-gray-800 mb-8" />
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0">
                        &copy; 2023 Cclip. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        {socialIcons.map(({ Icon, href }, index) => (
                            <motion.a
                                key={index}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
