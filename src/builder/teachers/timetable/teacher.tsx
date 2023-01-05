import { Teacher } from "../../../parser/types/teacher";
import Table from "./table";

export default function BuilderGroup({ teacher }: { teacher: Teacher }): JSX.Element {
    return <div>
        <h2>Преподаватель - {teacher.teacher}</h2>
        <Table days={teacher.days} />
    </div>
}