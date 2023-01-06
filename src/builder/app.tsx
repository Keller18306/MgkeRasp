import { useEffect, useState } from "react"
import './styles.scss'

import BuilderGroups from "./groups"
import BuilderMode from "./mode"
import BuilderTeachers from "./teachers"
import BuilderExporter from "./common/exporter"
import { Groups } from "../parser/types/group"
import { Teachers } from "../parser/types/teacher"

export default function BuilderApp(): JSX.Element {
    const [mode, setMode] = useState('group')

    const [groups, setGroups] = useState<Groups>({})
    const [teachers, setTeachers] = useState<Teachers>({})

    useEffect((): void => {
        const savedGroups: string | null = localStorage.getItem('savedGroups');
        const savedTeachers: string | null = localStorage.getItem('savedTeachers');

        if (savedGroups) {
            setGroups(JSON.parse(savedGroups))
        }

        if (savedTeachers) {
            setTeachers(JSON.parse(savedTeachers))
        }
    }, []);

    useEffect((): void => {
        
    }, []);

    return <div className="mgke-timetable builder">
        <BuilderExporter groups={groups} teachers={teachers} />

        <BuilderMode mode={mode} setMode={setMode} />

        {mode === 'group' ? <BuilderGroups groups={groups} setGroups={setGroups} /> : null}
        {mode === 'teacher' ? <BuilderTeachers teachers={teachers} setTeachers={setTeachers} /> : null}
    </div>
}