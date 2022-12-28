import StudentParser from "../parser/student";
import { Group, Groups } from "../parser/types";
import { createIframe } from "./iframe";
import { readFile } from "./utils";

export class Builder {
    public static init() {
        return new this()
    }

    private input: HTMLInputElement | null = null;
    private copyButton: HTMLInputElement | null = null;
    private jsonTextArea?: HTMLTextAreaElement;
    private iframe?: HTMLIFrameElement;
    private debug: HTMLDivElement | null = null;
    private timetable: HTMLDivElement | null = null;
    private groups: Groups = {}

    constructor() {
        window.addEventListener('load', this.onLoad.bind(this));
    }

    private onLoad() {
        this.input = document.querySelector('.mgke-uploader-form input[name=files]');
        this.copyButton = document.querySelector('.mgke-uploader-form input[name=copy-html]');

        if (!this.input || !this.copyButton) {
            console.error('Some part of form not found')
            return;
        }

        this.copyButton.onclick = this.onCopy.bind(this);
        this.input.onchange = this.onSelectFiles.bind(this)
        this.debug = document.querySelector('.mgke-debug')
        this.timetable = document.querySelector('.mgke-timetable')

        if (!this.timetable) {
            console.error('Timetable div is not found')
            return;
        }

        const savedData = localStorage.getItem('savedGroups');
        if (savedData) {
            this.groups = JSON.parse(savedData)
        }

        if (Object.keys(this.groups).length) {
            this.printGroupsData()
        }
    }

    private async onSelectFiles(e: Event) {
        const files = this.input!.files;
        if (!files) return;


        this.groups = {}
        for (const file of Array.from(files)) {
            const content = await readFile(file, 'windows-1251');

            if (this.iframe) {
                this.iframe.remove()
            }
            this.iframe = await createIframe(this.debug ? this.debug : document, content, !this.debug);

            if (!this.iframe.contentWindow || !this.iframe.contentDocument) {
                console.error('could load iframe')
                return;
            }

            new StudentParser(this.iframe.contentWindow).run(this.groups)
            if (!this.debug) {
                this.iframe.remove()
                this.iframe = undefined;
            }
        }

        localStorage.setItem('savedGroups', JSON.stringify(this.groups))

        this.printGroupsData()
    }

    private async onCopy(e: MouseEvent) {
        let data = '';

        data += '<!-- Данный блок данных скопирован из конвертера -->\n';
        data += '<script id="mgke-json-input" type="application/json">\n';
        data += JSON.stringify(this.groups);
        data += '\n</script>';
        data += '\n<!-- Данный блок данных скопирован из конвертера -->';

        navigator.clipboard.writeText(data)
    }

    private printGroupsData() {
        if (this.timetable?.children) {
            const children = Array.from(this.timetable?.children);

            for (const child of children) {
                child.remove()
            }
        }

        if (this.debug) {
            if (this.jsonTextArea) {
                this.jsonTextArea.remove();
            }

            this.jsonTextArea = document.createElement('textarea');
            this.jsonTextArea.style.width = '100%';
            this.jsonTextArea.value = JSON.stringify(this.groups, null, 4);

            this.debug.appendChild(this.jsonTextArea);
        }

        for (const groupNumber in this.groups) {
            const group = this.groups[groupNumber]

            this.buildGroupRasp(group)
        }
    }

    private buildGroupRasp(group: Group) {
        const div = document.createElement('div')
        const table = this.buildTable(group)

        const h2 = document.createElement('h2')
        h2.innerText = `Группа - ${group.group}`

        div.appendChild(h2)
        div.appendChild(table)
        this.timetable!.appendChild(div)
    }

    private buildTable(group: Group) {
        const table = document.createElement('table');

        const maxCountLessons: number = Math.max(...group.days.map((day) => {
            return day.lessons.length
        }));

        const head1 = table.insertRow();
        const n = head1.insertCell()
        n.textContent = '№'
        n.rowSpan = 3
        for (const day of group.days) {
            const cell = head1.insertCell()

            cell.colSpan = 5
            cell.textContent = day.day
        }

        const head2 = table.insertRow();
        for (const day of group.days) {
            const cell = head2.insertCell()

            cell.colSpan = 5
            cell.textContent = day.weekday
        }

        const head3 = table.insertRow();
        for (const day of group.days) {
            const c1 = head3.insertCell()
            c1.textContent = 'Дисциплина';
            c1.colSpan = 2;

            head3.insertCell().textContent = 'Вид'
            head3.insertCell().textContent = 'Ауд.'
            head3.insertCell().textContent = 'Преподаватель'
        }

        for (let i = 0; i < maxCountLessons; i++) {
            const maxRowLevel = Math.max(...group.days.map((day) => {
                const lessons = day.lessons[i];

                if (Array.isArray(lessons)) {
                    return lessons.length
                } else {
                    return 1;
                }
            }))

            const rows: HTMLTableRowElement[] = [];
            for (let i = 0; i < maxRowLevel; i++) {
                rows.push(table.insertRow())
            }

            const row = rows[0];

            const n = row.insertCell()
            n.rowSpan = maxRowLevel;
            n.textContent = String(i + 1)

            for (const day of group.days) {
                const lesson = day.lessons[i];

                if (!lesson) {
                    const cell = row.insertCell()
                    cell.colSpan = 5;
                    cell.rowSpan = maxRowLevel;
                    continue;
                }

                if (Array.isArray(lesson)) {
                    for (let sub = 0; sub < maxRowLevel; sub++) {
                        const subgroup = lesson[sub];
                        if (subgroup == undefined) {
                            rows[sub].insertCell().colSpan = 5;
                            continue;
                        }

                        rows[sub].insertCell().textContent = String(subgroup.subgroup) + '.';
                        rows[sub].insertCell().textContent = subgroup.lesson;
                        rows[sub].insertCell().textContent = subgroup.type
                        rows[sub].insertCell().textContent = subgroup.cabinet
                        rows[sub].insertCell().textContent = subgroup.teacher
                    }

                } else {
                    const r1 = row.insertCell()
                    r1.rowSpan = maxRowLevel
                    r1.colSpan = 2
                    r1.textContent = lesson.lesson

                    const r2 = row.insertCell()
                    r2.rowSpan = maxRowLevel
                    r2.textContent = lesson.type

                    const r3 = row.insertCell()
                    r3.rowSpan = maxRowLevel
                    r3.textContent = lesson.cabinet

                    const r4 = row.insertCell()
                    r4.rowSpan = maxRowLevel
                    r4.textContent = lesson.teacher
                }
            }
        }

        return table;
    }
}