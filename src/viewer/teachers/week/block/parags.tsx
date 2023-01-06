import React from "react";
import { TeacherLessonExplain } from "../../../../parser/types/teacher";

export default function BuilderParags({ explain }: { explain: TeacherLessonExplain }): JSX.Element {
    return <React.Fragment>
        <td>
            <p>{explain.group}-{explain.lesson} ({explain.type})</p>
        </td>
        <td className="center">
            <p>{explain.cabinet || '-'}</p>
        </td>
    </React.Fragment>;
}