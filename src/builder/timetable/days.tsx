import React from "react";
import { Day } from "../../parser/types";
import Lesson from "./lesson";

export default function BuilderDays({ days }: { days: Day[] }): JSX.Element {
    const maxCountLessons: number = Math.max(...days.map((day: Day): number => {
        return day.lessons.length
    }));

    const lines: JSX.Element[] = [];
    for (let i: number = 0; i < maxCountLessons; i++) {
        lines.push(<tr key={i}>
            <td>{i + 1}</td>
            {days.map((day: Day, i: number): JSX.Element => <Lesson key={i} lesson={day.lessons[i]} />)}
        </tr>)
    }

    return <React.Fragment>
        {lines}
    </React.Fragment>
}