import { Day } from "../parser/types";

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
export function getTodayDay(days: Day[]): Day {
    const date: string = todayDate()

    const day: Day | undefined = days.find(_ => _.day === date);

    return day || days[days.length - 1];
}

/**
 * 
 * @description Возвращает текущий день из всех дней. Или же самый последний, если ничего не найдено в виде строки
 */
export function getTodayString(days: Day[]): string {
    const date: string = todayDate()

    const lday: Day | undefined = days.find(_ => _.day === date);
    const cday: Day = lday || days[days.length - 1];

    return `${cday.weekday}, ${cday.day}`;
}