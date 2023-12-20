export type User = {
    name: string
    email: string
    password: string
    gender: string
    photo: {
        name: string
        size: number, 
        type: string, 
        arrayBuffer: () => Promise<ArrayBuffer>, 
        slice: (start?: number | undefined, end?: number | undefined, contentType?: string | undefined) => Blob,
        stream: () => ReadableStream<Uint8Array>, 
        text: () => Promise<string>
    }
    birthDate: string
}
