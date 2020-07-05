import moment from 'moment';
export default function dateToday(){
  return moment().format('YYYY-MM-DD');
}