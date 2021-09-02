import moment from "moment";

export default {
    getLastNDays(the_days = 7) {
        var result = [];
        for (var i = 0; i < the_days; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push(moment(d).format("YYYY-MM-DD"));
        }
        return result.reverse();
    },
};