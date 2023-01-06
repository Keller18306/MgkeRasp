import React from "react";
import { TeacherLesson } from "../../../../parser/types/teacher";
import Parags from "./parags";

export default function BuilderLesson({ lesson }: { lesson: TeacherLesson }): JSX.Element {
    if (!lesson) {
        return <td colSpan={2} />;
    }

    return <Parags explain={lesson} />
}