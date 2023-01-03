import { GroupLessonExplain } from "./types";

export abstract class AbstractParser {
    protected readonly window: Window;
    private _bodyTables?: HTMLTableElement[] = undefined;

    constructor(window: Window) {
        this.window = window;
    }

    protected get document() {
        return this.window.document;
    }

    protected querySelectorAll(selector: string): NodeListOf<HTMLElement> {
        return this.document.querySelectorAll(selector)
    }

    protected querySelector(selector: string): HTMLElement | null {
        return this.document.querySelector(selector)
    }

    protected parseBodyTables(_forceCache: boolean = false) {
        if (_forceCache || this._bodyTables === undefined) {
            this._bodyTables = Array.from(
                this.document.querySelectorAll('body table') as NodeListOf<HTMLTableElement>
            )
        }

        return this._bodyTables
    }

    protected parseDayName(value: string): { day: string, weekday: string } {
        const parsed = value.match(/(.+),\s?(.+)/i)?.slice(1)
        if (!parsed) {
            throw new Error('could not parse day name')
        }

        return {
            day: parsed[1],
            weekday: parsed[0]
        }
    }

    protected clearElementText(text?: string | null): string | undefined {
        return text?.replaceAll('\n', '')
            .replaceAll('<br>', '')
            .replaceAll('&nbsp;', '')
            .replace(/\s+/g, ' ').trim();
    }

    protected removeDashes(text?: string): string | undefined {
        return text?.trim()
            .replaceAll(/^-((\s-)?)+$/ig, '')
            .trim()
    }

    protected setNullIfEmpty(text?: string | null): string | null {
        return (text === '' || text == undefined) ? null : text
    }

    protected parseGroupNumber(text: string | undefined): string | undefined {
        return text?.replace(/\*$/i, '')
    }

    protected parseSubGroupLesson(subGroups: string[][], cabinets: string[]): GroupLessonExplain[] | null {
        let isSubGroups: boolean = false;

        for (const subgroup of subGroups) {
            if (/^\d+\./.test(subgroup[0])) {
                isSubGroups = true;
                break;
            }
        }

        if (!isSubGroups) {
            return null;
        }

        if (subGroups.length != cabinets.length) {
            throw new Error('subgroups and cabinets not equal');
        }

        const parsed: GroupLessonExplain[] = [];
        for (const i in subGroups) {
            const subGroup = subGroups[i];
            const subCabinet = cabinets[i];

            const matchName = subGroup[0].match(/(\d+)\.\s?(.+)/)?.slice(1)
            const matchType = subGroup[1].match(/\((.+)\)/)?.slice(1)[0]
            if (!matchName || !matchType) {
                throw new Error('group name or group type match error')
            }

            parsed.push({
                subgroup: Number(matchName[0]),
                lesson: matchName[1],
                type: matchType,
                teacher: subGroup[2],
                cabinet: this.setNullIfEmpty(this.removeDashes(subCabinet))
            })
        }

        return parsed
    }

    abstract run(): object
}