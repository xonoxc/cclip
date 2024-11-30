import Logo from "@/components/Logo"

export default function Header() {
    return (
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <Logo />
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <a
                            href="#features"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Features
                        </a>
                    </li>
                    <li>
                        <a
                            href="#pricing"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Pricing
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
