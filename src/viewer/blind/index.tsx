import React, { useMemo } from "react";
import { Day, Group, Groups } from "../../parser/types";
import BlindGroup from "./group";
import { getTodayDay } from "../utils";
import Header from "../common/header";

export default function ViewerBlind(): JSX.Element {
    const groups = useMemo<Groups>((): Groups => {
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

    const day: Day = getTodayDay(Object.values(groups)[0].days);

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