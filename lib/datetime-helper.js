import moment from 'moment';


export const getDateTime = (date) => {
    return date !== null && date !== undefined
        ? moment(date).startOf('second').fromNow()
        : undefined;
}