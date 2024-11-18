import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
    const router = useRouter()

    return (
        <section className="py-20 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Transform Your Media Dimensions
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
                Easily resize and reformat your images and videos for any
                platform or device. Save time and ensure your content looks
                perfect everywhere.
            </p>
            <Button
                onClick={() => router.push("/sign-in")}
                className="text-white"
            >
                Start Transforming Now
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </section>
    )
}
