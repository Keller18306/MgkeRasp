import { Group } from "../parser/types";
import StudentDayTable from "./table";

export default function ViewerGroupBlock({ groupNumber, group }: { groupNumber: string, group: Group}) {
    return <div className="group-block" data-group={groupNumber}>
        <h2>Группа - {group.group}</h2>
        
        <div className="timetable-grid">
            {group.days.map(StudentDayTable)}
        </div>
    </div>;
}