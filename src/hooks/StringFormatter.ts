export function formatString(template: string, ...args: any[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
}

export function getHourFromStringDate(date: string) {
  let hourString = date.slice(date.indexOf('T') + 1).replace(' ', '').split(':')[0];
  let hour = parseInt(hourString);
  return hour;
}

