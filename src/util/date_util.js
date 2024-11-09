
class DateUtils {
    
    static convertToTimestamp(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${year}-${month}-${day}`;
    }


}

export default DateUtils;
