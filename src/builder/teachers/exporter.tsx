import React from "react";
import { Teachers } from "../../parser/types/teacher";
import gzip from 'gzip-js'
import { Buffer } from 'buffer'

export default function BuilderExporter({ teachers }: { teachers: Teachers }): JSX.Element {
    return <div className="exporter">
        <input type="button" value="Скопировать как HTML блок для вставки на сайт" onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
            let data: string = '';

            data += '<!-- Данный блок данных УЧИТЕЛЕЙ скопирован из конвертера -->\n';
            data += '<script id="mgke-json-input" type="application/json">\n';
            data += Buffer.from(gzip.zip(Buffer.from(JSON.stringify({
                type: 'teachers',
                teachers: teachers,
                timestamp: Date.now()
            })), {
                level: 9
            })).toString('base64');
            data += '\n</script>';
            data += '\n<!-- Данный блок данных УЧИТЕЛЕЙ скопирован из конвертера -->';

            navigator.clipboard.writeText(data)
        }} />
    </div>
}