import moment from "moment";

export const formatDatefun = (date) => {
    let mydate = moment(new Date(date), "YYYY/MM/DD");
    return mydate
}

export function secondsToMMSS(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
}