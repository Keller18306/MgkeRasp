import React, { ChangeEvent } from "react";

export default function ViewerSearch(
    { searchValue, setSearch }: { searchValue: string | undefined, setSearch: React.Dispatch<React.SetStateAction<string | undefined>> }
): JSX.Element {
    return <div className="searchBlock">
        <input type="text" value={searchValue || ''} placeholder="Группа" onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setSearch(e.target.value);
        }} />

        <input type="button" value="Сохранить" onClick={(): void => {
            if (searchValue) {
                localStorage.setItem('mgke-rasp_group', searchValue)
            } else {
                localStorage.removeItem('mgke-rasp_group')
            }
        }} />
    </div>
}