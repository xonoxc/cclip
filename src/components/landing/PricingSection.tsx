import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3Dcard"
import { CheckCircle } from "lucide-react"

const plans = [
    {
        name: "Basic",
        price: "$9",
        features: [
            "100 transformations/month",
            "Basic image formats",
            "Email support",
        ],
        isPopular: false,
    },
    {
        name: "Pro",
        price: "$29",
        features: [
            "500 transformations/month",
            "All image & video formats",
            "Priority support",
        ],
        isPopular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: [
            "Unlimited transformations",
            "Custom integrations",
            "Dedicated support",
        ],
        isPopular: false,
    },
]

export default function PricingSection() {
    return (
        <section
            id="pricing"
            className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#161717] to-black via-[#161717] text-white"
        >
            <div className="container px-4 md:px-6 mx-auto relative">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                        Simple Pricing
                    </h2>
                    {/* Removed description paragraph */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <CardContainer
                            key={index}
                            className="w-full relative z-10"
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-0 right-0 flex justify-center z-30">
                                    <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <CardBody className="w-full h-full relative z-20">
                                <Card
                                    className={`w-full h-full bg-black text-white flex flex-col justify-between border-primary rounded-3xl ${plan.isPopular ? "mt-3" : ""}`}
                                >
                                    <CardHeader className="p-6">
                                        <CardItem translateZ="50">
                                            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                                                {plan.name}
                                            </CardTitle>
                                            {/* Removed plan description */}
                                        </CardItem>
                                        <CardItem
                                            translateZ="60"
                                            className="mt-4"
                                        >
                                            <div className="flex items-baseline">
                                                <span className="text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                                                    {plan.price}
                                                </span>
                                                {plan.price !== "Custom" && (
                                                    <span className="ml-2 text-sm text-gray-400">
                                                        /month
                                                    </span>
                                                )}
                                            </div>
                                        </CardItem>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <CardItem translateZ="40">
                                            <ul className="space-y-4">
                                                {plan.features.map(
                                                    (feature, featureIndex) => (
                                                        <li
                                                            key={featureIndex}
                                                            className="flex items-center"
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                                            {feature}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </CardItem>
                                        <CardItem
                                            translateZ="50"
                                            className="mt-8"
                                        >
                                            <Button className="w-full text-black bg-white hover:bg-white rounded-xl">
                                                {plan.name === "Enterprise"
                                                    ? "Contact Sales"
                                                    : "Get Started"}
                                            </Button>
                                        </CardItem>
                                    </CardContent>
                                </Card>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </section>
    )
}
