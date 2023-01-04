import React, { useEffect, useMemo, useState } from "react";
import { Groups } from "../../parser/types";
import Search from "../common/search";
import GroupBlock from "./block";
import Header from "../common/header";

export default function ViewerWeek(): JSX.Element {
    const groups = useMemo<Groups>(() => {
        return (window as any).PAGE_GROUPS;
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

        blocks.push(<GroupBlock key={groupNumber} groupNumber={groupNumber} group={groups[groupNumber]} />)
    }

    return <React.Fragment>
        <Header>
            <h1>Расписание на неделю</h1>
            <Search searchValue={searchValue} setSearch={setSearchValue} />
        </Header>
        
        {blocks}
    </React.Fragment>;
}