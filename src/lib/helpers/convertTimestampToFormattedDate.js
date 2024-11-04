import moment from 'moment';

export function convertTimestampToFormattedDate(timestamp) {
  const date = moment.unix(timestamp / 1000);
  const formattedDate = date.format('DD MMM h:mm A');

  return formattedDate;
}

export function convertTimestampToFormattedDateMatchCard(timestamp) {
  console.log({ timestamp });
  const date = moment.unix(timestamp / 1000);
  const formattedDate = date.format('DD MMM');
  const formattedTime = date.format('h:mm A');
  return `<div className="text-center flex justify-center items-center"><span class="match-date">${formattedDate}</span> <span class="match-time">${formattedTime}</span></div>`;
}

export function convertTimestampToFormattedDateAndYear(timestamp) {
  const date = moment.unix(timestamp / 1000); // Convert to UTC
  const formattedDate = date.format('DD MMM YY'); // Include AM/PM

  return formattedDate;
}
