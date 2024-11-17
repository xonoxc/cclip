"use client"

import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ArrowRight, Image, Video, Zap, Shield, Smartphone } from "lucide-react"

export default function LandingPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Image className="w-8 h-8 text-blue-500" />
                    <Logo />
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <a
                                href="#features"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Features
                            </a>
                        </li>
                        <li>
                            <a
                                href="#pricing"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="py-20 text-center">
                    <h1 className="text-5xl font-bold mb-6">
                        Transform Your Media Dimensions
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Easily resize and reformat your images and videos for
                        any platform or device. Save time and ensure your
                        content looks perfect everywhere.
                    </p>
                    <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => router.push("/sign-in")}
                    >
                        Start Transforming Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </section>

                <section id="features" className="py-20 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Key Features
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <Image className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Image Transformation
                                </h3>
                                <p>
                                    Resize, crop, and optimize images for
                                    various platforms and devices.
                                </p>
                            </div>
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <Video className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Video Reformatting
                                </h3>
                                <p>
                                    Adjust video dimensions and formats to suit
                                    different social media requirements.
                                </p>
                            </div>
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <Zap className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Batch Processing
                                </h3>
                                <p>
                                    Transform multiple files at once, saving you
                                    time and effort.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            How It Works
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
                            <div className="w-full md:w-1/2">
                                <img
                                    src="/placeholder.svg?height=300&width=400"
                                    alt="TransformX interface"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 rounded-full p-2">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            1. Upload Your Files
                                        </h3>
                                        <p>
                                            Securely upload your images or
                                            videos to our platform.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 rounded-full p-2">
                                        <Smartphone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            2. Choose Your Format
                                        </h3>
                                        <p>
                                            Select from a variety of preset
                                            dimensions or customize your own.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 rounded-full p-2">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            3. Download Transformed Media
                                        </h3>
                                        <p>
                                            Get your resized and reformatted
                                            files instantly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="pricing" className="py-20 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Simple Pricing
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-700 p-8 rounded-lg text-center">
                                <h3 className="text-2xl font-bold mb-4">
                                    Basic
                                </h3>
                                <p className="text-4xl font-bold mb-6">
                                    $9
                                    <span className="text-xl font-normal">
                                        /mo
                                    </span>
                                </p>
                                <ul className="mb-8 space-y-2">
                                    <li>100 transformations/month</li>
                                    <li>Basic image formats</li>
                                    <li>Email support</li>
                                </ul>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Choose Plan
                                </Button>
                            </div>
                            <div className="bg-blue-600 p-8 rounded-lg text-center transform scale-105 shadow-xl">
                                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                                <p className="text-4xl font-bold mb-6">
                                    $29
                                    <span className="text-xl font-normal">
                                        /mo
                                    </span>
                                </p>
                                <ul className="mb-8 space-y-2">
                                    <li>500 transformations/month</li>
                                    <li>All image & video formats</li>
                                    <li>Priority support</li>
                                </ul>
                                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                                    Choose Plan
                                </Button>
                            </div>
                            <div className="bg-gray-700 p-8 rounded-lg text-center">
                                <h3 className="text-2xl font-bold mb-4">
                                    Enterprise
                                </h3>
                                <p className="text-4xl font-bold mb-6">
                                    Custom
                                </p>
                                <ul className="mb-8 space-y-2">
                                    <li>Unlimited transformations</li>
                                    <li>Custom integrations</li>
                                    <li>Dedicated support</li>
                                </ul>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-20">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Get In Touch
                        </h2>
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Your message"
                                    className="w-full bg-gray-800 border-gray-700 text-white rounded-md"
                                ></textarea>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2023 TransformX. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
