import React, { useEffect, useState } from "react"
import { Groups } from "../parser/types"
import Exporter from "./exporter"
import Timetable from "./timetable"
import Uploader from "./uploader"

import './styles.scss'

export default function BuilderApp() {
    const [groups, setGroups] = useState<Groups>({})

    useEffect((): void => {
        const savedData: string | null = localStorage.getItem('savedGroups');

        if (savedData) {
            setGroups(JSON.parse(savedData))
        }
    }, []);

    return <div className=".mgke-timetable .builder">
        <Uploader groups={groups} setGroups={setGroups} />
        <Exporter groups={groups} />
        <Timetable groups={groups} />
    </div>
}