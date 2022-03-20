function modifyNum(num) {
    if (num < 10) {
        num = `0${num}`;
    }
    return num;
}

function getDateData(date) {
    let day = date.getDate();
    day = modifyNum(day);
    let month = date.getMonth() + 1;
    month = modifyNum(month);
    let year = date.getFullYear();

    return { day, month, year }
}

export { getDateData };