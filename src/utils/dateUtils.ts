import { format, toZonedTime } from 'date-fns-tz';

export const formatToLocalDate = (utcDate: string, timeZone?: string) => {
    const zone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = toZonedTime(new Date(utcDate), zone);
    return format(localDate, 'MMMM d, yyyy');
};