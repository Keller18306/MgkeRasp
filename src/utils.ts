export function readFile(file: File, encoding?: string): Promise<string> {
    const reader = new FileReader()
    
    const promise = new Promise<string>(res => {
        reader.onload = (e) => {
            res(reader.result as string)
        }
    })

    reader.readAsText(file, encoding)
        
    return promise;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];

    for (let chunkId = 0; chunkId < Math.ceil(array.length / size); chunkId++) {
        const chunk: any[] = [];

        for (let item = 0; item < size; item++) {
            const i = chunkId * size + item;
            chunk.push(array[i])
        }

        chunks.push(chunk);
    }

    return chunks;
} 