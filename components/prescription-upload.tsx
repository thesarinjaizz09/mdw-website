"use client";

import { useState, useCallback } from "react";
import { UploadIcon, FileText, Image, X, CheckCircle, AlertCircle } from "lucide-react";
import type { ClientUploadedFileData } from "uploadthing/types";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/hooks/use-uploadthing";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/hooks/use-session";
import { useMutation } from "@tanstack/react-query";

type UploadStatus = "idle" | "uploading" | "creating" | "success" | "error";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
  // UploadThing's per-file key, used server-side to delete the remote
  // asset later. Stored in the Prescription model's `images[].publicId`.
  key: string;
}

interface PrescriptionImage {
  url: string;
  publicId: string;
}

// --- Assumption: adjust to match how your app talks to the backend ------
// Cookie-based JWT auth is assumed here (credentials: "include"). If your
// backend expects an Authorization: Bearer <token> header instead, swap
// that in `createPrescription` below.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function createPrescription(images: PrescriptionImage[]): Promise<void> {
  const res = await fetch(`/api/upload`, {
    method: "POST",
    body: JSON.stringify({ images }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.success !== true) {
    throw new Error(data?.message || "Failed to save prescription details");
  }

  return
}
// --------------------------------------------------------------------------

export default function PrescriptionUpload() {
  const { user, loading } = useSession()
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [showAllUploaded, setShowAllUploaded] = useState(false);

  const createPrescriptionMutation = useMutation({
    mutationFn: createPrescription,
    onSuccess: () => {
      setStatus("success");
      toast.success(
        "Thank You for sharing your prescription. Our Pharmacist will contact you shortly."
      );
    },
    onError: (error: Error) => {
      console.log({error})
      setStatus("error");
      toast.error(error.message || "Failed to save your prescription. Please try again.");
    },
  });

  const { startUpload, isUploading } = useUploadThing("prescriptionUploader", {
    onClientUploadComplete: (res: ClientUploadedFileData<{ uploadedBy: string }>[]) => {
      if (res && res.length > 0) {
        const mapped: UploadedFile[] = res.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
          url: f.url,
          key: f.key,
        }));
        setUploadedFiles((prev) => [...prev, ...mapped]);
        setFiles([]);
        setStatus("creating");

        const images: PrescriptionImage[] = mapped.map((f) => ({
          url: f.url,
          publicId: f.key,
        }));

        createPrescriptionMutation.mutate(images);
      }
    },
    onUploadError: (error: Error) => {
      setStatus("error");
      toast.error(error.message || "Upload failed. Please try again.");
    },
    onUploadBegin: () => {
      setStatus("uploading");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
      setStatus("idle");
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 5,
    maxSize: 16 * 1024 * 1024, // 16MB
  });

  const handleUpload = () => {
    if (!user) {
      toast.error("You must be logged in to upload a prescription.");
      return;
    }

    if (files.length === 0) return;
    startUpload(files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeUploaded = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const isPdf = (name: string) => name.toLowerCase().endsWith(".pdf");

  const isSavingPrescription = status === "creating" || createPrescriptionMutation.isPending;

  const visibleUploaded = showAllUploaded ? uploadedFiles : uploadedFiles.slice(0, 2);

  return (
    <div className="h-full w-full rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="flex h-full max-h-[300px] flex-col gap-3 overflow-y-auto p-5 py-6">
        {/* Header */}
        <div className="flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900">Upload Prescription</h2>
          <p className="text-xs text-gray-500">
            Upload prescription and we will add all medicines for you
          </p>
        </div>

        {/* Drop zone */}
        <div
          {...getRootProps()}
          className={`relative flex-shrink-0 cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all ${
            isDragActive
              ? "border-[#F4568B] bg-[#F4568B]/5"
              : "border-gray-200 hover:border-[#F4568B]/50 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-1">
            <div className="rounded-full bg-[#F4568B]/10 p-2">
              <UploadIcon className="h-4 w-4 text-[#F4568B]" />
            </div>
            {isDragActive ? (
              <p className="text-xs font-medium text-[#F4568B]">Drop files here...</p>
            ) : (
              <>
                <p className="text-xs font-medium text-gray-700">
                  Drag & drop or <span className="text-[#F4568B]">browse</span>
                </p>
                <p className="text-[10px] text-gray-400">
                  JPEG, PNG, PDF up to 16MB
                </p>
              </>
            )}
          </div>
        </div>

        {/* Files list - scrollable */}
        <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto">
          {/* Selected files */}
          {files.length > 0 && (
            <div className="space-y-1.5">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 p-2"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {isPdf(file.name) ? (
                      <FileText className="h-3.5 w-3.5 flex-shrink-0 text-red-500" />
                    ) : (
                      <Image className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                    )}
                    <span className="truncate text-[11px] text-gray-700">{file.name}</span>
                    <span className="flex-shrink-0 text-[10px] text-gray-400">
                      {formatSize(file.size)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="flex-shrink-0 rounded-full p-0.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleUpload}
                disabled={isUploading || isSavingPrescription}
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[#F4568B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#F4568B]/80 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? (
                  <>
                    <Spinner className="h-3.5 w-3.5" />
                    Uploading...
                  </>
                ) : isSavingPrescription ? (
                  <>
                    <Spinner className="h-3.5 w-3.5" />
                    Saving...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-3.5 w-3.5" />
                    Upload Prescription
                  </>
                )}
              </button>
            </div>
          )}

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <p className="text-[11px] font-semibold text-green-700">
                  {uploadedFiles.length} file(s) uploaded
                </p>
              </div>
              {visibleUploaded.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-green-100 bg-green-50 p-2"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {isPdf(file.name) ? (
                      <FileText className="h-3.5 w-3.5 flex-shrink-0 text-green-600" />
                    ) : (
                      <Image className="h-3.5 w-3.5 flex-shrink-0 text-green-600" />
                    )}
                    <span className="truncate text-[11px] text-gray-700">{file.name}</span>
                    <span className="flex-shrink-0 text-[10px] text-gray-400">
                      {formatSize(file.size)}
                    </span>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700 transition-colors hover:bg-green-200"
                  >
                    View
                  </a>
                </div>
              ))}
              {uploadedFiles.length > 2 && (
                <button
                  onClick={() => setShowAllUploaded(!showAllUploaded)}
                  className="w-full text-center text-[10px] font-medium text-[#F4568B] hover:underline"
                >
                  {showAllUploaded ? "Show less" : `View all ${uploadedFiles.length} files`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Status feedback */}
        {status === "error" && (
          <div className="flex flex-shrink-0 items-center gap-1.5 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" />
            {createPrescriptionMutation.isError
              ? "Files uploaded, but we couldn't save your prescription. Please try again."
              : "Upload failed. Please try again."}
          </div>
        )}
      </div>
    </div>
  );
}