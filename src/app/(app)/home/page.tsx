"use client"

import VideoCard from "@/components/videoCard"
import { Video } from "@/types/video"
import axios from "axios"
import { useState, useCallback, useEffect } from "react"

export default function Home() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/videos")
            if (Array.isArray(response.data)) {
                setVideos(response.data)
            } else {
                throw new Error("Unexpected data format")
            }
        } catch (error) {
            console.log(error)
            setError("Failed to fetch videos")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchVideos()
    }, [])

    const handleDownload = useCallback((url: string, title: string) => {
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `${title}.mp4`)
        link.setAttribute("target", "_blank")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [])

    const handleDeleteClick = useCallback(
        async (videoId: string, public_id: string) => {
            try {
                const deleteResponse = await axios.delete("/api/videos", {
                    data: {
                        videoId,
                        public_id,
                    },
                })

                if (deleteResponse.status === 200) {
                    setVideos((prev) =>
                        prev.filter((video) => video.id !== videoId)
                    )
                }
            } catch (error) {
                console.error("Error while deleting video:", error)
            }
        },
        []
    )

    return (
        <div className="container mx-auto p-4  text-white">
            <h1 className="text-2xl font-bold mb-4">Videos</h1>
            <span>{error !== null && error}</span>
            {loading ? (
                <div className="flex items-center justify-center min-h-[500px]">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : videos.length === 0 ? (
                <div className="text-center text-lg text-gray 500">
                    No videos available
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-full">
                    {videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            onDownload={handleDownload}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
