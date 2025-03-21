"use client"

import { useSignUp } from "@clerk/nextjs"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
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
import { Eye, EyeOff } from "lucide-react"
import Logo from "@/components/Logo"

interface SignUpFormCredentails {
    emailAddress: string
    password: string
}

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [credentials, setCredentials] = useState<SignUpFormCredentails>({
        emailAddress: "",
        password: "",
    })
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [pendingVerification, setPendingVerification] =
        useState<boolean>(false)
    const [code, setCode] = useState<string>("")
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
            await signUp.create({ emailAddress, password })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            })

            setPendingVerification(true)
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors[0].message)
        } finally {
            setLoading(false)
        }
    }

    async function onPressVerify(e: FormEvent) {
        e.preventDefault()
        if (!isLoaded) return

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code,
                }
            )
            console.log("completeSignUp", completeSignUp)

            if (completeSignUp.status !== "complete")
                console.error(JSON.stringify(completeSignUp, null, 2))

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })
                router.push("/home")
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors[0].message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#161617] to-black">
            <Card className="w-full max-w-md bg-transparent text-white border-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        <div className="w-full  mt-3 flex items-center justify-center">
                            <Logo className="text-4xl" />
                        </div>
                        <div className="flex items-center justify-center  text-md text-[#cccccc]">
                            Create an account
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!pendingVerification ? (
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2 ">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={credentials.emailAddress}
                                    className="rounded-xl p-6"
                                    placeholder="enter email"
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
                                        type={
                                            showPassword ? "text" : "password"
                                        }
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
                                {!loading ? "Sign Up" : "Signing Up..."}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={onPressVerify} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="code">Verification Code</Label>
                                <Input
                                    id="code"
                                    value={code}
                                    className="rounded-xl py-6"
                                    onChange={e => setCode(e.target.value)}
                                    placeholder="Enter verification code"
                                    required
                                />
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
                                {!loading ? "Verify" : "Verifying..."}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-purple-500 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
