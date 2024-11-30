"use client"

import React, { useState, useEffect, useRef } from "react"
import { CldImage } from "next-cloudinary"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { socialFormats, SocialFormat } from "@/types/socialFormats"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { MessagesSquare, X } from "lucide-react"

export default function SocialShare() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
        "Instagram Square (1:1)"
    )
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isTransforming, setIsTransforming] = useState<boolean>(false)
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (uploadedImage) {
            setIsTransforming(true)
        }
    }, [selectedFormat, uploadedImage])

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]
        if (!file) return
        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) throw new Error("Failed to upload image")

            const data = await response.json()
            setUploadedImage(data.publicId)
        } catch (error) {
            console.log(error)
            alert("Failed to upload image")
        } finally {
            setIsUploading(false)
        }
    }

    const handleDownload = () => {
        if (!imageRef.current) return

        fetch(imageRef.current.src)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
            })
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-xl font-bold mb-6 text-center flex items-center justify-center flex-col gap-2">
                <MessagesSquare color="#ffffff" />
                Social Media Formats
            </h1>

            <div className="card">
                <div className="card-body">
                    <h2 className="card-title mb-4">Upload an Image</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Choose an image file
                            </span>
                        </label>
                        <Input
                            id="image-file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="pl-8 bg-[#161717] border-gray-700 text-gray-300 focus:border-gray-600 focus:ring-gray-600 file:bg-gray-[#cccccc] file:text-gray-300 file:border-0 file:rounded-md"
                            required
                        />
                    </div>

                    {isUploading && (
                        <div className="mt-4">
                            <progress className="progress w-full"></progress>
                        </div>
                    )}

                    {uploadedImage && (
                        <div className="mt-6">
                            <h2 className="card-title mb-4">
                                Select Social Media Format
                            </h2>
                            <div className="form-control">
                                <Select
                                    value={selectedFormat}
                                    onValueChange={value =>
                                        setSelectedFormat(value as SocialFormat)
                                    }
                                >
                                    <SelectTrigger className="w-full bg-[#161717] border-gray-700 text-gray-300">
                                        <SelectValue placeholder="Select a format" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#161717] border-gray-700">
                                        {Object.keys(socialFormats).map(
                                            format => (
                                                <SelectItem
                                                    key={format}
                                                    value={format}
                                                    className="text-gray-300 focus:text-white focus:bg-[#212121]"
                                                >
                                                    {format}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <ScrollArea className="h-96 mt-3">
                                <div className="mt-6 relative">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Preview:
                                    </h3>
                                    <div className="flex justify-center">
                                        {isTransforming && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10 top-6">
                                                <span className="loading loading-spinner loading-lg"></span>
                                            </div>
                                        )}
                                        <CldImage
                                            width={
                                                socialFormats[selectedFormat]
                                                    .width
                                            }
                                            height={
                                                socialFormats[selectedFormat]
                                                    .height
                                            }
                                            src={uploadedImage}
                                            sizes="100vw"
                                            alt="transformed image"
                                            crop="fill"
                                            className="rounded-md cursor-pointer"
                                            aspectRatio={
                                                socialFormats[selectedFormat]
                                                    .aspectRatio
                                            }
                                            gravity="auto"
                                            ref={imageRef}
                                            onLoad={() =>
                                                setIsTransforming(false)
                                            }
                                            onClick={() =>
                                                setIsDialogOpen(true)
                                            }
                                        />
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="card-actions justify-end mt-6">
                                <Button
                                    className="bg-white text-black"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Proceed
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-auto bg-[#161717] text-white border-none">
                    <DialogHeader>
                        <DialogTitle>Transformed Image</DialogTitle>
                        <DialogDescription>
                            {selectedFormat} - Click outside or press Escape to
                            close
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center items-center">
                        <CldImage
                            width={socialFormats[selectedFormat].width}
                            height={socialFormats[selectedFormat].height}
                            src={uploadedImage || ""}
                            sizes="100vw"
                            alt="transformed image full size"
                            crop="fill"
                            className="rounded-md max-w-full max-h-[70vh] object-contain"
                            aspectRatio={
                                socialFormats[selectedFormat].aspectRatio
                            }
                            gravity="auto"
                        />
                    </div>
                    <DialogFooter className="sm:justify-between">
                        <Button
                            variant="outline"
                            className="mt-2 sm:mt-0 text-black"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Close
                        </Button>
                        <Button
                            onClick={handleDownload}
                            className="mt-2 sm:mt-0 bg-white text-black hover:bg-white"
                        >
                            Download
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
