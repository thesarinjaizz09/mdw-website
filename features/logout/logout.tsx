'use client'

import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"


const Logout = () => {
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'GET'
            })

            const data = await res.json()
            if (data?.success) {
                router.refresh()
            }
        }

        logout()
    }, [])
    
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-white">
            <div className="flex gap-2 items-center max-w-sm w-fit bg-[#F4658B]/80 p-3 rounded-sm text-bold">
                <Spinner className="size-4" /> 
                <span className="text-bold text-md text-white">
                Please Wait, Logging You Out...
                </span>
            </div>
        </div>
    )
}

export default Logout