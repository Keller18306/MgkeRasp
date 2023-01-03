import { Day } from '../../parser/types';
import Lessons from './lessons';

export default function StudentDayTable(day: Day) {
    return <table className='timetable-block'>
        <tbody>
            <tr className='center'>
                <td colSpan={5}>{day.weekday}, {day.day}</td>
            </tr>
            <tr className='center'>
                <td>№</td>
                <td>Дисциплина</td>
                <td>Вид</td>
                <td>Аудитория</td>
                <td>Преподаватель</td>
            </tr>
            <Lessons lessons={day.lessons} />
        </tbody>
    </table>;
}