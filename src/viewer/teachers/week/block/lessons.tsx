import React from "react";
import { TeacherDay } from "../../../../parser/types/teacher";
import Lesson from "./lesson";

export default function TeacherLessons({ days }: { days: TeacherDay[] }): JSX.Element {
    const maxCountLessons: number = Math.max(...days.map((day: TeacherDay): number => {
        return day.lessons.length
    }));

    const lines: JSX.Element[] = [];
    for (let i: number = 0; i < maxCountLessons; i++) {
        lines.push(<tr key={i}>
            <th className="center">{i + 1}</th>
            {days.map((day: TeacherDay, i: number): JSX.Element => <Lesson key={i} lesson={day.lessons[i]} />)}
        </tr>)
    }

    return <React.Fragment>
        {lines}
    </React.Fragment>
}