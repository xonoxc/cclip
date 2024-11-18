import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Handshake } from "lucide-react"

export default function ContactSection() {
    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
                    Get In Touch
                    <Handshake />
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
                            className="w-full bg-[#161617] border-gray-700 text-white"
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
                            className="w-full bg-[#161617] border-gray-700 text-white"
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
                            className="w-full bg-[#161617] border-gray-700 text-white rounded-md"
                        ></textarea>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-white text-black font-bold"
                    >
                        Send Message
                    </Button>
                </form>
            </div>
        </section>
    )
}
