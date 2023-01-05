import React, { useEffect, useState } from "react";

export default function BuilderMode({ mode, setMode }: { mode: string, setMode: React.Dispatch<React.SetStateAction<string>> }) {
    return <div className="mode">
        <input name="mode" type="radio" value="group" onChange={(): void => {
            setMode('group')
        }} checked={mode === 'group'} />
        <label htmlFor="mode" onClick={(): void => {
            setMode('group')
        }}>Для групп</label>

        <input name="mode" type="radio" value="teacher" onChange={(): void => {
            setMode('teacher')
        }} checked={mode === 'teacher'} />
        <label htmlFor="mode" onClick={(): void => {
            setMode('teacher')
        }}>Для преподавателей</label>
    </div>
}