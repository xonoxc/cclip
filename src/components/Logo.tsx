import React from "react"
import { Scissors } from "lucide-react"

interface LogoProps {
    className?: string
    size?: number
}

const Logo: React.FC<LogoProps> = ({ className, size = 14 }) => (
    <div className="flex items-center space-x-2">
        <Scissors size={size} className="h-6 w-6 text-white" />
        <span className={`text-2xl font-bold ${className}`}>
            <span className="text-purple-500 text-md">C</span>
            <span className="text-secondary">clip</span>
        </span>
    </div>
)

export default Logo
