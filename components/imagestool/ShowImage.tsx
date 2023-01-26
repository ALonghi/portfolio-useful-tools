import Image from './Image';
import ImageFile from "@model/imagetool/ImageFile";


interface ShowImageProps {
    images: ImageFile[],
    clearSuccessful: Function,
    clearAll: Function
}

const ShowImage = ({images, clearSuccessful, clearAll}: ShowImageProps) => {
    const show = (image, index) => {
        return <Image image={image} key={index}/>;
    };
    return <>
        {images?.length > 0 &&
            <>
              <p className={`text-3xl mt-12 mb-4`}>Your uploads</p>
              <div className={`flex gap-x-4 font-light underline `}>
                <p className={`cursor-pointer`} onClick={() => clearSuccessful()}>Clear successful</p>
                <p className={`cursor-pointer`} onClick={() => clearAll()}>Clear all</p>
              </div>
              <div className="container flex-wrap flex my-6 mx-2">
                  {images.map(show)}
              </div>
            </>
        }
    </>
};
export default ShowImage;