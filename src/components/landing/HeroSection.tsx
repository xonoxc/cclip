import ShimmerButton from "@/components/ui/shimmer-button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
    const router = useRouter()

    return (
        <section
            className="py-20 text-center bg-cover bg-center relative flex items-center justify-center h-screen z-auto inset-0"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 1)), url('/images/background.jpeg')`,
            }}
        >
            <div className="content relative z-10">
                <h1 className="text-5xl font-bold mb-6">
                    Transform Your Media Dimensions
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Easily resize and reformat your images and videos for any
                    platform or device. Save time and ensure your content looks
                    perfect everywhere.
                </p>
                <div className="flex items-center justify-center">
                    <ShimmerButton
                        onClick={() => router.push("/sign-in")}
                        className="text-white rounded-2xl border-2 border-[#0f1014] text-xs"
                    >
                        Start Transforming Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </ShimmerButton>
                </div>
            </div>
            <div className="absolute inset-0 bg-black/30 z-[1]" />
        </section>
    )
}
