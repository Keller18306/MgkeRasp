import React from "react";
import { Teachers, Teacher, TeacherDay, TeacherLesson } from "../../../parser/types/teacher";
import { getTodayDay } from "../../utils";
import TeachersDayTeacher from "./teacher";

export default function TeachersDayTable({ teachers, search }: { teachers: Teachers, search: undefined | string }): JSX.Element {
    const maxCountLessons: number = Math.max(...Object.values(teachers).map((teacher: Teacher): number => {
        // if (search && !teacher.teacher.toLowerCase().startsWith(search.toLowerCase())) {
        //     return 0;
        // }

        const day: TeacherDay = getTodayDay(teacher.days);
        //const day: TeacherDay = teacher.days[0];

        return day.lessons.length;
    }))

    return <table className='timetable-block'>
        <tbody>
            <tr className='center'>
                <td rowSpan={3}>№</td>
                <td rowSpan={3}>Имя учителя</td>
                <td colSpan={2 * maxCountLessons}>Расписание</td>
            </tr>
            <tr className='center'>
                {((): JSX.Element[] => {
                    const elements: JSX.Element[] = [];

                    for (let i: number = 0; i < maxCountLessons; i++) {
                        elements.push(<td key={i} colSpan={2}>{i + 1}</td>)
                    }

                    return elements;
                })()}
            </tr>
            <tr className='center'>
                {((): JSX.Element[] => {
                    const elements: JSX.Element[] = [];

                    for (let i: number = 0; i < maxCountLessons; i++) {
                        elements.push(<React.Fragment key={i}>
                            <td>Предмет</td>
                            <td>Ауд.</td>
                        </React.Fragment>)
                    }

                    return elements;
                })()}
            </tr>
            {Object.values(teachers).map(
                (teacher: Teacher, i: number): JSX.Element | null => {
                    if (search && !teacher.teacher.toLowerCase().startsWith(search.toLowerCase())) {
                        return null;
                    }

                    return <TeachersDayTeacher key={i} i={i} teacher={teacher} maxCountLessons={maxCountLessons} />
                }
            )}
        </tbody>
    </table>
}