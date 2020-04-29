import  moment from 'moment';
export const getCurrentDate = () =>{
   return moment().format('DD/MM/YYYY');   
}
export const subtractFromDate = (days = 0) =>{
    return moment().subtract(days, 'days').format('DD/MM/YYYY');
}