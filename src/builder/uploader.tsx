import React, { ChangeEvent } from "react"
import { readFile } from "./utils";
import { Groups } from "../parser/types";
import { createIframe } from "./iframe";
import StudentParser from "../parser/student";

export default function BuilderUploader({ groups, setGroups }: { groups: Groups, setGroups: React.Dispatch<React.SetStateAction<Groups>> }) {
    async function onSelectFiles(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;

        setGroups({})
        for (const file of Array.from(files)) {
            const content = await readFile(file, 'windows-1251');

            const iframe = await createIframe(document, content, true);

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
        <textarea style={{ width: '100%' }} value={JSON.stringify(groups, null, 4)} />
        <div className="uploader-message"></div>
    </div>
}