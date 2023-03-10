import React, { ChangeEvent } from "react";

import TeacherParser from "../../parser/teacher";
import { Teachers } from "../../parser/types/teacher";
import { createIframe } from "../iframe";
import { readFile } from "../utils";

export default function BuilderUploader({ setTeachers }: { setTeachers: React.Dispatch<React.SetStateAction<Teachers>> }): JSX.Element {
    async function onSelectFiles(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        const files: FileList | null = e.target.files;
        if (!files) return;

        const teachers: Teachers = {}
        
        for (const file of Array.from(files)) {
            const content: string = await readFile(file, 'windows-1251');

            const iframe: HTMLIFrameElement = await createIframe(document.body, content, true);

            if (!iframe.contentWindow || !iframe.contentDocument) {
                console.error('could load iframe')
                return;
            }

            new TeacherParser(iframe.contentWindow).run(teachers)

            iframe.remove()
        }

        setTeachers(teachers)
        localStorage.setItem('savedTeachers', JSON.stringify(teachers))
    }

    return <div className="uploader">
        <input type="file" accept=".html" multiple onChange={onSelectFiles} />
        <div className="uploader-message"></div>
    </div>
}