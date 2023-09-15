import moment from "moment";

export {};

export function dateConverter(date : Date){
    const Year = date.getFullYear()
    const Month = date.getMonth()+1
    const Day = date.getDate()
    const Date = Year  + '년 ' + Month + '월 ' + Day + '일';
    return(Date);
  }

export interface UserBalance {
  id: string,
  user_email: string,
  type: 'ADS' | 'ETH' | 'KRW',
  amount: string
  available: string
}

export const datePrettier = (dateFormat: string | number | Date) => {
  const date = new Date(dateFormat);

  if (Number.isNaN(date)) {
    throw new Error('unsupported date format');
  }

  return moment(date).format('YYYY-MM-DD');
};
