import React from "react";
import { GroupLessonExplain, Lesson } from "../../parser/types";

export default function ViewerLessons({ lessons }: { lessons: Lesson[] }): JSX.Element {
    function lessonsParags(lessons: GroupLessonExplain[]): JSX.Element {
        return <React.Fragment>
            <td className="left">
                {lessons.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                    return <p key={i}>{lesson.subgroup ? `${lesson.subgroup}. ` : ''}{lesson.lesson}</p>
                })}
            </td>
            <td className='center'>
                {lessons.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                    return <p key={i}>{lesson.type}</p>
                })}
            </td>
            <td className='center'>
                {lessons.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                    return <p key={i}>{lesson.cabinet || '-'}</p>
                })}
            </td>
            <td className="left">
                {lessons.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                    return <p key={i}>{lesson.teacher}</p>
                })}
            </td>
        </React.Fragment>;
    }

    function lessonRow(lesson: Lesson, i: number): JSX.Element {
        if (!lesson) {
            return <tr key={i}>
                <td className='center'>{i + 1}</td>
                <td colSpan={4} />
            </tr>
        }

        const lessons: GroupLessonExplain[] = Array.isArray(lesson) ? lesson : [lesson];

        return <tr key={i}>
            <td className='center'>{i + 1}</td>
            {lessonsParags(lessons)}
        </tr>
    }

    return <React.Fragment>
        {lessons.map((lesson: Lesson, i: number): JSX.Element => lessonRow(lesson, i))}
    </React.Fragment>
}