import daysjs from "dayjs";

export const formatDate = (date) => {
  const dateFormated = daysjs(date).format("ddd MMM D, YYYY hh A");

  return dateFormated;
};
