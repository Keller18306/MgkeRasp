import { Group } from "../../../parser/types/group";
import Table from "./table";

export default function BuilderGroup({ group }: { group: Group }): JSX.Element {
    return <div>
        <h2>Группа - {group.group}</h2>
        <Table days={group.days} />
    </div>
}