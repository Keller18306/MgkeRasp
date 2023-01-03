import React, { useEffect, useState } from "react";
import { Groups } from "../parser/types";
import GroupBlock from "./group";
import Search from "./search";

export default function ViewerApp({ groups }: { groups: Groups }) {
    const [searchValue, setSearchValue] = useState<string | undefined>()

    useEffect(() => {
        const groupValue = localStorage.getItem('mgke-rasp_group')

        if (groupValue) {
            setSearchValue(groupValue)
        }
    }, []);

    const blocks: JSX.Element[] = [];

    for (const groupNumber in groups) {
        if (searchValue && groupNumber !== searchValue) continue;

        blocks.push(<GroupBlock groupNumber={groupNumber} group={groups[groupNumber]} />)
    }

    return <React.Fragment>
        <Search searchValue={searchValue} setSearch={setSearchValue} />
        {blocks}
    </React.Fragment>;
}