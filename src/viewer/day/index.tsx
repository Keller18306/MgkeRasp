import React, { useEffect, useMemo, useState } from "react";
import { Day, Group, Groups } from "../../parser/types";
import Search from "../search";
import { getTodayDay } from "../utils";
import ViewerGroup from "./group";

export default function ViewerDay(): JSX.Element {
    const groups = useMemo<Groups>((): Groups => {
        return (window as any).PAGE_GROUPS;
    }, []);

    const [searchValue, setSearchValue] = useState<string | undefined>()

    useEffect(() => {
        const groupValue: string | null = localStorage.getItem('mgke-rasp_group')

        if (groupValue) {
            setSearchValue(groupValue)
        }
    }, []);

    const day: Day = getTodayDay(Object.values(groups)[0].days);

    return <React.Fragment>
        <h1>Расписание на день - {day.weekday}, {day.day}</h1>
        <Search searchValue={searchValue} setSearch={setSearchValue} />
        <div className="timetable-grid">
            {Object.values(groups).map(
                (group: Group, i: number): JSX.Element => <ViewerGroup key={i} group={group.group} day={getTodayDay(group.days)} />
            )}
        </div>
    </React.Fragment>;
}
