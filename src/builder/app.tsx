import { useEffect, useState } from "react"

import './styles.scss'
import BuilderGroups from "./groups"
import BuilderMode from "./mode"
import BuilderTeachers from "./teachers"

export default function BuilderApp(): JSX.Element {
    const [mode, setMode] = useState('group')

    return <div className=".mgke-timetable .builder">
        <BuilderMode mode={mode} setMode={setMode} />

        {mode === 'group' ? <BuilderGroups /> : null}
        {mode === 'teacher' ? <BuilderTeachers /> : null}
    </div>
}