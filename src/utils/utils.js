export const parseDate = (date) => {
  try {
    const newDate = date.toDate();
    return newDate;
  } catch (error) {
    return date;
  }
};
