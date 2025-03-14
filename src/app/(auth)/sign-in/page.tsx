"use client"

import { useSignIn } from "@clerk/nextjs"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import Logo from "@/components/Logo"
import {
    Alert,
    AlertDescription,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
} from "@/components/ui"
import { EyeOff, Eye } from "lucide-react"

interface SignUpFormCredentails {
    emailAddress: string
    password: string
}

export default function SignIn() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [credentials, setCredentials] = useState<SignUpFormCredentails>({
        emailAddress: "",
        password: "",
    })
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    if (!isLoaded) {
        return null
    }

    async function submit(e: FormEvent) {
        setError("")
        setLoading(true)
        e.preventDefault()
        if (!isLoaded) return

        const { emailAddress, password } = credentials

        if (emailAddress === "" || password === "") {
            setError("All fields are required")
        }

        try {
            const response = await signIn.create({
                identifier: emailAddress,
                password,
            })

            if (response.status === "complete") {
                await setActive({ session: response.createdSessionId })
                router.push("/home")
            } else {
                console.error(JSON.stringify(response, null, 2))
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors[0].message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#161617] to-black">
            <Card className="w-full max-w-md border-none bg-transparent text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        <div className="w-full  mt-3 flex items-center justify-center">
                            <Logo className="text-4xl" />
                        </div>
                        <div className="flex items-center justify-center  text-xm text-[#cccccc]">
                            Welcome back!
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                value={credentials.emailAddress}
                                className="rounded-xl p-6"
                                placeholder="enter email address"
                                onChange={e =>
                                    setCredentials(prev => ({
                                        ...prev,
                                        emailAddress: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={credentials.password}
                                    className="rounded-xl p-6"
                                    placeholder="enter password"
                                    onChange={e =>
                                        setCredentials(prev => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            className="w-full  bg-white text-black rounded-xl font-bold hover:bg-white py-6"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium  hover:underline text-purple-500"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
