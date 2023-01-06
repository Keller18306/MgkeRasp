import { GroupLesson } from "../../../parser/types/group";

export default function BlindGroup({ group, lessons }: { group: string, lessons: GroupLesson[] }): JSX.Element {
    return <div>
        <h2>Группа {group}</h2>
        {lessons.map((lesson: GroupLesson, i: number): JSX.Element | null => {
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