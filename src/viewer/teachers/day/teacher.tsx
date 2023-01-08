import React from "react";
import { Teacher } from "../../../parser/types/teacher";
import TeachersDayLessons from "./lessons";
import { getTodayDay } from "../../utils";

export default function TeachersDayTeacher({ i, teacher, maxCountLessons }: { i: number, teacher: Teacher, maxCountLessons: number }): JSX.Element | null {
    if (!teacher.days[0].lessons.length) {
        return null;
    }
    
    return <tr>
        <td className='center'>{i + 1}</td>
        <td className='right'>{teacher.teacher}</td>
        <TeachersDayLessons lessons={getTodayDay(teacher.days).lessons} maxCountLessons={maxCountLessons} />
    </tr>
}