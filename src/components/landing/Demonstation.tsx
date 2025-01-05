"use client"

import { Smartphone, ArrowRight, CloudUpload } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useRef } from "react"

const steps = [
    {
        icon: <CloudUpload className="w-6 h-6" />,
        title: "Step 01",
        heading: "Upload Your Files",
        description: "Securely upload your images or videos to our platform.",
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Step 02",
        heading: "Choose Your Format",
        description:
            "Select from a variety of preset dimensions or customize your own.",
    },
    {
        icon: <ArrowRight className="w-6 h-6" />,
        title: "Step 03",
        heading: "Download Transformed Media",
        description: "Get your resized and reformatted files instantly.",
    },
]

const ProgressLine = ({ progress }: { progress: number }) => (
    <div className="absolute left-[27px] top-0 w-px h-full">
        <motion.div
            className="w-full h-full bg-blue-500 origin-top"
            style={{ scaleY: progress }}
        />
    </div>
)

const ProgressDot = ({ active }: { active: boolean }) => (
    <div
        className={`w-[14px] h-[14px] rounded-full border-2 ${
            active
                ? "bg-blue-500 border-blue-500"
                : "bg-transparent border-gray-600"
        }`}
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
            className="py-20 bg-gradient-to-b from-black via-[#161717] to-[#161717] text-white min-h-screen"
            ref={containerRef}
        >
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-black/50 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-4xl font-bold ">How it works</h2>
                    </div>

                    <div className="relative space-y-24">
                        <ProgressLine
                            progress={smoothProgress as unknown as number}
                        />

                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative pl-16"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                            >
                                <div className="absolute left-0 -translate-y-1">
                                    <ProgressDot active={index === 0} />
                                </div>

                                <div className="space-y-4">
                                    <div className="text-blue-500 font-medium">
                                        {step.title}
                                    </div>
                                    <h3 className="text-2xl font-semibold">
                                        {step.heading}
                                    </h3>
                                    <p className="text-gray-400 max-w-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
