import { Day, Group, GroupLessonExplain, Groups, Lesson } from "./parser/types";

type ViewerConfig = {
    input: string,
    output: string
}

export class Viewer {
    public static init(config: ViewerConfig) {
        return new this(config)
    }

    private inputSelector: string;
    private outputSelector: string;

    private timetable: HTMLDivElement | null = null;
    private groups: Groups = {}

    constructor(config: ViewerConfig) {
        this.inputSelector = config.input;
        this.outputSelector = config.output;

        window.addEventListener('load', this.onLoad.bind(this));
    }

    private onLoad() {
        this.timetable = document.querySelector(this.outputSelector)
        const rawJson = document.querySelector(this.inputSelector)?.textContent || null;

        if (!this.timetable) {
            console.error('Output selector is not found')
            return;
        }

        if (!rawJson) {
            console.error('Input selector is not found')
            return;
        }

        try {
            this.groups = JSON.parse(rawJson)
        } catch (e) {
            console.error('cannot parse json block', e)
            return;
        }

        for (const groupNumber in this.groups) {
            const group = this.groups[groupNumber]

            this.buildGroupRasp(groupNumber, group)
        }
    }

    private buildGroupRasp(groupNumber: string, group: Group) {
        const div = document.createElement('div')
        div.className = 'group-block'
        div.dataset.group = groupNumber
        const tables = this.buildTables(group)

        const h2 = document.createElement('h2')
        h2.innerText = `Группа - ${group.group}`

        div.appendChild(h2)
        div.appendChild(tables)
        this.timetable!.appendChild(div)
    }

    private buildTables(group: Group) {
        const div = document.createElement('div');
        div.className = 'timetable-grid'

        for (const day of group.days) {
            div.appendChild(this.buildDay(day))
        }

        return div;
    }

    private buildDay(day: Day) {
        const table = document.createElement('table');
        table.className = 'timetable-block'

        const headDay = table.insertRow().insertCell();
        headDay.colSpan = 5;
        headDay.textContent = `${day.weekday}, ${day.day}`;
        headDay.className = 'center'

        const headTitle = table.insertRow();
        headTitle.className = 'center'
        headTitle.insertCell().textContent = '№'
        headTitle.insertCell().textContent = 'Дисциплина'
        headTitle.insertCell().textContent = 'Вид'
        headTitle.insertCell().textContent = 'Аудитория'
        headTitle.insertCell().textContent = 'Преподаватель'

        for (const i in day.lessons) {
            const lesson = day.lessons[i]
            const row = table.insertRow()

            const a0 = row.insertCell()


            a0.textContent = String(+i + 1)
            a0.className = 'center'

            if (!lesson) {
                const a1 = row.insertCell()
                a1.colSpan = 4;
                continue;
            }

            const a1 = row.insertCell()
            const a2 = row.insertCell()
            const a3 = row.insertCell()
            const a4 = row.insertCell()
            a2.className = 'center'
            a3.className = 'center'

            let lessons: GroupLessonExplain[] = []
            if (!Array.isArray(lesson)) {
                lessons = [lesson];
            } else {
                lessons = lesson;
            }

            for (const lesson of lessons) {
                const b1 = a1.appendChild(document.createElement('p'))
                const b2 = a2.appendChild(document.createElement('p'))
                const b3 = a3.appendChild(document.createElement('p'))
                const b4 = a4.appendChild(document.createElement('p'))

                const sub = lesson.subgroup ? `${lesson.subgroup}. ` : ''

                b1.textContent += `${sub}${lesson.lesson}`
                b2.textContent += lesson.type
                b3.textContent += lesson.cabinet || '-'
                b4.textContent += lesson.teacher
            }

        }

        return table;
    }
}