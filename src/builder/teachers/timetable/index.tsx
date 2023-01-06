import { Teachers } from "../../../parser/types/teacher";
import BuilderTeacher from "./teacher";

export default function BuilderTimetable({ teachers }: { teachers: Teachers }): JSX.Element {
    return <div className="editor">
        {Object.keys(teachers).map((teacher: string, i: number): JSX.Element => <BuilderTeacher key={i} teacher={teachers[teacher]} />)}
    </div>
}