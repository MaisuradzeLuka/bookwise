"use client";

import { useEffect, useRef, useState } from "react";
import { upload } from "@imagekit/next";
import { toast } from "sonner";
import Image from "next/image";

const UploadImage = ({
  onFileChange,
}: {
  onFileChange: (fileUrl: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState("");
  const [tempFile, setTempFile] = useState("");

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
        fileName: file.name,
      });

      if (uploadResponse.url) {
        setFile(uploadResponse.url);
        onFileChange(uploadResponse.url);
      }

      toast.success("Image uploaded successfuly!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUpload();
  }, [tempFile]);

  return (
    <div>
      <label className="flex items-center justify-center gap-1 bg-[#232839] px-5 py-3 rounded-[5px] !ring-0 border-0 text-[16px]">
        <Image
          src="/icons/upload.svg"
          width={18}
          height={18}
          alt="upload image"
        />

        <span className="text-[#D6E0FF] text-[16px]">Upload a file</span>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            e.preventDefault();
            setTempFile(e.currentTarget.value);
          }}
        />
      </label>

      {file && (
        <Image
          src={file}
          width={400}
          height={400}
          alt="uploaded image"
          className="w-full rounded-sm mt-8"
        />
      )}
    </div>
  );
};

export default UploadImage;
