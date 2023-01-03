import React from "react";
import { Group } from "../../parser/types";
import Days from "./days";

export default function BuilderTable({ group }: { group: Group }) {
    return <table>
        <tbody>
            <tr>
                <td rowSpan={3}>№</td>
                {group.days.map((day) => {
                    return <td colSpan={4}>{day.day}</td>
                })}
            </tr>
            <tr>
                {group.days.map((day) => {
                    return <td colSpan={4}>{day.weekday}</td>
                })}
            </tr>
            <tr>
                {group.days.map(() => {
                    return <React.Fragment>
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