import React, { useEffect, useState } from "react"
import { Groups } from "../parser/types"
import Exporter from "./exporter"
import Timetable from "./timetable"
import Uploader from "./uploader"

export default function BuilderApp() {
    const [groups, setGroups] = useState<Groups>({})

    useEffect(() => {
        const savedData = localStorage.getItem('savedGroups');

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