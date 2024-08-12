import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import { cloudinaryConfg } from "@/cloudinary/config"
import { CloudinaryUploadResult } from "@/app/api/image-upload/route"

const prisma = new PrismaClient()

cloudinary.config(cloudinaryConfg)

interface VideoUploadResult extends CloudinaryUploadResult {
    bytes: number
    duration?: number
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return NextResponse.json(
                {
                    error: "Cloudinary credentials missing!",
                },
                { status: 500 }
            )
        }

        const formData = await request.formData()
        const file = formData.get("file") as File | null
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const originalSize = formData.get("originalSize") as string

        const bytes = await file?.arrayBuffer()
        const buffer = Buffer.from(bytes as ArrayBuffer)

        const result = await new Promise<VideoUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "cclip",
                        transformation: [
                            { quality: "auto", fetch_format: "mp4" },
                        ],
                    },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result as Awaited<VideoUploadResult>)
                    }
                )
                uploadStream.end(buffer)
            }
        )

        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalSize: originalSize,
                compressedSize: String(result.compressedSize),
                duration: String(result.duration || 0),
            },
        })

        return NextResponse.json(video)
    } catch (error) {
        console.log("UPload video failed", error)

        return NextResponse.json(
            { error: "Video upload failed" },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
