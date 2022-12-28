import React from 'react'
import { Day, GroupLessonExplain, Lesson } from '../parser/types';

export default function StudentDayTable(day: Day) {
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

    return <table className='timetable-block'>
        <tbody>
            <tr className='center'>
                <td colSpan={5}>{day.weekday}, {day.day}</td>
            </tr>
            <tr className='center'>
                <td>№</td>
                <td>Дисциплина</td>
                <td>Вид</td>
                <td>Аудитория</td>
                <td>Преподаватель</td>
            </tr>
            {day.lessons.map((lesson, i) => lessonRow(lesson, i))}
        </tbody>
    </table>;
}