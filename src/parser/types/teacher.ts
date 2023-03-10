export type Teachers = {
    [teacher: string]: Teacher
}

export type Teacher = {
    teacher: string,
    days: TeacherDay[]
}

export type TeacherDay = {
    day: string,
    weekday: string,
    lessons: TeacherLesson[]
}

export type TeacherLesson = TeacherLessonExplain | null

export type TeacherLessonExplain = {
    lesson: string,
    type: string,
    group: string,
    cabinet: string | null
}
