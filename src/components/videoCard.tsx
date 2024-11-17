import React, { useState, useEffect, useCallback } from "react"
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary"
import { Download, Clock, FileDown, FileUp, Trash } from "lucide-react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { filesize } from "filesize"
import { Video } from "@/types/video"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

dayjs.extend(relativeTime)

interface VideoCardProps {
    video: Video
    onDownload: (url: string, title: string) => void
    onDelete: (videoId: string, publicId: string) => void
}

export default function VideoCard({
    video,
    onDownload,
    onDelete,
}: VideoCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [previewError, setPreviewError] = useState(false)

    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "80",
            assetType: "video",
        })
    }, [])

    const getFullVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,
        })
    }, [])

    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            rawTransformations: [
                "e_preview:duration_15:max_seg_9:min_seg_dur_1",
            ],
        })
    }, [])

    const formatSize = useCallback((size: string) => {
        if (size !== "undefined") {
            return filesize(parseInt(size))
        }
        return "N/A"
    }, [])

    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.round(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }, [])

    const calcCompressionPercentage = useCallback(
        (compressedSize: number, originalSize: number) => {
            const percentage = ((compressedSize / originalSize) * 100).toFixed(
                2
            )
            return parseFloat(percentage)
        },
        []
    )

    useEffect(() => {
        setPreviewError(false)
    }, [isHovered])

    const handlePreviewError = () => {
        setPreviewError(true)
    }

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-[#161717] border-1">
            <div
                className="relative aspect-video"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered && !previewError ? (
                    <video
                        src={getPreviewVideoUrl(video.publicId)}
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                        onError={handlePreviewError}
                    />
                ) : (
                    <img
                        src={getThumbnailUrl(video.publicId)}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <Badge className="absolute bottom-2 right-2 bg-background/80 text-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDuration(Number(video.duration))}
                </Badge>
            </div>
            <CardHeader>
                <CardTitle className="text-md line-clamp-1 text-white">
                    {video.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {video.description}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    Uploaded {dayjs(video.createdAt).fromNow()}
                </p>
                {video.compressedSize.toString() !== "undefined" ? (
                    <>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center">
                                            <FileUp className="w-4 h-4 mr-2 text-primary" />
                                            <div>
                                                <div className="font-semibold">
                                                    Original
                                                </div>
                                                <div>
                                                    {formatSize(
                                                        video.originalSize.toString()
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Original file size</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center">
                                            <FileDown className="w-4 h-4 mr-2 text-secondary" />
                                            <div>
                                                <div className="font-semibold">
                                                    Compressed
                                                </div>
                                                <div>
                                                    {formatSize(
                                                        video.compressedSize.toString()
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Compressed file size</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Compression</span>
                                <span className="font-medium">
                                    {calcCompressionPercentage(
                                        video.compressedSize,
                                        video.originalSize
                                    )}
                                    %
                                </span>
                            </div>
                            <Progress
                                value={calcCompressionPercentage(
                                    video.compressedSize,
                                    video.originalSize
                                )}
                                className="h-2"
                            />
                        </div>
                    </>
                ) : (
                    <Badge variant="destructive">Cannot compress</Badge>
                )}
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-2">
                <Button
                    className="w-full bg-white text-black hover:bg-white"
                    onClick={() =>
                        onDownload(getFullVideoUrl(video.publicId), video.title)
                    }
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                </Button>

                <button
                    onClick={() => onDelete(video.id, video.publicId)}
                    className="bg-white text-black p-1 rounded-md"
                >
                    <Trash />
                </button>
            </CardFooter>
        </Card>
    )
}
