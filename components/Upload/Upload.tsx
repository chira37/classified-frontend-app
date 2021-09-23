import React, { useState } from "react";
import RCUpload from "rc-upload";
import { RcFile, UploadProgressEvent } from "rc-upload/lib/interface";
import Image from "next/image";
import classNames from "classnames";
import http from "@api/http";
import config from "config";

interface UploadProps {
    max?: number;
    onChange: (value: string | string[]) => void;
    label?: string;
}

const Upload: React.FC<UploadProps> = ({ max = 3, onChange, label }) => {
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const showUpload = imageIds.length < max;

    const onSuccess = (_response: object, _file: RcFile, xhr: any) => {
        try {
            setProgress(0);
            setCurrentImage(null);
            const imageId = xhr.responseURL.split("?")[0].split("amazonaws.com/")[1] as string;
            const newImageIds = [...imageIds, imageId];
            setImageIds(newImageIds);
            onChange(newImageIds);
        } catch (e) {
            // do noting
        }
    };

    const onStart = async (file: RcFile) => {
        setError(false);
        const arrayBuffer = await file.arrayBuffer();
        var bytes = new Uint8Array(arrayBuffer);
        const image = URL.createObjectURL(new Blob([bytes.buffer], { type: "image/jpeg" }));
        setCurrentImage(image);
    };

    const onError = () => {
        setError(true);
        setProgress(0);
        setCurrentImage(null);
    };

    const onProgress = (progress: UploadProgressEvent) => {
        setProgress(Math.round(progress.percent));
    };

    const onDelete = (id: string) => {
        const newImageIds = imageIds.filter((image) => image !== id);
        setImageIds(newImageIds);
        onChange(newImageIds);
    };

    return (
        <div className="mb-5">
            {label && <label className="pl-1 text-sm font-semibold mb-2 flex">{label}</label>}
            <div className="inline-flex gap-3">
                {imageIds.map((item) => (
                    <div
                        key={item}
                        className="relative w-32 h-32 p-1 flex justify-center items-center rounded-md border-gray-200 border-2"
                    >
                        <Image src={`${config.imageHost}${item}`} width={128} height={128} alt="ad-image" />
                        <div onClick={() => onDelete(item)} className="absolute top-2 right-2 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
                {showUpload && (
                    <RCUpload
                        action={async () => {
                            try {
                                const { data } = await http.get("/upload/image");
                                const { url } = data.data;
                                return url;
                            } catch (error) {
                                onError();
                                setError(true);
                                return null;
                            }
                        }}
                        onStart={onStart}
                        onError={onError}
                        onSuccess={onSuccess}
                        onProgress={onProgress}
                        method="PUT"
                        className="w-32 h-32"
                    >
                        <div
                            className={classNames(
                                "w-32 h-32 p-1 flex justify-center relative items-center rounded-md border-gray-200 border-2",
                                {
                                    "border-red-300": error,
                                },
                                {
                                    "cursor-wait": Boolean(currentImage),
                                }
                            )}
                        >
                            {!currentImage && "+ Upload"}
                            {currentImage && (
                                <div className="absolute h-32 w-32 ">
                                    <Image src={currentImage} layout="fill" alt="current-image" />
                                    <div className=" top-0 left-0  w-32 h-32  bg-gray-600 rounded-md flex justify-center items-center p-1 opacity-25"></div>
                                    <span className="absolute font-semibold top-0 left-0 w-32 h-32 text-white flex justify-center items-center text-2xl">
                                        {progress}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </RCUpload>
                )}
            </div>
        </div>
    );
};

export default Upload;
