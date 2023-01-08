import React, { useEffect, useMemo, useState } from "react";
import { TeacherDay, Teachers } from "../../../parser/types/teacher";
import Header from "../../header";
import { getTodayDay } from "../../utils";
import Search from "../search";
import TeachersDayTable from "./table";

export default function ViewerDay(): JSX.Element {
    const teachers = useMemo<Teachers>((): Teachers => {
        return (window as any).PAGE_GROUPS.teachers;
    }, []);

    const [searchValue, setSearchValue] = useState<string | undefined>()

    useEffect((): void => {
        const groupValue: string | null = localStorage.getItem('mgke-rasp_teacher')

        if (groupValue) {
            setSearchValue(groupValue)
        }
    }, []);

    const day: TeacherDay = getTodayDay(Object.values(teachers)[0].days);

    return <React.Fragment>
        <Header>
            <h1>Расписание учителей на день - {day.weekday}, {day.day}</h1>
            <Search searchValue={searchValue} setSearch={setSearchValue} />
        </Header>

        <div className="timetable-grid">
            <TeachersDayTable teachers={teachers} search={searchValue} />
        </div>
    </React.Fragment>;
}
