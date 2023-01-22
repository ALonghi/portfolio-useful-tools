export default interface ImageFile {
    id: number,
    name: string,
    src: string,
    compressedBlob?: File,
    size: number,
    newSize: number,
    originalFormat: string
    file: Blob | File,
    wasProcessed?: boolean,
    hadErrors?: boolean
}