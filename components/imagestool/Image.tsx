import Utils from "@utils/Utils";
import ImageFile from "@model/imagetool/ImageFile";

function humanFileSize(size: number) {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

interface ImageProps {
    image: ImageFile
}

function Image({image}: ImageProps) {
    const gainPercentage = 100 - (100 * image.newSize / image.size)
    return (
        <div
            className={Utils.classNames(`w-[12rem] mx-4 my-2 whitespace-wrap relative text-sm font-light rounded-lg p-2`,
                image.hadErrors
                    ? "border-[2px] border-red-500"
                    : image.wasProcessed
                        ? "border-[2px] border-green-600"
                        : ""
            )}>
            {image.wasProcessed && (image.hadErrors
                ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="red" className="w-8 h-8 absolute top-0 left-0">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>

                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green"
                     className="w-8 h-8 absolute top-0 left-0">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
                </svg>)
            }
            <img alt='' src={image.src}
                 className={Utils.classNames(
                     `rounded-md border-[1px] border-gray-200`,
                 )}/>
            <div className={`flex items-center mt-1 w-full whitespace-nowrap justify-start`}>
                <p className={` ${image.newSize ? "line-through" : ``}`}>{humanFileSize(image.size)}</p>
                {image.newSize > 0 &&
                    <div className={`ml-2 w-full whitespace-nowrap flex-row flex justify-start items-center`}>
                      <p>{humanFileSize(image.newSize)}</p>
                      <p className={`ml-2 font-bold text-base text-green-600 `}> -{gainPercentage?.toFixed(0)}%</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Image;