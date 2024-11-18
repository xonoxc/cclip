import React from "react"
import { Image, Video, Zap } from "lucide-react"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3Dcard"
import { cn } from "@/lib/utils"

const features = [
    {
        icon: <Image className="w-12 h-12 mb-4" />,
        title: "Image Transformation",
        description:
            "Resize, crop, and optimize images for various platforms and devices.",
        gradient: "from-pink-500 to-purple-500",
    },
    {
        icon: <Video className="w-12 h-12 mb-4" />,
        title: "Video Reformatting",
        description:
            "Adjust video dimensions and formats to suit different social media requirements.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: <Zap className="w-12 h-12 mb-4" />,
        title: "Batch Processing",
        description:
            "Transform multiple files at once, saving you time and effort.",
        gradient: "from-orange-500 to-yellow-500",
    },
]

export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="py-20 bg-gradient-to-b from-black via-[#161717] to-black"
        >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-2 text-center text-white tracking-tight">
                    Services:
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <CardContainer
                            key={index}
                            className="hover:scale-105 transition-transform duration-300"
                        >
                            <CardBody className="bg-[#161617] bg-opacity-60 backdrop-blur-lg p-8 rounded-xl border border-gray-800">
                                <CardItem
                                    translateZ="100"
                                    className={cn(
                                        "w-16 h-16 rounded-full flex items-center justify-center mb-6",
                                        `bg-gradient-to-br ${feature.gradient}`
                                    )}
                                >
                                    {React.cloneElement(feature.icon, {
                                        className: "w-8 h-8 text-white",
                                    })}
                                </CardItem>
                                <CardItem translateZ="60" className="mb-4">
                                    <h3 className="text-2xl font-semibold text-white">
                                        {feature.title}
                                    </h3>
                                </CardItem>
                                <CardItem translateZ="50">
                                    <p className="text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </section>
    )
}
