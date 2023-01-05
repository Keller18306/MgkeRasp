import React, { useMemo } from "react";
import { GroupDay, Group, Groups } from "../../parser/types/group";
import Header from "../common/header";
import { getTodayDay } from "../utils";
import BlindGroup from "./group";

export default function ViewerBlind(): JSX.Element {
    const groups = useMemo<Groups>((): Groups => {
        const groups: Groups = (window as any).PAGE_GROUPS.groups;

        const blindGroups: Groups = {}
        for (const group in groups) {
            if (!groups[group].group.endsWith('*')) {
                continue;
            }

            blindGroups[group] = groups[group]
        }

        return blindGroups;
    }, []);

    const day: GroupDay = getTodayDay(Object.values(groups)[0].days);

    return <React.Fragment>
        <Header>
            <h1>Расписание для слабовидящих</h1>
            <h2>День - {day.weekday}, {day.day}</h2>
        </Header>
        
        {Object.values(groups).map(
            (group: Group, i: number): JSX.Element => <BlindGroup key={i} group={group.group} lessons={getTodayDay(group.days).lessons} />
        )}
    </React.Fragment>
}