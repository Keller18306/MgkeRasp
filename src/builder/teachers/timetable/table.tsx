import React from "react";
import { TeacherDay, Teacher } from "../../../parser/types/teacher";
import Days from "./lessons";

export default function BuilderTable({ days }: { days: TeacherDay[] }): JSX.Element {
    return <table>
        <tbody>
            <tr>
                <td rowSpan={3}>№</td>
                {days.map((day: TeacherDay, i: number): JSX.Element => {
                    return <td key={i} colSpan={4}>{day.day}</td>
                })}
            </tr>
            <tr>
                {days.map((day: TeacherDay, i: number): JSX.Element => {
                    return <td key={i} colSpan={4}>{day.weekday}</td>
                })}
            </tr>
            <tr>
                {days.map((day: TeacherDay, i: number): JSX.Element => {
                    return <React.Fragment key={i}>
                        <td>Дисциплина</td>
                        <td>Вид</td>
                        <td>Ауд.</td>
                        <td>Группа</td>
                    </React.Fragment>
                })}
            </tr>
            <Days days={days} />
        </tbody>
    </table>
}