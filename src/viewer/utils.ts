import { GroupDay } from "../parser/types/group";

function todayDate(): string {
    const date = new Date();

    return [
        (date.getDay() + 1).toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear()
    ].join('.')
}

/**
 * 
 * @description Возвращает текущий день из всех дней. Или же самый последний, если ничего не найдено
 */
export function getTodayDay(days: GroupDay[]): GroupDay {
    const date: string = todayDate()

    const day: GroupDay | undefined = days.find(_ => _.day === date);

    return day || days[days.length - 1];
}

/**
 * 
 * @description Возвращает текущий день из всех дней. Или же самый последний, если ничего не найдено в виде строки
 */
export function getTodayString(days: GroupDay[]): string {
    const date: string = todayDate()

    const lday: GroupDay | undefined = days.find(_ => _.day === date);
    const cday: GroupDay = lday || days[days.length - 1];

    return `${cday.weekday}, ${cday.day}`;
}