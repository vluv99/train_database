module.exports = [
    function toOracle(data_in){
        let d = Date.parse(data_in)
        var date = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        date += "/" + new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
        date += "/" + new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)

        return date;
    }
]