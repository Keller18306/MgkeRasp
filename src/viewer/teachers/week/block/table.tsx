import React from 'react';
import { TeacherDay } from '../../../../parser/types/teacher';
import Lessons from './lessons';

export default function TeacherTable({ days }: { days: TeacherDay[] }): JSX.Element {
    return <table className='timetable-block'>
        <tbody>
            <tr>
                <th rowSpan={2} className="center">№</th>
                {days.map((day: TeacherDay, i: number): JSX.Element => {
                    return <React.Fragment key={i}>
                        <th className="center">Предмет</th>
                        <th className="center">Ауд.</th>
                    </React.Fragment>
                })}
            </tr>
            <tr>
                {days.map((day: TeacherDay, i: number): JSX.Element => {
                    return <th key={i} colSpan={2} className="center">{day.weekday}, {day.day}</th>
                })}
            </tr>
            <Lessons days={days} />
        </tbody>
    </table>;
}