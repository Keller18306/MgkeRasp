import React, { useEffect, useState } from "react";
import { Teachers } from "../../parser/types/teacher";
import Exporter from "./exporter";
import Timetable from "./timetable";
import Uploader from "./uploader";

export default function BuilderTeachers(): JSX.Element {
    const [teachers, setTeachers] = useState<Teachers>({})

    useEffect((): void => {
        const savedData: string | null = localStorage.getItem('savedTeachers');

        if (savedData) {
            setTeachers(JSON.parse(savedData))
        }
    }, []);

    return <React.Fragment>
        <Uploader teachers={teachers} setTeachers={setTeachers} />
        <Exporter teachers={teachers} />
        <Timetable teachers={teachers} />
    </React.Fragment>
}