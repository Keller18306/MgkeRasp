import { chunkArray } from "../builder/utils";
import { AbstractParser } from "./abstract";
import { GroupDay, GroupLessonExplain, Groups, GroupLesson } from './types/group';

type GroupPosition = {
    group: string,
    groupText: string,
    row: number,
    cell: number
}

export default class StudentParser extends AbstractParser {
    protected groups: Groups = {}

    public run(groups?: Groups) {
        if (groups) {
            this.groups = groups;
        }

        for (const table of this.parseBodyTables()) {
            const h3 = table.previousElementSibling! as HTMLHeadingElement //date
            const h2 = h3.previousElementSibling! as HTMLHeadingElement //group

            this.parseGroup(table, h2)
        }

        return this.groups
    }

    protected parseGroup(table: HTMLTableElement, h2: HTMLHeadingElement) {
        const group = h2.textContent?.replaceAll(' ', '').split('-')[1]
        const groupNumber = Number(this.parseGroupNumber(
            h2.textContent?.replaceAll(' ', '')
                .split('-')[1]
        ))
        if (!group || isNaN(groupNumber)) throw new Error('can not get group number')

        const rows = Array.from(table.rows)

        const days: GroupDay[] = this.getDays(rows[0]);
        this.parseLessons(rows, days);
        for (const { lessons } of days) {
            this.clearEndingNull(lessons);
        }

        this.groups[groupNumber] = {
            group: group,
            days: days
        }
    }

    protected getDays(row: HTMLTableRowElement): GroupDay[] {
        const days: GroupDay[] = []

        const dayNames = this.parseDayNames(row)
        for (const dayName of dayNames) {
            const { day, weekday } = this.parseDayName(dayName)

            days.push({
                day: day,
                weekday: weekday,
                lessons: []
            })
        }

        return days
    }

    protected parseDayNames(row: HTMLTableRowElement): string[] {
        const cells = Array.from(row.cells)

        const days: string[] = []

        for (const cell_i in cells) {
            if (+cell_i == 0) continue;
            const cell = cells[cell_i]

            const day = cell.textContent?.replaceAll('\n', '')
            if (day == undefined) throw new Error('cannot get weekday name');

            days.push(day)
        }

        return days;
    }

    protected parseLessons(rows: HTMLTableRowElement[], days: GroupDay[]) {
        for (const row_i in rows) {
            if (+row_i <= 1) continue;
            const row = rows[row_i]
            const cells = row.cells

            for (let cell_i: number = 1; cell_i < Math.ceil(cells.length / 2); cell_i++) {
                const day = cell_i - 1;

                const lessonCell = cells[cell_i * 2 - 1];
                const cabinetCell = cells[cell_i * 2];

                const lesson = this.parseLesson(lessonCell, cabinetCell);
                days[day].lessons.push(lesson)
            }
        }
    }

    protected parseLesson(lessonCell: HTMLTableCellElement, cabinetCell: HTMLTableCellElement): GroupLesson {
        let lesson: string | undefined | null = lessonCell.textContent?.trim();
        let cabinet: string | undefined | null = cabinetCell.textContent?.trim();

        if (lesson == undefined || cabinet == undefined) {
            throw new Error('lesson or cabinet is undefined')
        }

        lesson = this.setNullIfEmpty(lesson)
        cabinet = this.setNullIfEmpty(this.removeDashes(cabinet))
        let subgroups: GroupLessonExplain[] | null = null;

        if (!lesson) {
            return null;
        } else {
            const lessonsChunk = chunkArray(
                Array
                    .from(lessonCell.childNodes)
                    .filter(_ => _.nodeType === _.TEXT_NODE)
                    .map(_ => _.textContent!),
                3);
            const cabinetChunk = Array
                .from(cabinetCell.childNodes)
                .filter(_ => _.nodeType === _.TEXT_NODE)
                .map(_ => _.textContent!);

            subgroups = this.parseSubGroupLesson(lessonsChunk, cabinetChunk);

            if (subgroups) {
                return subgroups;
            }
        }

        const group = Array
            .from(lessonCell.childNodes)
            .filter(_ => _.nodeType === _.TEXT_NODE)
            .map(_ => _.textContent!);
        const matchType = group[1].match(/\((.+)\)/)?.slice(1)[0]
        if (!matchType) {
            throw new Error('group type match error')
        }

        return {
            lesson: group[0],
            type: matchType,
            teacher: group[2],
            cabinet: cabinet
        }
    }
}