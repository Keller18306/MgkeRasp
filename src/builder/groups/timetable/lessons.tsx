import React from "react";
import { GroupDay } from "../../../parser/types/group";
import Lesson from "./lesson";

export default function BuilderLessons({ days }: { days: GroupDay[] }): JSX.Element {
    const maxCountLessons: number = Math.max(...days.map((day: GroupDay): number => {
        return day.lessons.length
    }));

    const lines: JSX.Element[] = [];
    for (let i: number = 0; i < maxCountLessons; i++) {
        lines.push(<tr key={i}>
            <td>{i + 1}</td>
            {days.map((day: GroupDay, j: number): JSX.Element => <Lesson key={j} lesson={day.lessons[i]} />)}
        </tr>)
    }

    return <React.Fragment>
        {lines}
    </React.Fragment>
}