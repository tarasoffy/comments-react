export const useDate = (date) => {
   if(date === 1) {
       return "1 day ago"
   } else if(date >= 2 && date <= 6) {
    return `${date} days ago`
   } else if(date >= 7 && date <= 13) {
    return "1 week ago"
   } else if(date >= 14 && date <= 21) {
    return "2 week ago"
   } else if(date >= 22 && date <= 29) {
    return "3 week ago"
   } else if(date >= 30 && date <= 59) {
    return "1 mounth ago"
   } else if(date >= 60 && date <= 89) {
    return "2 mounth ago"
   } else if(date >= 90 && date <= 119) {
    return "3 mounth ago"
   } else if(date >= 179 && date <= 359) {
    return "half a year ago"
   } else if(date >= 360) {
    return "years ago"
   }
};
