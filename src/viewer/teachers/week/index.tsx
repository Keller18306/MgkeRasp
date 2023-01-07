import React, { useEffect, useMemo, useState } from "react";
import { Teachers } from "../../../parser/types/teacher";
import Search from "../search";
import Header from "../../header";
import TeacherBlock from "./block";

export default function ViewerWeek(): JSX.Element {
    const teachers = useMemo<Teachers>(() => {
        return (window as any).PAGE_GROUPS.teachers;
    }, []);

    const [searchValue, setSearchValue] = useState<string | undefined>()

    useEffect(() => {
        const groupValue: string | null = localStorage.getItem('mgke-rasp_teacher')

        if (groupValue) {
            setSearchValue(groupValue)
        }
    }, []);

    const blocks: JSX.Element[] = [];

    for (const teacherName in teachers) {
        if (searchValue && !teacherName.toLowerCase().startsWith(searchValue.toLowerCase())) continue;

        blocks.push(<TeacherBlock key={teacherName} teacher={teachers[teacherName]} />)
    }

    return <React.Fragment>
        <Header>
            <h1>Расписание учителей на неделю</h1>
            <Search searchValue={searchValue} setSearch={setSearchValue} />
        </Header>

        {blocks}
    </React.Fragment>;
}