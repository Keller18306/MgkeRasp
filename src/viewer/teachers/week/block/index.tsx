import React from "react";
import { Teacher } from "../../../../parser/types/teacher";
import TeacherTable from "./table";

export default function TeacherBlock({ teacher }: { teacher: Teacher }): JSX.Element {
    return <div className="group-block" data-group={teacher.teacher}>
        <h2>Учитель - {teacher.teacher}</h2>

        <TeacherTable days={teacher.days} />
    </div>;
}
