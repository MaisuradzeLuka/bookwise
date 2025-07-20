"use client";

import { useEffect, useRef, useState } from "react";
import { Image, upload, Video } from "@imagekit/next";
import { toast } from "sonner";
import { Progress } from "./ui/progress";

type Props = {
  type: "image" | "video";
  accept: "image/*" | "video/*";
  variant: "light" | "dark";
  folder: "users" | "books/images" | "books/videos";
  onFileChange: (fileUrl: string) => void;
};

const UploadFile = ({ accept, type, variant, folder, onFileChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState("");
  const [tempFile, setTempFile] = useState("");
  const firstRender = useRef(false);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/auth/imagekit");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const { signature, expire, token, publicKey } = await response.json();
      return { signature, expire, token, publicKey };
    } catch (error) {
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast.warning("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        folder,
        fileName: file.name,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      if (uploadResponse.url) {
        setFile(uploadResponse.url);
        onFileChange(uploadResponse.filePath as string);
        setProgress(0);
      }

      toast.success("Image uploaded successfuly!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }

    handleUpload();
  }, [tempFile]);

  return (
    <div>
      <label
        className={`flex items-center justify-center gap-1 ${
          variant === "dark"
            ? "bg-[#232839] text-[#D6E0FF] border-0"
            : "border border-[#CBD5E1] bg-[#F9FAFB] text-[#64748B]"
        } px-5 py-3 rounded-[5px] !ring-0  text-[16px] cursor-pointer`}
      >
        <img
          src="/icons/upload.svg"
          width={18}
          height={18}
          alt="upload image"
        />

        <span>Upload {type}</span>

        <input
          type="file"
          accept={accept}
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            e.preventDefault();
            setTempFile(e.currentTarget.value);
          }}
        />
      </label>

      {file && type === "image" ? (
        <Image
          src={file}
          width={400}
          height={400}
          alt="uploaded image"
          className="w-full rounded-sm mt-8"
        />
      ) : file && type === "video" ? (
        <Video
          src={file}
          width={400}
          height={400}
          alt="uploaded image"
          className="w-full rounded-sm mt-8"
        />
      ) : null}

      {progress ? (
        <Progress
          value={progress}
          className="w-full mt-2 bg-gray-300 rounded-full [&>div]:bg-primary-blue"
        />
      ) : null}
    </div>
  );
};

export default UploadFile;
