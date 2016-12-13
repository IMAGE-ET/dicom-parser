// Algorithm based on http://stackoverflow.com/questions/1433030/
const daysInMonth = function (m, y) {
  // Note: m is 0 indexed: 0-11
  switch (m) {
  case 2:
    return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
  case 9 : case 4 : case 6 : case 11 :
    return 30;
  default :
    return 31;
  }
};

const isValidDate = function (d, m, y) {
  // Make year is a number
  if (isNaN(y)) {
    return false;
  }

  return m > 0 && m <= 12 && d > 0 && d <= daysInMonth(m, y);
};

/**
 * Parses a DA formatted string into a Javascript object
 * @memberof dicomParser
 * @param {string} date A string in the DA VR format
 * @param {boolean} [validate] - Throws exception if the date is invalid?
 * @returns {object} Object with properties year, month and day will return
 * undefined if not present or not 8 bytes long
 */
const parseDA = function (date, validate) {
  if (date && date.length === 8) {
    const yyyy = parseInt(date.substring(0, 4), 10);
    const mm = parseInt(date.substring(4, 6), 10);
    const dd = parseInt(date.substring(6, 8), 10);

    if (validate && isValidDate(dd, mm, yyyy) !== true) {
      throw new Error(`invalid DA "${date}"`);
    }

    return {
      year: yyyy,
      month: mm,
      day: dd
    };
  }

  if (validate) {
    throw new Error(`invalid DA "${date}"`);
  }

  return undefined;
};

export { parseDA };
