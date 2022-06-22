import { GET_FILTER_DATE } from "../actions/types";

const formatCurrentDate = () => {
    var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear(),
        hour = "" + d.getHours(),
        minute = "" + d.getMinutes();

    // console.log(minute);
    // console.log("0" + minute);
    // console.log(minute.length);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return [year, month, day].join("-") + "T" + [hour, minute].join(":");
};

const currentTime = formatCurrentDate();

const currentTable = (state = currentTime, action) => {
    switch (action.type) {
        case GET_FILTER_DATE:
            return action.payload;
        default:
            return state;
    }
};

export default currentTable;
