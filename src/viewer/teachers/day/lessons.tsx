import React from "react";
import { TeacherLesson } from "../../../parser/types/teacher";

export default function TeachersDayLessons({ lessons, maxCountLessons }: { lessons: TeacherLesson[], maxCountLessons: number }): JSX.Element {
    if (!lessons.length) {
        return <td colSpan={2 * maxCountLessons} />
    }

    const elements: JSX.Element[] = [];

    for (let i: number = 0; i < maxCountLessons; i++) {
        const lesson: TeacherLesson = lessons[i];

        if (!lesson) {
            elements.push(<td colSpan={2} key={i} />)
            continue;
        }

        elements.push(
            <React.Fragment key={i}>
                <td>
                    <p>{lesson.group}-{lesson.lesson} ({lesson.type})</p>
                </td>
                <td className="center">
                    <p>{lesson.cabinet || '-'}</p>
                </td>
            </React.Fragment>
        )
    }

    return <React.Fragment>
        {elements}
    </React.Fragment>;
} 