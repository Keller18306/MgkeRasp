import React from "react";
import { GroupLessonExplain, Lesson } from "../../parser/types";

export default function ViewerLessons({ lessons }: { lessons: Lesson[] }) {
    function lessonsParags(lessons: GroupLessonExplain[]) {
        return <React.Fragment>
            <td>
                {lessons.map((lesson) => {
                    return <p>{lesson.subgroup ? `${lesson.subgroup}. ` : ''}{lesson.lesson}</p>
                })}
            </td>
            <td className='center'>
                {lessons.map((lesson) => {
                    return <p>{lesson.type}</p>
                })}
            </td>
            <td className='center'>
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

    function lessonRow(lesson: Lesson, i: number) {
        if (!lesson) {
            return <tr>
                <td className='center'>{i + 1}</td>
                <td colSpan={4} />
            </tr>
        }

        const lessons: GroupLessonExplain[] = Array.isArray(lesson) ? lesson : [lesson];

        return <tr>
            <td className='center'>{i + 1}</td>
            {lessonsParags(lessons)}
        </tr>
    }

    return <React.Fragment>
        {lessons.map((lesson, i) => lessonRow(lesson, i))}
    </React.Fragment>
}