import React from "react";
import { TeacherLessonExplain } from "../../../parser/types/teacher";

export default function BuilderParags({ explain }: { explain: TeacherLessonExplain }): JSX.Element {
    return <React.Fragment>
        <td>
            <p>{explain.lesson}</p>
        </td>
        <td>
            <p>{explain.type}</p>
        </td>
        <td>
            <p>{explain.cabinet || '-'}</p>
        </td>
        <td>
            <p>{explain.group}</p>
        </td>
    </React.Fragment>;
}