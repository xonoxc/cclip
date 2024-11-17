"use client"

import {
    ImageIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    Share2Icon,
    UploadIcon,
} from "lucide-react"
import { useClerk, useUser } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
    { href: "/social-share", icon: Share2Icon, label: "Social Share" },
    { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
]

export default function AppLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()
    const { signOut } = useClerk()
    const { user } = useUser()

    const handleLogoClick = () => router.push("/")

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <div className="drawer lg:drawer-open">
            <input
                id="sidebar-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={sidebarOpen}
                onChange={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <header className="w-full bg-black">
                    <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex-none lg:hidden">
                            <label
                                htmlFor="sidebar-drawer"
                                className="btn btn-square btn-ghost drawer-button"
                            >
                                <MenuIcon />
                            </label>
                        </div>
                        <div className="flex-1">
                            <Link href="/" onClick={handleLogoClick}>
                                <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer text-white">
                                    <Logo />
                                </div>
                            </Link>
                        </div>
                        <div className="flex-none flex items-center space-x-4">
                            {user && (
                                <>
                                    <div className="avatar">
                                        <div className="w-8 h-8 rounded-full">
                                            <img
                                                src={user.imageUrl}
                                                alt={
                                                    user.username ||
                                                    user.emailAddresses[0]
                                                        .emailAddress
                                                }
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm truncate max-w-xs lg:max-w-md text-white">
                                        {user.username ||
                                            user.emailAddresses[0].emailAddress}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                {/* Page content */}
                <main className="flex-grow bg-black text-white">
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
                        {children}
                    </div>
                </main>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="sidebar-drawer"
                    className="drawer-overlay"
                ></label>
                <aside className="bg-[#161717] w-64 h-full flex flex-col">
                    <div className="flex items-center justify-center py-4">
                        <ImageIcon className="w-10 h-10 text-white" />
                    </div>
                    <ul className="menu p-4 w-full text-base-content flex-grow">
                        {sidebarItems.map((item) => (
                            <li key={item.href} className="mb-2">
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                                        pathname === item.href
                                            ? "bg-black text-white"
                                            : "hover:bg-base-300"
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {user && (
                        <div className="p-4">
                            <Button
                                onClick={handleSignOut}
                                className="w-full text-gray-500 border-2 border-gray-500"
                            >
                                <LogOutIcon className="mr-2 h-5 w-5" />
                                Sign Out
                            </Button>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}
