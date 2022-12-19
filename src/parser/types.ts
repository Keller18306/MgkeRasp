export type Groups = {
    [group: string]: Group
}

export type Group = {
    group: string,
    days: Day[]
}

export type Day = {
    day: string,
    weekday: string,
    lessons: Lesson[]
}

export type Lesson = GroupLessonExplain | GroupLessonExplain[] | null

export type GroupLessonExplain = {
    subgroup?: number
    lesson: string,
    type: string,
    teacher: string
    cabinet: string | null
}
