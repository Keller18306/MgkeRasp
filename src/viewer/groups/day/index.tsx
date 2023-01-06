import React, { useEffect, useMemo, useState } from "react";
import { Group, GroupDay, Groups } from "../../../parser/types/group";
import Header from "../../header";
import { getTodayDay } from "../../utils";
import Search from "../common/search";
import ViewerGroup from "./group";

export default function ViewerDay(): JSX.Element {
    const groups = useMemo<Groups>((): Groups => {
        return (window as any).PAGE_GROUPS.groups;
    }, []);

    const [searchValue, setSearchValue] = useState<string | undefined>()

    useEffect(() => {
        const groupValue: string | null = localStorage.getItem('mgke-rasp_group')

        if (groupValue) {
            setSearchValue(groupValue)
        }
    }, []);

    const blocks: JSX.Element[] = [];

    for (const groupNumber in groups) {
        if (searchValue && groupNumber !== searchValue) continue;
        const group: Group = groups[groupNumber];

        blocks.push(<ViewerGroup key={groupNumber} group={group.group} day={getTodayDay(group.days)} />)
    }

    const day: GroupDay = getTodayDay(Object.values(groups)[0].days);

    return <React.Fragment>
        <Header>
            <h1>Расписание групп на день - {day.weekday}, {day.day}</h1>
            <Search searchValue={searchValue} setSearch={setSearchValue} />
        </Header>

        <div className="timetable-grid row">
            {blocks}
        </div>
    </React.Fragment>;
}
