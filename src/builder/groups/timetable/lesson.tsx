import React from "react";
import { GroupLessonExplain, GroupLesson } from "../../../parser/types/group";
import Parags from "./parags";

export default function BuilderLesson({ lesson }: { lesson: GroupLesson }): JSX.Element {
    if (!lesson) {
        return <td colSpan={4} />;
    }

    const explain: GroupLessonExplain[] = Array.isArray(lesson) ? lesson : [lesson];

    return <React.Fragment>
        <Parags explain={explain} />
    </React.Fragment>
}