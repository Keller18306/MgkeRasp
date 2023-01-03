import React, { useMemo } from "react";
import { Group, Groups } from "../../parser/types";
import BlindGroup from "./group";
import { getTodayDay, getTodayString } from "../utils";

export default function ViewerBlind(): JSX.Element {
    const groups = useMemo<Groups>(() => {
        const groups: Groups = (window as any).PAGE_GROUPS;

        const blindGroups: Groups = {}
        for (const group in groups) {
            if (!groups[group].group.endsWith('*')) {
                continue;
            }

            blindGroups[group] = groups[group]
        }

        return blindGroups;
    }, []);

    const day: string = getTodayString(Object.values(groups)[0].days);

    return <React.Fragment>
        <h1>День - {day}</h1>
        {Object.values(groups).map(
            (group: Group, i: number): JSX.Element => <BlindGroup key={i} group={group.group} lessons={getTodayDay(group.days).lessons} />
        )}
    </React.Fragment>
}