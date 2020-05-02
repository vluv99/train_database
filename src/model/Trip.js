class Trip{
    constructor(){
        this.id = "";
        this.name = "";
        this.from = "";
        this.to = "";
        this.depart = "";
        this.arrive = "";
        this.can_buy = false;    
    }

    static load(data){
        let trip = new Trip();
        trip.id = data.ID;
        trip.name = data.NEV.trim();
        trip.from = data.FROM_STATION.trim(); //TODO: change the data types, to match the database
        trip.to = data.TO_STATION.trim();
        trip.depart = data.DEPART_AT;
        trip.arrive = data.ARRIVE_AT;
        trip.travell_time = data.TIME;
        trip.can_buy = data.CAN_BUY == 0 ? false:true;
        return trip;
    }

    static calcTime(data){

    }
}

module.exports = Trip;
