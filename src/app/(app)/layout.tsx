"use client"

import { useState, useEffect } from "react"
import { useClerk, useUser } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
    ImageIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    Share2Icon,
    UploadIcon,
    X,
} from "lucide-react"
import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
    { href: "/social-share", icon: Share2Icon, label: "Social Share" },
    { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
]

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { signOut } = useClerk()
    const { user } = useUser()

    const handleLogoClick = () => router.push("/")

    const handleSignOut = async () => {
        await signOut()
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar for larger screens */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out bg-[#161717]",
                    "lg:relative lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-8">
                    <ul className="space-y-2 px-4">
                        {sidebarItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-4 px-4 py-2 rounded-lg transition-colors",
                                        pathname === item.href
                                            ? "bg-black text-white"
                                            : "hover:bg-black/20"
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {user && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Button
                            onClick={handleSignOut}
                            className="w-full bg-transparent text-white border-2 border-white hover:bg-white hover:text-black transition-colors"
                        >
                            <LogOutIcon className="mr-2 h-5 w-5" />
                            Sign Out
                        </Button>
                    </div>
                )}
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Navbar */}
                <header className="bg-[#161717] shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="text-white p-2 rounded-md lg:hidden"
                                >
                                    <MenuIcon className="h-6 w-6" />
                                </button>
                                <Link
                                    href="/"
                                    onClick={handleLogoClick}
                                    className="ml-4 lg:ml-0"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Logo />
                                    </div>
                                </Link>
                            </div>
                            {user && (
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={user.imageUrl}
                                            alt={
                                                user.username ||
                                                user.emailAddresses[0]
                                                    .emailAddress
                                            }
                                        />
                                        <AvatarFallback>
                                            {user.username?.[0] ||
                                                user.emailAddresses[0]
                                                    .emailAddress[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm truncate max-w-[150px] sm:max-w-xs">
                                        {user.username ||
                                            user.emailAddresses[0].emailAddress}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    )
}
