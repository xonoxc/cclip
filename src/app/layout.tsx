import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"
import { dark } from "@clerk/themes"

const sfPro = localFont({
    src: "../../public/fonts/sfPro.woff2",
})

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
            <body className={sfPro.className}>
                <ThemeProvider defaultTheme="dark">
                    <ClerkProvider
                        appearance={{
                            baseTheme: dark,
                        }}
                    >
                        {children}
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
