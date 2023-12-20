export type UpdateUser = {
	name: string
	password: string
	photo: {
        name: string
        size: number, 
        type: string, 
        arrayBuffer: () => Promise<ArrayBuffer>, 
        slice: (start?: number | undefined, end?: number | undefined, contentType?: string | undefined) => Blob,
        stream: () => ReadableStream<Uint8Array>, 
        text: () => Promise<string>
    }
}