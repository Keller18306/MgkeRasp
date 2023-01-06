import React, { useMemo } from "react";
import gzip from 'gzip-js'
import { Buffer } from 'buffer'
import { Groups } from "../../parser/types/group";
import { Teachers } from "../../parser/types/teacher";

export default function BuilderExporter({ groups, teachers }: { groups: Groups, teachers: Teachers }): JSX.Element {
    const json: object = {
        groups: groups,
        teachers: teachers,
        timestamp: Date.now()
    }

    return <div className="exporter">
        <textarea style={{ width: '100%' }} value={JSON.stringify(json, null, 4)} readOnly />

        <input type="button" value="Скопировать как HTML блок для вставки на сайт" onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
            let data: string = '';
            
            data += '<!-- Данный блок данных ГРУПП скопирован из конвертера -->\n';
            data += '<script id="mgke-json-input" type="application/json">\n';
            data += Buffer.from(gzip.zip(Buffer.from(JSON.stringify(json)), {
                level: 9
            })).toString('base64');
            data += '\n</script>';
            data += '\n<!-- Данный блок данных ГРУПП скопирован из конвертера -->';
            
            navigator.clipboard.writeText(data)
        }} />
    </div>
}