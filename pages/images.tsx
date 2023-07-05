import React, {useState} from "react";
import Dropzone from "@components/imagestool/Dropzone";
import SwitchWithLabel from "@components/shared/SwitchWithLabel";
import ImageFile from "@model/imagetool/ImageFile";
import Resizer from "react-image-file-resizer";
import logging from "@utils/logging";

const ImagesToolPage = () => {
    const [withCompression, setWithCompression] = useState<boolean>(true);
    const [withConvertToWebp, setWithConvertToWebp] = useState<boolean>(true);
    const [quality, setQuality] = useState<number>(98);

    const process = (img: ImageFile): Promise<ImageFile> => {
        try {
            return new Promise((resolve, reject) => {
                Resizer.imageFileResizer(
                    img.file,
                    1000,
                    1000,
                    withConvertToWebp ? "WEBP" : "JPEG",
                    withCompression ? quality : 100,
                    0,
                    (res: File) => {
                        const processed: ImageFile = {
                            ...img,
                            newSize: res.size,
                            wasProcessed: true,
                            hadErrors: false,
                            compressedBlob: res,
                        };
                        resolve(processed);
                    },
                    "file"
                );
            });
        } catch (err) {
            logging.error("Failed to use imageFileResizer ", err);
            const processed: ImageFile = {
                ...img,
                wasProcessed: true,
                hadErrors: true,
            };
            return Promise.resolve(processed);
        }
    };

    return (
        <>
            <div className={`flex flex-col max-w-full`}>
                <p className={`mt-12 text-3xl text-center`}>
                    Compress and resize multiple images at once
                </p>
                <div
                    className={`mt-2 mb-12 font-light text-sm text-center w-10/12 mx-auto`}
                >
                    <p className={`italic`}>
                        (Image sizes will be resized to 1000x1000 px){" "}
                    </p>
                </div>
                <div className={`w-10/12 md:w-full mx-auto mt-4`}>
                    <div
                        className={`flex justify-start md:justify-center 
                flex-wrap gap-x-4 md:gap-x-12 gap-y-4`}
                    >
                        <div>
                            <SwitchWithLabel
                                label={"Compress images"}
                                updateSelection={(v) => setWithCompression(v)}
                                enabled={withCompression}
                                classes={``}
                            />
                            <p className={`ml-1 font-extralight text-sm italic`}>
                                With almost lossless quality ({quality}%)
                            </p>
                        </div>
                        {/*<div className={`inline-flex flex-col items-start `}>*/}
                        {/*    <SwitchWithLabel label={"Resize images"} updateSelection={(v) => setWithResizing(v)}*/}
                        {/*                     enabled={withResizing}/>*/}
                        {/*    <div className={`font-light text-sm`}>*/}
                        {/*        <p>Image sizes will be </p>*/}
                        {/*        <p>resized to 1000x1000 px</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <SwitchWithLabel
                            label={"Convert to WebP"}
                            updateSelection={(v) => setWithConvertToWebp(v)}
                            enabled={withConvertToWebp}
                        />
                    </div>
                    {/*{withCompression &&*/}
                    {/*    <>*/}
                    {/*      <InputForm label={"Quality level"} type={"number"} name={"quality"}*/}
                    {/*                 placeholder={"Quality level"}*/}
                    {/*                 value={quality} updateValue={(e) => setQuality(e)}*/}
                    {/*                 inputClasses={`max-w-[7rem] ml-4`}*/}
                    {/*                 componentClasses={`flex justify-start md:justify-center items-center mt-6`}/>*/}
                    {/*      <p className={`ml-2 mt-3 font-extralight text-sm`}>{quality} recommended for minimal loss</p>*/}
                    {/*    </>*/}
                    {/*}*/}
                </div>
                <div className={`m-8 flex`}>
                    <Dropzone processImage={(img: ImageFile) => process(img)}/>
                </div>
            </div>
        </>
    );
};

export default ImagesToolPage;
