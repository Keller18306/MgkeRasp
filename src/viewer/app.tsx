import React, { useEffect } from "react";
import { Groups } from "../parser/types";
import GroupBlock from "./group";

export default function ViewerApp({ groups }: { groups: Groups }) {
    const blocks: JSX.Element[] = [];

    for (const groupNumber in groups) {
        blocks.push(<GroupBlock groupNumber={groupNumber} group={groups[groupNumber]} />)
    }

    return <React.Fragment>
        {blocks}
    </React.Fragment>;
}