import * as dayjs from 'dayjs';
import { Option } from '../components/form/elements/select';

export const getMonthOptionsBetween = (date1: dayjs.Dayjs, date2: dayjs.Dayjs): Option[] => {
    const options: Option[] = [];
    date1 = date1.set('date', 1);
    date2 = date2.set('date', 1);

    while (date1.diff(date2, 'month')) {
        options.push({
            name: date1.format('MMMM YYYY'),
            value: date1.format('MMMM YYYY')
        });
        date1 = date1.add(1, 'month');
    }

    return options;
}