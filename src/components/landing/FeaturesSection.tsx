"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Image, Video, Zap, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Feature = {
    icon: JSX.Element
    title: string
    description: string
    details: string[]
}

const features: Feature[] = [
    {
        icon: <Image className="w-8 h-8" />,
        title: "Image Transformation",
        description:
            "Resize, crop, and optimize images for various platforms and devices.",
        details: [
            "AI-powered smart cropping",
            "Lossless compression",
            "Automatic format conversion",
            "Responsive image generation",
        ],
    },
    {
        icon: <Video className="w-8 h-8" />,
        title: "Video Reformatting",
        description:
            "Adjust video dimensions and formats to suit different social media requirements.",
        details: [
            "Adaptive bitrate streaming",
            "Automated subtitles generation",
            "Social media optimized encoding",
            "360-degree video support",
        ],
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Batch Processing",
        description:
            "Transform multiple files at once, saving you time and effort and ensuring consistency.",
        details: [
            "Parallel processing for speed",
            "Custom workflow automation",
            "Bulk metadata editing",
            "Scheduled batch jobs",
        ],
    },
]

const FeatureCard = ({
    feature,
    index,
    isActive,
    onClick,
}: {
    feature: Feature
    index: number
    isActive: boolean
    onClick: () => void
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="text-center"
            onClick={onClick}
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                className={cn(
                    "bg-zinc-900/50 rounded-xl p-6 backdrop-blur-lg border border-white/10 transition-colors hover:border-white/20",
                    isActive ? "border-white/30" : ""
                )}
            >
                <div className="mb-2 text-white/70 flex justify-center">
                    {React.cloneElement(feature.icon, {
                        className: "w-6 h-6",
                    })}
                </div>
                <motion.div
                    className="text-2xl font-bold mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {feature.title}
                </motion.div>
                <div className="text-sm text-zinc-400">
                    {feature.description}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function FeaturesSection() {
    const [activeFeature, setActiveFeature] = useState<number | null>(null)

    return (
        <section id="features" className="py-24 bg-black overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-white"> Features for </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Seamless Workflow
                    </span>
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            isActive={activeFeature === index}
                            onClick={() =>
                                setActiveFeature(
                                    activeFeature === index ? null : index
                                )
                            }
                        />
                    ))}
                </div>
                <AnimatePresence>
                    {activeFeature !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="mt-12 bg-gray-800/10 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="p-8"
                            >
                                <h4 className="text-2xl font-semibold text-white mb-6">
                                    {features[activeFeature].title} Details
                                </h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {features[activeFeature].details.map(
                                        (detail, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: index * 0.1,
                                                }}
                                                className="flex items-center text-gray-300"
                                            >
                                                <motion.div
                                                    className="w-2 h-2 rounded-full bg-blue-500 mr-3"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{
                                                        duration: 0.2,
                                                        delay:
                                                            index * 0.1 + 0.2,
                                                    }}
                                                />
                                                {detail}
                                            </motion.li>
                                        )
                                    )}
                                </ul>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
