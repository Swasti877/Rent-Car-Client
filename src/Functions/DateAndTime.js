const currDate = new Date();

const DateAndTime = {
  isCurrDateLess: (passedDate) => {
    const date = new Date(passedDate);
    if (
      currDate.getFullYear() === date.getFullYear() ||
      parseInt(currDate.getFullYear()) + 1 === date.getFullYear()
    ) {
      if (currDate.getMonth() <= date.getMonth()) {
        if (currDate.getDate() <= date.getDate()) {
          return true;
        }
      }
    }
    return false;
  },

  isTimeLess(time1, time2) {
    const timearr1 = time1.split(":");
    const timearr2 = time2.split(":");

    if (parseInt(timearr1[0]) + 2 <= timearr2[0]) {
      return true;
    }

    return false;
  },

  diffrenceInDays(date_1, date_2) {
    const date1 = new Date(date_1);
    const date2 = new Date(date_2);
    const diffrenceInTime = Math.abs(date1.getTime() - date2.getTime());
    const diffrenceInDays = diffrenceInTime/(1000 * 3600 * 24);
    return diffrenceInDays + 1;
  }
};

export default DateAndTime;
