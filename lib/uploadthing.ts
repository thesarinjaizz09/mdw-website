import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for prescription uploads
export const uploadRouter = {
  prescriptionUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 3,
    },
  })
    .middleware(async () => {
      // Optional: Add auth check here
      // const { user } = await auth();
      // if (!user) throw new UploadThingError("Unauthorized");
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload completed:", file.url);
      return { uploadedBy: "mdw-user" };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;