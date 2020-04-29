export const sleep = async  (ms)=>{
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * 
 * @param {Date} date 
 */
export const isToday = (date) =>{
    const today = new Date()
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
}