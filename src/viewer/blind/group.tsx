import React from "react";
import { Lesson } from "../../parser/types";

export default function BlindGroup({ group, lessons }: { group: string, lessons: Lesson[] }): JSX.Element {
    return <div>
        <h2>Группа {group}</h2>
        {lessons.map((lesson: Lesson, i: number): JSX.Element | null => {
            if (!lesson) {
                return null;
            }

            if (Array.isArray(lesson)) {
                return <p>ПОДГРУППЫ НЕ ПОДДЕРЖИВАЮТСЯ</p>
            }

            return <p key={i}>{i + 1} {lesson.lesson} ({lesson.type}), {lesson.teacher}, {lesson.cabinet}</p>
        })}
    </div>
}