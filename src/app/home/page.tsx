"use client"

import { useClerk } from "@clerk/nextjs"

export default function Page() {
    const { signOut } = useClerk()

    return (
        <button onClick={() => signOut({ redirectUrl: "/sign-in" })}>
            Sign out
        </button>
    )
}
