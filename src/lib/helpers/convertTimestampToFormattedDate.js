import moment from 'moment';

export function convertTimestampToFormattedDate(timestamp) {
  console.log({ timestamp });
  const date = moment.unix(timestamp / 1000);
  const formattedDate = date.format('DD MMM h:mm A');

  return formattedDate;
}

export function convertTimestampToFormattedDateMatchCard(timestamp) {
  console.log({ timestamp });
  const date = moment.unix(timestamp / 1000);
  const formattedDate = date.format('DD MMM h:mm A');

  return formattedDate;
}

export function convertTimestampToFormattedDateAndYear(timestamp) {
  const date = moment.unix(timestamp / 1000); // Convert to UTC
  const formattedDate = date.format('DD MMM YY'); // Include AM/PM

  return formattedDate;
}
