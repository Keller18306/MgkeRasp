import React from "react";
import { Day, GroupLessonExplain, Lesson } from "../../parser/types";

export default function BuilderDays({ days }: { days: Day[] }) {
    const maxCountLessons: number = Math.max(...days.map((day) => {
        return day.lessons.length
    }));

    function lessonsParags(lessons: GroupLessonExplain[]) {
        return <React.Fragment>
            <td>
                {lessons.map((lesson) => {
                    return <p>{lesson.subgroup ? `${lesson.subgroup}. ` : ''}{lesson.lesson}</p>
                })}
            </td>
            <td>
                {lessons.map((lesson) => {
                    return <p>{lesson.type}</p>
                })}
            </td>
            <td>
                {lessons.map((lesson) => {
                    return <p>{lesson.cabinet || '-'}</p>
                })}
            </td>
            <td>
                {lessons.map((lesson) => {
                    return <p>{lesson.teacher}</p>
                })}
            </td>
        </React.Fragment>;
    }

    function lessonCell(lesson: Lesson): JSX.Element {
        if (!lesson) {
            return <td colSpan={4} />;
        }

        const lessons: GroupLessonExplain[] = Array.isArray(lesson) ? lesson : [lesson];

        return <React.Fragment>
            {lessonsParags(lessons)}
        </React.Fragment>
    }

    const lines: JSX.Element[] = [];
    for (let i = 0; i < maxCountLessons; i++) {
        lines.push(<tr>
            <td>{i + 1}</td>
            {days.map(day => lessonCell(day.lessons[i]))}
        </tr>)
    }

    return <React.Fragment>
        {lines}
    </React.Fragment>
}