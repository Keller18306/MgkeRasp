import { Day, Group } from "../../../parser/types";
import StudentDayTable from "./table";

export default function ViewerBlock({ groupNumber, group }: { groupNumber: string, group: Group }): JSX.Element {
    return <div className="group-block" data-group={groupNumber}>
        <h2>Группа - {group.group}</h2>

        <div className="timetable-grid">
            {group.days.map((day: Day, i: number): JSX.Element => <StudentDayTable key={i} day={day} />)}
        </div>
    </div>;
}