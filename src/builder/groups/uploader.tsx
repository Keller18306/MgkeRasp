import React, { ChangeEvent } from "react";

import StudentParser from "../../parser/student";
import { Groups } from "../../parser/types/group";
import { createIframe } from "../iframe";
import { readFile } from "../utils";

export default function BuilderUploader({ setGroups }: { setGroups: React.Dispatch<React.SetStateAction<Groups>> }): JSX.Element {
    async function onSelectFiles(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        const files: FileList | null = e.target.files;
        if (!files) return;

        const groups: Groups = {}
        
        for (const file of Array.from(files)) {
            const content: string = await readFile(file, 'windows-1251');

            const iframe: HTMLIFrameElement = await createIframe(document.body, content, true);

            if (!iframe.contentWindow || !iframe.contentDocument) {
                console.error('could load iframe')
                return;
            }

            new StudentParser(iframe.contentWindow).run(groups)

            iframe.remove()
        }

        setGroups(groups)
        localStorage.setItem('savedGroups', JSON.stringify(groups))
    }

    return <div className="uploader">
        <input type="file" accept=".html" multiple onChange={onSelectFiles} />
        <div className="uploader-message"></div>
    </div>
}