import React from "react";
import { GroupLessonExplain, Lesson } from "../../parser/types";
import Parags from "./parags";

export default function BuilderLesson({ lesson }: { lesson: Lesson }): JSX.Element {
    if (!lesson) {
        return <td colSpan={4} />;
    }

    const explain: GroupLessonExplain[] = Array.isArray(lesson) ? lesson : [lesson];

    return <React.Fragment>
        <Parags explain={explain} />
    </React.Fragment>
}