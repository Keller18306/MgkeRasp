import React, { useEffect, useState } from "react";
import { Teachers } from "../../parser/types/teacher";
import Timetable from "./timetable";
import Uploader from "./uploader";

export default function BuilderTeachers({ teachers, setTeachers }: { teachers: Teachers, setTeachers: React.Dispatch<React.SetStateAction<Teachers>> }): JSX.Element {
    return <React.Fragment>
        <Uploader setTeachers={setTeachers} />
        <Timetable teachers={teachers} />
    </React.Fragment>
}