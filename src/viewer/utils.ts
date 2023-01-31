import { GroupDay } from "../parser/types/group";
import { TeacherDay } from "../parser/types/teacher";

function todayDate(): string {
    const date = new Date();

    return [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear()
    ].join('.')
}

/**
 * 
 * @description Возвращает текущий день из всех дней. Или же самый последний, если ничего не найдено
 */
export function getTodayDay<T extends TeacherDay | GroupDay>(days: T[]): T {
    const date: string = todayDate()

    const day: T | undefined = days.find(_ => _.day === date);

    return day || days[days.length - 1];
}

/**
 * 
 * @description Возвращает текущий день из всех дней. Или же самый последний, если ничего не найдено в виде строки
 */
export function getTodayString<T extends TeacherDay | GroupDay>(days: T[]): string {
    const date: string = todayDate()

    const lday: T | undefined = days.find(_ => _.day === date);
    const cday: T = lday || days[days.length - 1];

    return `${cday.weekday}, ${cday.day}`;
}