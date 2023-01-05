import { GroupDay } from '../../../parser/types/group';
import Lessons from '../../common/lessons';

export default function StudentDayTable({ day }: { day: GroupDay }): JSX.Element {
    return <div className='col-lg-6 col-sm-12'>
        <table className='timetable-block'>
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
        </table>
    </div>;
}