/**
 * @ultras
 */

/** function humanizeDate
 * @param {String | Date} date -
 * @param {Boolean} withDay -
 * @returns {String} -  Aug 6, 2007
 */
function humanizeDate(date: Date | string, withDay: boolean = true): string {
  if (!date) throw new Error('The parameter "date" should be a string or an instance of Date');
  let _date: Date = typeof date === 'string' ? new Date(date) : date;

  const months = ['Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return `${months[_date.getMonth()]}${withDay ? ` ${_date.getDate()}, ` : ' '}${_date.getFullYear()}`;
}

export default humanizeDate;
