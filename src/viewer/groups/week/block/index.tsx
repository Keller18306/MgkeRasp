import { GroupDay, Group } from "../../../../parser/types/group";
import StudentDayTable from "./table";

export default function ViewerBlock({ groupNumber, group }: { groupNumber: string, group: Group }): JSX.Element {
    return <div className="group-block" data-group={groupNumber}>
        <h2>Группа - {group.group}</h2>

        <div className="timetable-grid row">
            {group.days.map((day: GroupDay, i: number): JSX.Element => <StudentDayTable key={i} day={day} />)}
        </div>
    </div>;
}