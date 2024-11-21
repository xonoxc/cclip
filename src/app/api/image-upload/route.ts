import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { auth } from "@clerk/nextjs/server"
import { cloudinaryConfg } from "@/cloudinary/config"

cloudinary.config(cloudinaryConfg)

export interface CloudinaryUploadResult {
    public_id: string
    [key: string]: any
}

export async function POST(request: NextRequest) {
    const { userId } = auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        await cloudinary.api.delete_resources_by_prefix("cclip/")

        const formData = await request.formData()
        const file = (formData.get("file") as File) || null

        if (!file) {
            return NextResponse.json({ error: "Missing file" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const response = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "cclip",
                    },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result as CloudinaryUploadResult)
                    }
                )
                uploadStream.end(buffer)
            }
        )

        return NextResponse.json(
            {
                publicId: response.public_id,
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.log("Image upload failed:", error)
        return NextResponse.json(
            {
                error: "Image Upload failed",
            },
            {
                status: 500,
            }
        )
    }
}
