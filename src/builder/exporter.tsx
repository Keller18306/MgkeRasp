import React from "react";
import { Groups } from "../parser/types";

export default function BuilderExporter({ groups }: { groups: Groups }): JSX.Element {
    return <div className="exporter">
        <input type="button" value="Скопировать как HTML блок для вставки на сайт" onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
            let data: string = '';

            data += '<!-- Данный блок данных скопирован из конвертера -->\n';
            data += '<script id="mgke-json-input" type="application/json">\n';
            data += JSON.stringify(groups);
            data += '\n</script>';
            data += '\n<!-- Данный блок данных скопирован из конвертера -->';

            navigator.clipboard.writeText(data)
        }} />
    </div>
}