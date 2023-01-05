import React from "react";
import { GroupLessonExplain } from "../../../parser/types/group";

export default function BuilderParags({ explain }: { explain: GroupLessonExplain[] }): JSX.Element {
    return <React.Fragment>
        <td>
            {explain.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                return <p key={i}>{lesson.subgroup ? `${lesson.subgroup}. ` : ''}{lesson.lesson}</p>
            })}
        </td>
        <td>
            {explain.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                return <p key={i}>{lesson.type}</p>
            })}
        </td>
        <td>
            {explain.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                return <p key={i}>{lesson.cabinet || '-'}</p>
            })}
        </td>
        <td>
            {explain.map((lesson: GroupLessonExplain, i: number): JSX.Element => {
                return <p key={i}>{lesson.teacher}</p>
            })}
        </td>
    </React.Fragment>;
}