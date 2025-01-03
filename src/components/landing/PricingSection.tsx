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
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#161717] to-black via-[#161717] text-white"
        >
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                    Simple Pricing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <CardContainer key={index} className="w-full">
                            <CardBody className="w-full h-full">
                                <Card
                                    className={`w-full h-full bg-black text-white flex flex-col justify-between border-primary rounded-3xl`}
                                >
                                    <CardHeader>
                                        <CardItem translateZ="50">
                                            <CardTitle className="text-2xl font-bold">
                                                {plan.name}
                                            </CardTitle>
                                        </CardItem>
                                        <CardItem
                                            translateZ="60"
                                            className="mt-4"
                                        >
                                            <div className="text-4xl font-bold">
                                                {plan.price}
                                                {plan.price !== "Custom" && (
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        /month
                                                    </span>
                                                )}
                                            </div>
                                        </CardItem>
                                    </CardHeader>
                                    <CardContent>
                                        <CardItem translateZ="40">
                                            <ul className="mt-4 space-y-2">
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
                                            className="mt-6 flex items-center justify-center  w-full"
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
