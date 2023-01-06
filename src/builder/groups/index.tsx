import React, { useEffect, useState } from "react";
import { Groups } from "../../parser/types/group";
import Timetable from "./timetable";
import Uploader from "./uploader";

export default function BuilderGroups({ groups, setGroups }: { groups: Groups, setGroups: React.Dispatch<React.SetStateAction<Groups>> }): JSX.Element {
    return <React.Fragment>
        <Uploader setGroups={setGroups} />
        <Timetable groups={groups} />
    </React.Fragment>
}