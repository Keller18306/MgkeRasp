import React, { useEffect, useState } from "react";
import { Groups } from "../../parser/types/group";
import Exporter from "./exporter";
import Timetable from "./timetable";
import Uploader from "./uploader";

export default function BuilderGroups(): JSX.Element {
    const [groups, setGroups] = useState<Groups>({})

    useEffect((): void => {
        const savedData: string | null = localStorage.getItem('savedGroups');

        if (savedData) {
            setGroups(JSON.parse(savedData))
        }
    }, []);

    return <React.Fragment>
        <Uploader groups={groups} setGroups={setGroups} />
        <Exporter groups={groups} />
        <Timetable groups={groups} />
    </React.Fragment>
}