import { Day } from '../../../parser/types';
import Lessons from './lessons';

export default function ViewerGroup({ group, day }: { group: string, day: Day }): JSX.Element {
    return <table className='timetable-block'>
        <tbody>
            <tr className='center'>
                <td colSpan={5}>Группа {group}</td>
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