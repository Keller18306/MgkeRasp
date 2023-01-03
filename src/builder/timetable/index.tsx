import { Groups } from "../../parser/types";
import BuilderGroup from "./group";

export default function BuilderTimetable({ groups }: { groups: Groups }): JSX.Element {
    return <div className="mgke-timetable">
        {Object.keys(groups).map((group: string, i: number): JSX.Element => <BuilderGroup key={i} group={groups[group]} />)}
    </div>
}