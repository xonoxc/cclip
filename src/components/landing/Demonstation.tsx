"use client"

import { Shield, Smartphone, ArrowRight, CircleHelp } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useRef } from "react"

const steps = [
    {
        icon: <Shield className="w-6 h-6" />,
        title: "1. Upload Your Files",
        description: "Securely upload your images or videos to our platform.",
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "2. Choose Your Format",
        description:
            "Select from a variety of preset dimensions or customize your own.",
    },
    {
        icon: <ArrowRight className="w-6 h-6" />,
        title: "3. Download Transformed Media",
        description: "Get your resized and reformatted files instantly.",
    },
]

const ProgressLine = ({ progress }: { progress: number }) => (
    <motion.div
        className="absolute left-8 top-0 w-1 h-full bg-gray-700 origin-top"
        style={{ scaleY: progress }}
    />
)

export default function Demonstration() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <section
            className="py-20 bg-gradient-to-b from-black via-[#161717] to-[#161717] text-white"
            ref={containerRef}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    How It Works
                </h2>
                <div className="flex flex-col lg:flex-row items-start justify-center space-y-8 lg:space-y-0 lg:space-x-8">
                    <div className="w-full lg:w-1/2 space-y-12 relative">
                        <ProgressLine
                            progress={smoothProgress as unknown as number}
                        />
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="bg-black rounded-lg p-6 shadow-lg relative"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <CircleHelp size={400} color="gray" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
