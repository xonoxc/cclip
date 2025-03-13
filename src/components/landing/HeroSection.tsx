"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import ShimmerButton from "@/components/ui/shimmer-button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-pacifico",
})

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-gray-500 to-black",
}: {
    className?: string
    delay?: number
    width?: number
    height?: number
    rotate?: number
    gradient?: string
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    )
}

export default function HeroSection({
    badge = " Media Resizer/Compressor",
}: {
    badge?: string
}) {
    const router = useRouter()
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    }

    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 1)), url('')`,
            }}
        >
            <div className="absolute inset-0 bg-black/30 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/[0.05] via-transparent to-black/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-gray-500/[0.1] via-white/[0.1] to-black/[0.1]" // Softer gradient
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-gray-700/[0.1] via-white/[0.05] to-black/[0.1]" // Softer gradient
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-gray-600/[0.1] via-white/[0.03] to-black/[0.1]" // Softer gradient
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-gray-400/[0.1] via-white/[0.07] to-black/[0.1]" // Softer gradient
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-gray-300/[0.1] via-white/[0.09] to-black/[0.1]" // Softer gradient
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-gray-700 via-white/10 to-black border border-white/[0.08] mb-8 md:mb-12"
                    >
                        <span className="text-sm text-white/60 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold mb-6 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                Transform Your Media
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
                                    pacifico.className
                                )}
                            >
                                Dimensions
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto">
                            Easily resize and reformat your images and videos
                            for any platform or device. Save time and ensure
                            your content looks perfect everywhere.
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center justify-center"
                    >
                        <ShimmerButton
                            onClick={() => router.push("/sign-in")}
                            className="text-white rounded-2xl border-2 border-gray-500 text-xs px-4"
                        >
                            Start Transforming Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </ShimmerButton>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    )
}
