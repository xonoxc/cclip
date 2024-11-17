import { cloudinaryConfg } from "@/cloudinary/config"
import { auth } from "@clerk/nextjs/server"
import { v2 as cloudinary } from "cloudinary"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

cloudinary.config(cloudinaryConfg)

export async function GET(_: NextRequest) {
    try {
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized request" },
                {
                    status: 401,
                }
            )
        }

        const videos = await prisma.video.findMany({
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching videos" },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized request" },
                {
                    status: 401,
                }
            )
        }

        const { videoId, public_id }: { videoId: string; public_id: string } =
            await request.json()

        if (!videoId || !public_id) {
            return NextResponse.json(
                {
                    error: `${!videoId ? "videoId" : "video_public_id"} not provided`,
                },
                { status: 400 }
            )
        }

        const cloudinaryResponse = await cloudinary.uploader.destroy(
            public_id,
            {
                resource_type: "video",
                invalidate: true,
            }
        )

        if (cloudinaryResponse.result !== "ok") {
            return NextResponse.json(
                {
                    error: `Cloudinary deletion failed: ${cloudinaryResponse.result}`,
                },
                { status: 400 }
            )
        }

        const delDbResponse = await prisma.video.delete({
            where: {
                id: videoId,
            },
        })

        if (!delDbResponse) {
            return NextResponse.json(
                {
                    error: "error deleting video from database",
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: "sucesss, video deleted successfully!" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error deleting video",
            },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
