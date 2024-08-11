import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "cclip",
    description: "application for asset transformation",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClerkProvider
                    appearance={{
                        baseTheme: dark,
                    }}
                >
                    {children}
                </ClerkProvider>
            </body>
        </html>
    )
}
