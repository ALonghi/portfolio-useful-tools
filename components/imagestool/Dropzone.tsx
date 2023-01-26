import React, {useCallback, useState} from 'react';
import DropBox from "@components/imagestool/Dropbox";
import ShowImage from "@components/imagestool/ShowImage";
import ImageFile from "@model/imagetool/ImageFile";
import {createNotification, setIsLoading, ToastData} from "@context/redux/UI/UISlice";
import {nanoid} from "nanoid";
import {useDispatch} from "react-redux";
import JSZip from "jszip";
import {saveAs} from "file-saver";

interface DropzoneProps {
    processImage: (img: ImageFile) => Promise<ImageFile>
}

export default function Dropzone({processImage}: DropzoneProps) {
    const [images, setImages] = useState<ImageFile[]>([]);
    const dispatch = useDispatch()

    const onDrop = useCallback((acceptedFiles) => {
        dispatch(setIsLoading(true))
        acceptedFiles.map((file: Blob, index: number) => {
            const reader = new FileReader();

            reader.onload = function (e: ProgressEvent<FileReader>) {
                setImages((prevState) => [
                    ...prevState,
                    {
                        id: nanoid(12),
                        name: file.name,
                        src: e.target.result,
                        size: file.size,
                        newSize: 0,
                        file: file
                    } as ImageFile,
                ]);
            };

            reader.readAsDataURL(file);
            return file;
        });
        dispatch(setIsLoading(false))
    }, []);

    const processAll = async () => {
        dispatch(setIsLoading(true))
        try {
            const processedImgs = await Promise.all(images.map(async (image) => {
                    try {
                        return processImage(image)
                    } catch (e) {
                        return {...image, wasProcessed: true, hadErrors: true}
                    }
                }
            ))
            setImages(() => processedImgs)
        } catch (e) {
            const notification: ToastData = {
                id: nanoid(16),
                details: `Found errors for on processing images. See below for failed ones.`,
                type: `error`,
                hidden: false,
            }
            createNotification(dispatch, notification)
        } finally {
            const imagesWithError = images.filter((i: ImageFile) => !!(i?.hadErrors))
            if (imagesWithError.length > 0) {
                const notification: ToastData = {
                    id: nanoid(16),
                    details: `Found errors for ${imagesWithError?.length} images. See below for failed ones.`,
                    type: `error`,
                    hidden: false,
                }
                createNotification(dispatch, notification)
            } else {
                const notification: ToastData = {
                    id: nanoid(16),
                    details: "All images correctly processed.",
                    type: `success`,
                    hidden: false,
                }
                createNotification(dispatch, notification)
            }
            dispatch(setIsLoading(false))
        }

    }

    const downloadFiles = () => {
        const zip = new JSZip();
        const img = zip.folder("images")
        images.forEach(image => {
            img.file(
                image.name + "-compressed.webp",
                image.compressedBlob,
                {compression: "STORE", base64: true}
            )
        })
        zip
            .generateAsync({type: "blob"})
            .then(content => {
                saveAs(content, "example.zip")
            })
    }

    return (
        <>
            <div className="container mt-8">
                <DropBox onDrop={onDrop}/>
                <div className={`flex justify-between gap-x-12`}>
                    {images?.length > 0 &&
                        (
                            <>
                                <button
                                    onClick={() => processAll()}
                                    type="button"
                                    className="cursor-pointer inline-flex w-full items-center justify-center
                        rounded-md border border-transparent bg-indigo-600 px-4 py-2
                        text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Process All
                                </button>
                                <button
                                    onClick={() => downloadFiles()}
                                    type="button"
                                    disabled={images?.filter(i =>
                                        !!(i.wasProcessed) && !!(!i.hadErrors)
                                    ).length === 0}
                                    className="cursor-pointer inline-flex w-full items-center justify-center
                        rounded-md border border-transparent bg-indigo-600 px-4 py-2
                        text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Export {images?.filter(i => !!i.wasProcessed && !!(!i.hadErrors))?.length === images?.length
                                    ? "All"
                                    : images?.filter(i => !!(i.wasProcessed) && !!(!i.hadErrors))?.length}
                                </button>
                            </>)
                    }
                </div>

                <ShowImage images={images}
                           clearAll={() => setImages(() => [])}
                           clearSuccessful={() => setImages((prev) => prev.filter(
                               i => !!!i.wasProcessed && !!!i.hadErrors
                           ))}
                />
            </div>
        </>
    );
}

