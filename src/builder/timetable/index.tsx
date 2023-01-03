import { Groups } from "../../parser/types";
import BuilderGroup from "./group";

export default function BuilderTimetable({ groups }: { groups: Groups }) {
    return <div className="mgke-timetable">
        {Object.keys(groups).map((group) => BuilderGroup({ group: groups[group] }))}
    </div>
}