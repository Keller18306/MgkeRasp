import React from "react";
import { Day, Group } from "../../parser/types";
import Days from "./days";

export default function BuilderTable({ group }: { group: Group }): JSX.Element {
    return <table>
        <tbody>
            <tr>
                <td rowSpan={3}>№</td>
                {group.days.map((day: Day, i: number): JSX.Element => {
                    return <td key={i} colSpan={4}>{day.day}</td>
                })}
            </tr>
            <tr>
                {group.days.map((day: Day, i: number): JSX.Element => {
                    return <td key={i} colSpan={4}>{day.weekday}</td>
                })}
            </tr>
            <tr>
                {group.days.map((day: Day, i: number): JSX.Element => {
                    return <React.Fragment key={i}>
                        <td>Дисциплина</td>
                        <td>Вид</td>
                        <td>Ауд.</td>
                        <td>Преподаватель</td>
                    </React.Fragment>
                })}
            </tr>
            <Days days={group.days} />
        </tbody>
    </table>
}