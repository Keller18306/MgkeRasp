import { chunkArray } from "../utils";
import { AbstractParser } from "./abstract";
import { GroupLessonExplain, Groups, Lesson } from './types';

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
            this.parseTable(table)
        }

        return this.groups
    }

    protected getGroupsPositions(rows: HTMLTableRowElement[]): GroupPosition[] {
        const groupPositions: GroupPosition[] = []

        for (const row_i in rows) {
            const row = rows[row_i]
            const cells = row.cells

            if (cells.length === 0) continue;

            if (!cells[0].textContent?.includes('№')) continue;

            for (const cell_i in cells) {
                const cell = cells[cell_i]

                const groupText = cell.textContent;
                if (groupText == undefined) continue;

                const group = this.parseGroupNumber(
                    this.clearElementText(
                        groupText
                    )
                )
                if (!group || isNaN(+group)) continue;

                groupPositions.push({
                    group: String(group),
                    groupText: groupText,
                    row: +row_i,
                    cell: +cell_i
                })
            }
        }

        return groupPositions
    }

    protected parseLessons(rows: HTMLTableRowElement[], position: GroupPosition): Lesson[] {
        const lessons: Lesson[] = []

        for (const row_i in rows) {
            if (+row_i <= position.row + 1) continue;
            const row = rows[row_i];
            const cells = row.cells;

            if (cells.length === 0) continue;

            const lessonId = cells[0].textContent;
            if (lessonId == undefined || isNaN(+lessonId)) break;

            const lessonCell = cells[position.cell * 2 - 1];
            let lesson: string | undefined | null = lessonCell.textContent?.trim();

            const cabinetCell = cells[position.cell * 2];
            let cabinet: string | undefined | null = cabinetCell.textContent?.trim();

            if (lesson == undefined || cabinet == undefined) continue;

            lesson = this.setNullIfEmpty(lesson)
            cabinet = this.setNullIfEmpty(this.removeDashes(cabinet))
            let subgroups: GroupLessonExplain[] | null = null;

            if (!lesson) {
                lessons.push(null);
                continue;
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
                    lessons.push(subgroups)
                    continue;
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

            lessons.push({
                lesson: group[0],
                type: matchType,
                teacher: group[2],
                cabinet: cabinet
            })
        }

        return lessons
    }

    protected clearEndingNull(lessons: Lesson[]) {
        let toClear: number = 0;

        for (const lesson of lessons) {
            if (lesson === null) {
                toClear++
                continue;
            }

            toClear = 0
        }

        lessons.splice(lessons.length - toClear, toClear)
    }

    protected parseTable(table: HTMLTableElement) {
        const dayName = table.caption?.textContent;
        if (!dayName) {
            throw new Error('Day name is not provided')
        }

        const { day, weekday } = this.parseDayName(dayName)

        const rows = Array.from(table.rows)

        const positions = this.getGroupsPositions(rows)

        for (const position of positions) {
            const group = position.group

            if (this.groups[group] === undefined) {
                this.groups[group] = {
                    group: position.groupText,
                    days: []
                }
            }

            const lessons = this.parseLessons(rows, position);
            this.clearEndingNull(lessons)

            this.groups[group].days.push({
                weekday: weekday,
                day: day,
                lessons: lessons
            })
        }
    }
}