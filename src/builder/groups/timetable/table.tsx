import React from "react";
import { GroupDay, Group } from "../../../parser/types/group";
import Days from "./days";

export default function BuilderTable({ days }: { days: GroupDay[] }): JSX.Element {
    return <table>
        <tbody>
            <tr>
                <td rowSpan={3}>№</td>
                {days.map((day: GroupDay, i: number): JSX.Element => {
                    return <td key={i} colSpan={4}>{day.day}</td>
                })}
            </tr>
            <tr>
                {days.map((day: GroupDay, i: number): JSX.Element => {
                    return <td key={i} colSpan={4}>{day.weekday}</td>
                })}
            </tr>
            <tr>
                {days.map((day: GroupDay, i: number): JSX.Element => {
                    return <React.Fragment key={i}>
                        <td>Дисциплина</td>
                        <td>Вид</td>
                        <td>Ауд.</td>
                        <td>Преподаватель</td>
                    </React.Fragment>
                })}
            </tr>
            <Days days={days} />
        </tbody>
    </table>
}