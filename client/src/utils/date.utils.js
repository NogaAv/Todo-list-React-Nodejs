//gets Date object and returns formated date string
export const formateDate = (date) => {
    let minutes = String(date.getMinutes());
    if (minutes.length === 1) minutes = '0' + minutes;
    let seconds = String(date.getSeconds());
    if (seconds.length === 1) seconds = '0' + seconds;

    const dateStr =
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' ' +
        date.getHours() +
        ':' +
        minutes +
        ':' +
        seconds;

    return dateStr;
};
