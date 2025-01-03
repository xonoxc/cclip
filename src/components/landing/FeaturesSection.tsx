"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Image, Video, Zap, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const features = [
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
            "Transform multiple files at once, saving you time and effort.",
        details: [
            "Parallel processing for speed",
            "Custom workflow automation",
            "Bulk metadata editing",
            "Scheduled batch jobs",
        ],
    },
]

const FeatureCard = ({ feature, index, isActive, onClick }) => {
    const controls = useAnimation()

    React.useEffect(() => {
        controls.start({
            scale: isActive ? 1.03 : 1,
            transition: { duration: 0.3, ease: "easeInOut" },
        })
    }, [isActive, controls])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <motion.div
                animate={controls}
                className={cn(
                    "group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-[#161617] p-0.5",
                    isActive ? "ring-2 ring-white/30" : ""
                )}
                onClick={onClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="bg-[#161617] rounded-xl p-6 h-full transition-all duration-300">
                    <motion.div
                        className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {React.cloneElement(feature.icon, {
                            className: "text-white",
                        })}
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-white mb-3">
                        {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        {feature.description}
                    </p>
                    <Button
                        variant="ghost"
                        className="text-white hover:text-gray-200 p-0 flex items-center group"
                    >
                        Learn more
                        <motion.div
                            className="ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </Button>
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
                            className="mt-12 bg-gray-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50"
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
