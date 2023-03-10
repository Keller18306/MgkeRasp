import React, { useEffect, useMemo, useState } from "react";
import { Groups } from "../../../parser/types/group";
import Search from "../../groups/common/search";
import Header from "../../header";
import GroupBlock from "./block";

export default function ViewerWeek(): JSX.Element {
    const groups = useMemo<Groups>(() => {
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

        blocks.push(<GroupBlock key={groupNumber} groupNumber={groupNumber} group={groups[groupNumber]} />)
    }

    return <React.Fragment>
        <Header>
            <h1>Расписание групп на неделю</h1>
            <Search searchValue={searchValue} setSearch={setSearchValue} />
        </Header>

        {blocks}
    </React.Fragment>;
}