"use client"

import React, { useCallback, useMemo, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FileVideo, Type, FileText, Upload, Video } from "lucide-react"
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Progress,
    Textarea,
} from "@/components/ui"

export default function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const router = useRouter()

    const MAX_FILE_SIZE = useMemo(() => 70 * 1024 * 1024, [])

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!file) return

            if (file.size > MAX_FILE_SIZE) {
                alert("File size too large")
                return
            }

            setIsUploading(true)
            const formData = new FormData()
            formData.append("file", file)
            formData.append("title", title)
            formData.append("description", description)
            formData.append("originalSize", file.size.toString())

            try {
                const response = await axios.post(
                    "/api/video-upload",
                    formData,
                    {
                        onUploadProgress: progressEvent => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total!
                            )
                            setUploadProgress(percentCompleted)
                        },
                    }
                )
                if (response.status === 200) {
                    router.push("/")
                } else {
                    throw new Error("video upload failed")
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsUploading(false)
            }
        },
        [file, title, description, router, MAX_FILE_SIZE]
    )

    return (
        <div className="w-full flex items-center  justify-center">
            <Card className="w-full max-w-4xl bg-black shadow-none border-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-300 flex gap-2">
                        <Video size={35} />
                        Upload Video
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="title"
                                    className="text-sm font-medium text-gray-400"
                                >
                                    Title
                                </label>
                                <div className="relative">
                                    <Type className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="pl-8 bg-[#161717] border-gray-700 text-gray-300 focus:border-gray-600 focus:ring-gray-600"
                                        placeholder="Enter video title"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="video-file"
                                    className="text-sm font-medium text-gray-400"
                                >
                                    Video File
                                </label>
                                <div className="relative">
                                    <FileVideo className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="video-file"
                                        type="file"
                                        accept="video/*"
                                        onChange={e =>
                                            setFile(e.target.files?.[0] || null)
                                        }
                                        className="pl-8 bg-[#161717] border-gray-700 text-gray-300 focus:border-gray-600 focus:ring-gray-600 file:bg-gray-[#cccccc] file:text-white file:border-0 file:rounded-md "
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium text-gray-400"
                            >
                                Description
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={e =>
                                        setDescription(e.target.value)
                                    }
                                    className="pl-8 min-h-[100px] bg-[#161717] border-gray-700 text-gray-300 focus:border-gray-600 focus:ring-gray-600"
                                    placeholder="Enter video description"
                                />
                            </div>
                        </div>
                        {isUploading && (
                            <div className="space-y-2">
                                <Progress
                                    value={uploadProgress}
                                    className="w-full bg-white"
                                />
                                <p className="text-sm text-black text-center">
                                    {uploadProgress}% uploaded
                                </p>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-white text-black font-bold hover:bg-white  disabled:bg-gray-50 disabled:text-black"
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <>Uploading...</>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Video
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
