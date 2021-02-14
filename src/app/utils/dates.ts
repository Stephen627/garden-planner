import * as dayjs from 'dayjs';
import { Option } from '../components/form/elements/select';

export const getMonthOptionsBetween = (date1: dayjs.Dayjs, date2: dayjs.Dayjs): Option[] => {
    const options: Option[] = [];
    date1 = date1.set('date', 1);
    date2 = date2.set('date', 1);

    loopDates(date1, date2, (date: dayjs.Dayjs) => {
        options.push({
            name: date.format('MMMM YYYY'),
            value: date.format('MMMM YYYY')
        });
    });

    return options;
}

export const loopDates = (date1: dayjs.Dayjs, date2: dayjs.Dayjs, callable: (date: dayjs.Dayjs) => void): void => {
    while (date1.diff(date2, 'month')) {
        callable(date1);
        date1 = date1.add(1, 'month');
    }

    callable(date1);
}