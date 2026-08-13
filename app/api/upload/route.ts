import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/server/backend";

type UploadImageInput = {
    url?: string;
    publicId?: string;
    key?: string;
};

export async function POST(req: Request) {
    const body = await req.json();

    const images = Array.isArray(body?.images)
        ? body.images
            .map((image: UploadImageInput) => ({
                url: typeof image?.url === "string" ? image.url.trim() : "",
                publicId: typeof image?.publicId === "string" ? image.publicId : image?.key ?? "",
            }))
            .filter((image: { url: string }) => image.url)
        : [];

    if (images.length === 0) {
        return NextResponse.json(
            { message: "At least one valid prescription image is required." },
            { status: 400 }
        );
    }

    const response = await backendFetch(
        `/prescriptions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...body,
                images,
            }),
        }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        return NextResponse.json(
            { message: data.message || "Failed to save prescription details" },
            { status: response.status }
        );
    }

    return NextResponse.json({
        success: true,
        message: data.message || "Prescription saved successfully",
    });
}